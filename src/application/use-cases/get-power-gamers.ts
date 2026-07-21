import type { PowerGamersRepository } from '@/domain/ports/power-gamers-repository';
import type { GainPeriod, RankedGain } from '@/domain/entities/experience-gain';
import { sortPowerGamers } from '@/domain/services/sort-power-gamers';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface PowerGamers {
  entries: RankedGain[];
  worlds: string[];
  world: string | null;
  period: GainPeriod;
  day: string | null;
  origin: DataOrigin;
  fetchedAt: Date;
  collecting: boolean;
}

/** Caso de uso: ranking de power gamers (ganho por período), ordenado e top N. */
export class GetPowerGamers {
  constructor(private readonly repo: PowerGamersRepository) {}

  async execute(period: GainPeriod, world?: string, day?: string, limit = 100): Promise<PowerGamers> {
    const { entries, worlds, origin, fetchedAt, day: resolvedDay, collecting } =
      await this.repo.fetchGains(period, world, day);
    return {
      entries: sortPowerGamers(entries).slice(0, limit),
      worlds,
      world: world ?? null,
      period,
      day: resolvedDay,
      origin,
      fetchedAt,
      collecting,
    };
  }
}
