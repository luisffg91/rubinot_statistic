import { NextResponse } from 'next/server';
import { GetPowerGamers } from '@/application/use-cases/get-power-gamers';
import { getPowerGamersRepository } from '@/infrastructure/config/repositories';
import { toPowerGamersDto } from '@/app/_lib/power-gamers-dto';
import type { GainPeriod } from '@/domain/entities/experience-gain';

export const dynamic = 'force-dynamic';

const PERIODS: GainPeriod[] = ['day', 'week', 'month'];

function parsePeriod(value: string | null): GainPeriod {
  return PERIODS.includes(value as GainPeriod) ? (value as GainPeriod) : 'day';
}

/** GET /api/power-gamers?period=&world= — ranking de ganho por período (BFF). */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const period = parsePeriod(url.searchParams.get('period'));
  const world = url.searchParams.get('world') || undefined;
  try {
    const pg = await new GetPowerGamers(getPowerGamersRepository()).execute(period, world);
    return NextResponse.json(toPowerGamersDto(pg));
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
