import type { ExperienceGain, GainPeriod } from '../entities/experience-gain';
import type { DataOrigin } from '../shared/data-origin';

export interface PowerGamersResult {
  entries: ExperienceGain[];
  worlds: string[];
  origin: DataOrigin;
  fetchedAt: Date;
  /** Dia analisado (ISO yyyy-mm-dd) quando period='day'; null para semana/mês. */
  day: string | null;
  /** true quando não há histórico suficiente para o período (RG-E3 / FR-006). */
  collecting: boolean;
}

/** Port: fonte do ranking de ganho de experiência por período. */
export interface PowerGamersRepository {
  /** `day` (yyyy-mm-dd) seleciona o dia específico quando period='day'. */
  fetchGains(period: GainPeriod, world?: string, day?: string): Promise<PowerGamersResult>;
}
