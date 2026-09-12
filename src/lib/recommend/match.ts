import { CATALOGUE } from './catalogue'
import type { CataloguePeptide, LifeSnapshot, PeptidePick, RecommendMatch } from './types'

const GOAL_ALIASES: Record<string, string[]> = {
  fat_loss_stubborn: ['weight_loss', 'metabolic'],
  fat_loss_appetite: ['weight_loss'],
  fat_loss_metabolic: ['metabolic', 'weight_loss', 'energy'],
  fat_loss_recomp: ['weight_loss', 'performance', 'metabolic'],
  muscle_growth: ['performance', 'recovery'],
  strength_output: ['performance'],
  endurance: ['performance', 'energy'],
  injury_repair: ['injury', 'recovery'],
  post_workout_recovery: ['recovery', 'injury'],
  sleep_deeper: ['sleep'],
  sleep_fall_asleep: ['sleep'],
  sleep_wake_rested: ['sleep', 'energy'],
  stress_cortisol: ['stress', 'sleep'],
  focus_deep_work: ['focus', 'cognition'],
  mental_clarity: ['cognition', 'focus'],
  mood_lift: ['mood'],
  anxiety_calm: ['stress', 'mood'],
  memory_recall: ['cognition'],
  reduce_wrinkles: ['skin', 'anti_aging'],
  fade_scars: ['skin'],
  skin_glow: ['skin'],
  collagen_firmness: ['skin'],
  hair_growth: ['hair'],
  tan_pigment: ['skin'],
  anti_aging: ['anti_aging', 'longevity'],
  energy_mitochondria: ['energy', 'metabolic'],
  libido_drive: ['mood', 'energy'],
  immune_resilience: ['stress'],
  gut_inflammation: ['gut_health', 'recovery'],
  'fat loss & body composition': ['weight_loss', 'metabolic'],
  'fat loss': ['weight_loss'],
  'body composition': ['weight_loss', 'performance'],
  'muscle, strength & performance': ['performance', 'recovery'],
  'sleep & recovery': ['sleep', 'recovery'],
  'focus, mood & cognition': ['cognition', 'focus', 'mood'],
  'skin, hair & beauty': ['skin', 'hair'],
  'longevity & vitality': ['longevity', 'energy', 'anti_aging'],
}

const NOTE_KEYWORDS: Array<{ re: RegExp; tags: string[] }> = [
  { re: /\b(lean out|fat loss|belly|visceral|weight|appetite|food noise|cut)\b/i, tags: ['weight_loss', 'metabolic'] },
  { re: /\b(muscle|strength|train|training|performance|vo2|endurance)\b/i, tags: ['performance'] },
  { re: /\b(injur|tendon|joint|shoulder|repair|recover|inflammation)\b/i, tags: ['injury', 'recovery'] },
  { re: /\b(sleep|insomnia|rested|cortisol|stress)\b/i, tags: ['sleep', 'stress'] },
  { re: /\b(focus|brain fog|memory|cognition|mood|anxiety|motivation)\b/i, tags: ['cognition', 'focus', 'mood'] },
  { re: /\b(skin|wrinkle|hair|collagen|glow|scar)\b/i, tags: ['skin', 'hair'] },
  { re: /\b(energy|tired|mitochondri|longevity|ageing|aging)\b/i, tags: ['energy', 'longevity'] },
  { re: /\b(gut|ibs|stomach)\b/i, tags: ['gut_health'] },
]

export function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    if (typeof value === 'string' && value.trim()) return [value.trim()]
    return []
  }
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
}

export function collectTags(goals: string[], notes: string): string[] {
  const tags = new Set<string>()
  for (const raw of goals) {
    const key = raw.trim().toLowerCase()
    const mapped = GOAL_ALIASES[key]
    if (mapped) mapped.forEach((tag) => tags.add(tag))
    else tags.add(key.replace(/[^a-z0-9]+/g, '_'))
  }
  for (const { re, tags: noteTags } of NOTE_KEYWORDS) {
    if (re.test(notes)) noteTags.forEach((tag) => tags.add(tag))
  }
  return [...tags]
}

function scorePeptide(peptide: CataloguePeptide, tags: string[]): number {
  if (tags.length === 0) return 1
  return peptide.goals.reduce((score, goal) => score + (tags.includes(goal) ? 3 : 0), 0)
}

function pickWhy(peptide: CataloguePeptide, tags: string[]): string {
  const overlap = peptide.goals.filter((goal) => tags.includes(goal))
  const focus = overlap.length ? overlap.join(', ').replace(/_/g, ' ') : peptide.benefits[0]
  return `${peptide.tagline} This pick is here because your goals point toward ${focus}. Educational match only — not a prescription or a promise of results.`
}

