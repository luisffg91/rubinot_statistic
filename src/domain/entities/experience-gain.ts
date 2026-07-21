/** Ganho de experiência de um personagem em um intervalo de datas. */
export interface ExperienceGain {
  name: string;
  world: string;
  gained: number; // XP ganho no intervalo (≥ 0)
  spark: number[]; // pontos da evolução recente (para a sparkline)
}

/** Ganho já posicionado no ranking de power gamers. */
export interface RankedGain extends ExperienceGain {
  rank: number;
}
