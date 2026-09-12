import { handleRecommend } from '../../../src/lib/recommend/handler'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  return handleRecommend(request)
}

export async function GET() {
  return new Response(null, { status: 405, headers: { Allow: 'POST' } })
}
