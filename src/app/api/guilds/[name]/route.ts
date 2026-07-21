import { NextResponse } from 'next/server';
import { GetGuilds } from '@/application/use-cases/get-guilds';
import { getGuildsRepository } from '@/infrastructure/config/repositories';
import { toGuildDetailDto } from '@/app/_lib/guilds-dto';

export const dynamic = 'force-dynamic';

/** GET /api/guilds/{name} — detalhe de uma guild (BFF). */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  try {
    const result = await new GetGuilds(getGuildsRepository()).detail(decodeURIComponent(name));
    return NextResponse.json(toGuildDetailDto(result));
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
