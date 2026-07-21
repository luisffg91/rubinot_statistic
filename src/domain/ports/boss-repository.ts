import type { BoostedOfDay } from '../entities/boosted-of-day';
import type { DataOrigin } from '../shared/data-origin';

export interface BoostedResult {
  boosted: BoostedOfDay;
  origin: DataOrigin;
  fetchedAt: Date;
}

/** Port: fonte do boosted do dia. */
export interface BossRepository {
  fetchBoosted(): Promise<BoostedResult>;
}
