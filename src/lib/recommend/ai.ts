import { CATALOGUE } from './catalogue'
import { isValidMatch, sanitizeMatch } from './match'
import type { CataloguePeptide, RecommendMatch } from './types'

/** Groq shut down llama-3.3-70b-versatile on 16 Aug 2026 (free/developer). */
export const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b'
export const DEFAULT_GROQ_FALLBACKS = ['openai/gpt-oss-20b', 'qwen/qwen3.6-27b']
export const DEPRECATED_GROQ_MODELS = new Set([
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'llama3-70b-8192',
  'llama3-8b-8192',
])

export type GroqEnv = {
  GROQ_API_KEY?: string
  GROQ_MODEL?: string
  GROQ_MODEL_FALLBACKS?: string
}

function modelList(env: GroqEnv): string[] {
  const primary = (env.GROQ_MODEL || DEFAULT_GROQ_MODEL).trim()
  const extras = (env.GROQ_MODEL_FALLBACKS || DEFAULT_GROQ_FALLBACKS.join(','))
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  const ordered = [primary, ...extras].filter((id) => !DEPRECATED_GROQ_MODELS.has(id))
  return [...new Set(ordered)]
}

function prompt(goals: string[], notes: string, catalogue: CataloguePeptide[]): string {
  const library = catalogue.map((item) => ({
    slug: item.slug,
    name: item.name,
    goals: item.goals,
    description: item.description,
  }))
  return [
    'You are the educational advisor for The Peptide Protocol, a British English encyclopaedia.',
    'Match the visitor to 2 or 3 peptides from the library only. Do not invent slugs.',
    'Do not prescribe, dose, diagnose, or promise outcomes. Educational tone only.',
    'Return JSON with keys: summary (string), life_snapshot {headline, morning, daytime, evening, thirty_day, ninety_day}, picks [{name, slug, why, transformation, research: string[]}].',
    `Library: ${JSON.stringify(library)}`,
    `Selected goals: ${JSON.stringify(goals)}`,
    `Notes: ${notes || '(none)'}`,
  ].join('\n')
}

async function complete(apiKey: string, model: string, content: string): Promise<{ ok: true; text: string } | { ok: false; status: number }> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'Return only valid JSON for the peptide match schema.' },
        { role: 'user', content },
      ],
    }),
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) return { ok: false, status: response.status }
  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const text = data.choices?.[0]?.message?.content
  if (!text) return { ok: false, status: 502 }
  return { ok: true, text }
}

export async function matchWithGroq(
  goals: string[],
  notes: string,
  env: GroqEnv,
  catalogue: CataloguePeptide[] = CATALOGUE,
): Promise<RecommendMatch | null> {
  const apiKey = env.GROQ_API_KEY?.trim()
  if (!apiKey) return null

  const content = prompt(goals, notes, catalogue)
  for (const model of modelList(env)) {
    try {
      const result = await complete(apiKey, model, content)
      if (!result.ok) {
        if (result.status === 404 || result.status === 400) continue
        return null
      }
      const parsed = JSON.parse(result.text) as RecommendMatch
      if (!isValidMatch(parsed)) continue
      return sanitizeMatch(parsed, catalogue)
    } catch {
      continue
    }
  }
  return null
}
