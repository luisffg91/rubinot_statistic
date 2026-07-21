import type { WorldData } from '../entities/world';

/**
 * RG-1 — Total de jogadores online = soma de `playersOnline` de todos os mundos.
 * Regra de domínio pura e centralizada (Princípio III). Ignora valores negativos.
 */
export function computeTotalOnline(worlds: Pick<WorldData, 'playersOnline'>[]): number {
  return worlds.reduce((sum, w) => sum + (w.playersOnline > 0 ? w.playersOnline : 0), 0);
}
