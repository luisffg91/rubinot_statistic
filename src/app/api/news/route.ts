import { NextResponse } from 'next/server';
import { GetNews } from '@/application/use-cases/get-news';
import { getNewsRepository } from '@/infrastructure/config/repositories';
import { toNewsDto } from '@/app/_lib/news-dto';

export const dynamic = 'force-dynamic';

/** GET /api/news — News recentes (BFF). */
export async function GET() {
  try {
    const result = await new GetNews(getNewsRepository()).execute();
    return NextResponse.json(toNewsDto(result));
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
