import type { ExperienceGain, RankedGain } from '../entities/experience-gain';

/**
 * RG-E1 (variante) — Ordena o ranking de power gamers por XP ganho desc;
 * empate por nome asc. Atribui a posição (`rank`). Puro; não muta a entrada.
 */
export function sortPowerGamers(gains: ExperienceGain[]): RankedGain[] {
  return [...gains]
    .sort((a, b) => b.gained - a.gained || a.name.localeCompare(b.name))
    .map((gain, index) => ({ ...gain, rank: index + 1 }));
}
