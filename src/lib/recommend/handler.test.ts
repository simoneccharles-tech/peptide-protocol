import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleRecommend } from './handler'
import { buildMatch, isValidMatch } from './match'

const FAT_LOSS = {
  goals: ['Fat loss & body composition'],
  notes: 'want to lean out',
}

test('deterministic match returns the live client payload shape', () => {
  const match = buildMatch(FAT_LOSS.goals, FAT_LOSS.notes)
  assert.equal(isValidMatch(match), true)
  assert.ok(match.picks.length >= 2)
  const slugs = match.picks.map((pick) => pick.slug)
  assert.ok(slugs.includes('retatrutide') || slugs.includes('cagrilintide'))
  assert.ok(match.picks.every((pick) => pick.research.length > 0))
  assert.ok(match.life_snapshot.thirty_day)
  assert.ok(match.summary.includes('not a clinical protocol'))
})

test('POST /api/recommend returns a match without an AI key', async () => {
  const response = await handleRecommend(
    new Request('http://local/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FAT_LOSS),
    }),
    {},
  )
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.equal(isValidMatch(body), true)
  assert.ok(Array.isArray(body.picks) && body.picks.length > 0)
})

test('POST without goals or notes is 400', async () => {
  const response = await handleRecommend(
    new Request('http://local/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goals: [], notes: '' }),
    }),
    {},
  )
  assert.equal(response.status, 400)
})

test('GET is 405', async () => {
  const response = await handleRecommend(new Request('http://local/api/recommend'), {})
  assert.equal(response.status, 405)
})

test('a 404 from Groq falls back to a local match instead of AI error 404', async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: { message: 'model not found' } }), { status: 404 })) as typeof fetch
  try {
    const response = await handleRecommend(
      new Request('http://local/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FAT_LOSS),
      }),
      { GROQ_API_KEY: 'test-key', GROQ_MODEL: 'llama-3.3-70b-versatile' },
    )
    assert.equal(response.status, 200)
    const body = await response.json()
    assert.notEqual(body.error, 'AI error 404')
    assert.equal(isValidMatch(body), true)
  } finally {
    globalThis.fetch = originalFetch
  }
})
