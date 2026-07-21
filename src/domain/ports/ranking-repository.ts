import type { RankingEntry } from '../entities/ranking-entry';
import type { DataOrigin } from '../shared/data-origin';

export interface RankingResult {
  entries: RankingEntry[];
  worlds: string[]; // mundos disponíveis para filtro
  origin: DataOrigin;
  fetchedAt: Date;
}

/** Port: fonte do ranking de experiência. Implementado por mock (demo) ou client real (Onda 2). */
export interface RankingRepository {
  fetchTopExperience(world?: string): Promise<RankingResult>;
}
