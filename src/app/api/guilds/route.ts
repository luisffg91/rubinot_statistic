import { NextResponse } from 'next/server';
import { GetGuilds } from '@/application/use-cases/get-guilds';
import { getGuildsRepository } from '@/infrastructure/config/repositories';
import { toGuildsListDto } from '@/app/_lib/guilds-dto';

export const dynamic = 'force-dynamic';

/** GET /api/guilds — lista de guilds (BFF). */
export async function GET() {
  try {
    const result = await new GetGuilds(getGuildsRepository()).list();
    return NextResponse.json(toGuildsListDto(result));
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
