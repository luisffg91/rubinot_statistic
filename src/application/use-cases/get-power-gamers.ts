import type { PowerGamersRepository } from '@/domain/ports/power-gamers-repository';
import type { RankedGain } from '@/domain/entities/experience-gain';
import { sortPowerGamers } from '@/domain/services/sort-power-gamers';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface PowerGamers {
  entries: RankedGain[];
  worlds: string[];
  world: string | null;
  from: string;
  to: string;
  origin: DataOrigin;
  fetchedAt: Date;
  collecting: boolean;
}

/** Caso de uso: ranking de power gamers (ganho num intervalo), ordenado e top N. */
export class GetPowerGamers {
  constructor(private readonly repo: PowerGamersRepository) {}

  async execute(from: string, to: string, world?: string, limit = 100): Promise<PowerGamers> {
    const result = await this.repo.fetchGains(from, to, world);
    return {
      entries: sortPowerGamers(result.entries).slice(0, limit),
      worlds: result.worlds,
      world: world ?? null,
      from: result.from,
      to: result.to,
      origin: result.origin,
      fetchedAt: result.fetchedAt,
      collecting: result.collecting,
    };
  }
}
