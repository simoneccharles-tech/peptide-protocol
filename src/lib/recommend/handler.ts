import { CATALOGUE } from './catalogue'
import { matchWithGroq, type GroqEnv } from './ai'
import { asStringList, buildMatch } from './match'
import type { CataloguePeptide, RecommendRequest } from './types'

export type RecommendEnv = GroqEnv

function readEnv(): RecommendEnv {
  const runtime = globalThis as { process?: { env?: RecommendEnv } }
  return runtime.process?.env ?? {}
}

export async function handleRecommend(
  request: Request,
  env: RecommendEnv = readEnv(),
  catalogue: CataloguePeptide[] = CATALOGUE,
): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } })
  }

  let body: RecommendRequest
  try {
    body = (await request.json()) as RecommendRequest
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const goals = asStringList(body.goals)
  const notes = typeof body.notes === 'string' ? body.notes : ''
  if (!goals.length && !notes.trim()) {
    return Response.json({ error: 'Add a goal or a short note so we can match a protocol.' }, { status: 400 })
  }

  const aiMatch = await matchWithGroq(goals, notes, env, catalogue)
  const match = aiMatch ?? buildMatch(goals, notes, catalogue)
  return Response.json(match, {
    headers: { 'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate' },
  })
}
