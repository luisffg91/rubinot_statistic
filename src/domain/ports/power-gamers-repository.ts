import type { ExperienceGain, GainPeriod } from '../entities/experience-gain';
import type { DataOrigin } from '../shared/data-origin';

export interface PowerGamersResult {
  entries: ExperienceGain[];
  worlds: string[];
  origin: DataOrigin;
  fetchedAt: Date;
  /** true quando não há histórico suficiente para o período (RG-E3 / FR-006). */
  collecting: boolean;
}

/** Port: fonte do ranking de ganho de experiência por período. */
export interface PowerGamersRepository {
  fetchGains(period: GainPeriod, world?: string): Promise<PowerGamersResult>;
}
