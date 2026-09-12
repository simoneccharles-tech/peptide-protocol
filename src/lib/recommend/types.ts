export type LifeSnapshot = {
  headline: string
  morning: string
  daytime: string
  evening: string
  thirty_day: string
  ninety_day: string
}

export type PeptidePick = {
  name: string
  slug: string
  why: string
  transformation?: string
  research: string[]
}

export type RecommendMatch = {
  summary: string
  life_snapshot: LifeSnapshot
  picks: PeptidePick[]
}

export type RecommendRequest = {
  goals?: unknown
  notes?: unknown
  name?: unknown
  email?: unknown
  phone?: unknown
}

export type CataloguePeptide = {
  name: string
  slug: string
  description: string
  benefits: string[]
  goals: string[]
  tagline: string
  research: string[]
}
