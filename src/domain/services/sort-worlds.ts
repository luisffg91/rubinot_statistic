import type { World } from '../entities/world';

/**
 * RG-3 — Ordena mundos por jogadores online (desc); empate resolvido por nome (asc)
 * para estabilidade da apresentação. Não muta a lista original.
 */
export function sortWorlds(worlds: World[]): World[] {
  return [...worlds].sort(
    (a, b) => b.playersOnline - a.playersOnline || a.name.localeCompare(b.name),
  );
}
