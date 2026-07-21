import { NextResponse } from 'next/server';
import { GetSponsoredStreamers } from '@/application/use-cases/get-sponsored-streamers';
import { getSponsoredStreamersRepository } from '@/infrastructure/config/repositories';
import { toStreamersDto } from '@/app/_lib/streamers-dto';

export const dynamic = 'force-dynamic';

/** GET /api/streamers — patrocinados (streamers ao vivo + canais). */
export async function GET() {
  try {
    const result = await new GetSponsoredStreamers(getSponsoredStreamersRepository()).execute();
    return NextResponse.json(toStreamersDto(result));
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
