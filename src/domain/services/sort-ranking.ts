import type { RankingEntry, RankedEntry } from '../entities/ranking-entry';

/**
 * RG-E1 — Ordenação do ranking: por experiência desc; empate por nome asc.
 * A posição (`rank`) é derivada da ordem. Puro e testável. Não muta a entrada.
 */
export function sortRanking(entries: RankingEntry[]): RankedEntry[] {
  return [...entries]
    .sort((a, b) => b.experience - a.experience || a.name.localeCompare(b.name))
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}
