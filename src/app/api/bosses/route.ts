import { NextResponse } from 'next/server';
import { GetBoostedOfDay } from '@/application/use-cases/get-boosted-of-day';
import { getBossRepository } from '@/infrastructure/config/repositories';
import { toBoostedDto } from '@/app/_lib/boss-dto';

export const dynamic = 'force-dynamic';

/** GET /api/bosses — boosted do dia (BFF). */
export async function GET() {
  try {
    const result = await new GetBoostedOfDay(getBossRepository()).execute();
    return NextResponse.json(toBoostedDto(result));
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
