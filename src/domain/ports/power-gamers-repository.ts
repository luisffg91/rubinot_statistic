import type { ExperienceGain } from '../entities/experience-gain';
import type { DataOrigin } from '../shared/data-origin';

export interface PowerGamersResult {
  entries: ExperienceGain[];
  worlds: string[];
  origin: DataOrigin;
  fetchedAt: Date;
  /** Intervalo analisado (ISO yyyy-mm-dd). "Dia" = from === to. */
  from: string;
  to: string;
  /** true quando não há histórico suficiente para o intervalo (RG-E3 / FR-006). */
  collecting: boolean;
}

/** Port: fonte do ranking de ganho de experiência num intervalo de datas. */
export interface PowerGamersRepository {
  fetchGains(from: string, to: string, world?: string): Promise<PowerGamersResult>;
}
