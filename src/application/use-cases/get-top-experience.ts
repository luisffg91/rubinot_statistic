import type { RankingRepository } from '@/domain/ports/ranking-repository';
import type { RankedEntry } from '@/domain/entities/ranking-entry';
import { sortRanking } from '@/domain/services/sort-ranking';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface TopExperience {
  entries: RankedEntry[];
  worlds: string[];
  world: string | null;
  origin: DataOrigin;
  fetchedAt: Date;
}

/** Caso de uso: obtém o Top Experiência (ordenado, top N), opcionalmente por mundo. */
export class GetTopExperience {
  constructor(private readonly repo: RankingRepository) {}

  async execute(world?: string, limit = 100): Promise<TopExperience> {
    const { entries, worlds, origin, fetchedAt } = await this.repo.fetchTopExperience(world);
    return {
      entries: sortRanking(entries).slice(0, limit),
      worlds,
      world: world ?? null,
      origin,
      fetchedAt,
    };
  }
}
