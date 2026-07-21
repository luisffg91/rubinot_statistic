import type { PowerGamers } from '@/application/use-cases/get-power-gamers';
import type { GainPeriod } from '@/domain/entities/experience-gain';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface PowerGamerDto {
  rank: number;
  name: string;
  world: string;
  gained: number;
  spark: number[];
}

export interface PowerGamersDto {
  entries: PowerGamerDto[];
  worlds: string[];
  world: string | null;
  period: GainPeriod;
  origin: DataOrigin;
  fetchedAt: string;
  collecting: boolean;
}

export function toPowerGamersDto(pg: PowerGamers): PowerGamersDto {
  return {
    entries: pg.entries.map((e) => ({
      rank: e.rank,
      name: e.name,
      world: e.world,
      gained: e.gained,
      spark: e.spark,
    })),
    worlds: pg.worlds,
    world: pg.world,
    period: pg.period,
    origin: pg.origin,
    fetchedAt: pg.fetchedAt.toISOString(),
    collecting: pg.collecting,
  };
}
