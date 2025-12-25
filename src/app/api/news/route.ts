// app/api/dashboard/news/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPaginatedNews } from './data'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '3')

  try {
    const news = getPaginatedNews(page, limit)

    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
