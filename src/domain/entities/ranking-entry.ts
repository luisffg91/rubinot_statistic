/** Uma entrada do ranking de experiência (sem posição). */
export interface RankingEntry {
  name: string;
  level: number;
  experience: number;
  world: string;
}

/** Entrada já posicionada no ranking (com `rank`). */
export interface RankedEntry extends RankingEntry {
  rank: number;
}
