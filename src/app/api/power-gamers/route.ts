import { NextResponse } from 'next/server';
import { GetPowerGamers } from '@/application/use-cases/get-power-gamers';
import { getPowerGamersRepository } from '@/infrastructure/config/repositories';
import { toPowerGamersDto } from '@/app/_lib/power-gamers-dto';

export const dynamic = 'force-dynamic';

/** GET /api/power-gamers?from=&to=&world= (ou ?day= para um único dia). */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const today = new Date().toISOString().slice(0, 10);
  const day = url.searchParams.get('day');
  let from = url.searchParams.get('from') ?? undefined;
  let to = url.searchParams.get('to') ?? undefined;
  if (day) {
    from = day;
    to = day;
  }
  from = from ?? today;
  to = to ?? from;
  const world = url.searchParams.get('world') || undefined;
  try {
    const pg = await new GetPowerGamers(getPowerGamersRepository()).execute(from, to, world);
    return NextResponse.json(toPowerGamersDto(pg));
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
