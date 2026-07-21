export type GainPeriod = 'day' | 'week' | 'month';

/** Ganho de experiência de um personagem em um período. */
export interface ExperienceGain {
  name: string;
  world: string;
  gained: number; // XP ganho no período (≥ 0)
  spark: number[]; // pontos da evolução recente (para a sparkline)
}

/** Ganho já posicionado no ranking de power gamers. */
export interface RankedGain extends ExperienceGain {
  rank: number;
}
