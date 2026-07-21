import { NextResponse } from 'next/server';
import { GetTopExperience } from '@/application/use-cases/get-top-experience';
import { getRankingRepository } from '@/infrastructure/config/repositories';
import { toRankingDto } from '@/app/_lib/ranking-dto';

export const dynamic = 'force-dynamic';

/** GET /api/ranking?world= — Top Experiência (BFF). Demo: origin='exemplo'. */
export async function GET(request: Request) {
  const world = new URL(request.url).searchParams.get('world') || undefined;
  try {
    const top = await new GetTopExperience(getRankingRepository()).execute(world);
    return NextResponse.json(toRankingDto(top));
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