function pickTransformation(peptide: CataloguePeptide): string {
  const benefit = peptide.benefits[0]?.toLowerCase() ?? 'the researched pathways above'
  return `People usually come to ${peptide.name.split(' ')[0]} for ${benefit}. Individual response varies; this is a reading guide, not a treatment plan.`
}

function snapshotFor(tags: string[], picks: CataloguePeptide[]): LifeSnapshot {
  const fat = tags.includes('weight_loss') || tags.includes('metabolic')
  const sleep = tags.includes('sleep')
  const focus = tags.includes('focus') || tags.includes('cognition')
  const recover = tags.includes('recovery') || tags.includes('injury')
  const names = picks.map((item) => item.name.split(' ')[0]).join(', ')

  return {
    headline: fat
      ? 'A composition-first stack, grounded in the incretin and mitochondrial literature'
      : focus
        ? 'A clarity-first stack drawn from the cognitive peptide literature'
        : sleep
          ? 'A recovery-first stack drawn from sleep and stress research'
          : 'A reference stack matched to the outcomes you ticked',
    morning: fat
      ? 'Morning appetite and “food noise” are the signals most often discussed in the incretin papers behind this match.'
      : focus
        ? 'Morning is when people usually notice whether focus holds for deep work — that is the Semax / Dihexa literature, not a guarantee.'
        : 'A steadier start to the day is the pattern most often described in the energy and sleep papers cited below.',
    daytime: recover
      ? 'Training days are where tissue-repair and mitochondrial papers are most relevant — recoverability, not a new personal best on cue.'
      : fat
        ? 'Daytime satiety and fewer impulsive snacks are the behavioural correlates reported in the weight-management trials.'
        : 'Daytime energy and mood evenness are the usual research endpoints for this mix.',
    evening: sleep
      ? 'Evening wind-down and sleep architecture are the DSIP / stress-peptide story — useful as a reading frame, not a sleeping tablet.'
      : 'Evening is typically when recovery and skin-repair pathways are discussed in the citations attached to each pick.',
    thirty_day: `By week four, the papers behind ${names} talk about early appetite, sleep, or recovery signals. That is population data, not your timeline.`,
    ninety_day:
      'By month three, the longer trials (especially metabolic) report the fuller composition or performance shifts. Treat this as a map of what was studied, not a forecast.',
  }
}

export function buildMatch(
  goals: string[],
  notes: string,
  catalogue: CataloguePeptide[] = CATALOGUE,
): RecommendMatch {
  const tags = collectTags(goals, notes)
  const ranked = catalogue
    .map((peptide, index) => ({ peptide, score: scorePeptide(peptide, tags), index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)

  const chosen = ranked.slice(0, 3).map((row) => row.peptide)
  const picks: PeptidePick[] = chosen.map((peptide) => ({
    name: peptide.name,
    slug: peptide.slug,
    why: pickWhy(peptide, tags),
    transformation: pickTransformation(peptide),
    research: peptide.research.slice(0, 3),
  }))

  const label = goals.length ? goals.join(', ') : notes.trim() || 'the goals you described'
  const summary = `A reference match for ${label}. These are encyclopaedia picks with the papers we hold for each compound — not a clinical protocol and not medical advice.`

  return {
    summary,
    life_snapshot: snapshotFor(tags, chosen),
    picks,
  }
}

export function isValidMatch(value: unknown): value is RecommendMatch {
  if (!value || typeof value !== 'object') return false
  const match = value as RecommendMatch
  if (typeof match.summary !== 'string' || !match.summary.trim()) return false
  if (!match.life_snapshot || typeof match.life_snapshot.headline !== 'string') return false
  if (!Array.isArray(match.picks) || match.picks.length === 0) return false
  return match.picks.every(
    (pick) =>
      typeof pick.name === 'string' &&
      typeof pick.slug === 'string' &&
      typeof pick.why === 'string' &&
      Array.isArray(pick.research),
  )
}

export function sanitizeMatch(raw: RecommendMatch, catalogue: CataloguePeptide[] = CATALOGUE): RecommendMatch | null {
  const bySlug = new Map(catalogue.map((item) => [item.slug, item]))
  const picks: PeptidePick[] = []
  for (const pick of raw.picks) {
    const known = bySlug.get(pick.slug)
    if (!known) continue
    const next: PeptidePick = {
      name: known.name,
      slug: known.slug,
      why: pick.why || known.tagline,
      research: pick.research.length ? pick.research : known.research.slice(0, 3),
    }
    if (pick.transformation) next.transformation = pick.transformation
    picks.push(next)
  }
  if (!picks.length) return null
  return { ...raw, picks }
}
