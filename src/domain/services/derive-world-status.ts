import type { World, WorldData } from '../entities/world';

/**
 * RG-2 — Status de mundo.
 * Um mundo presente no feed é considerado ONLINE. O atributo `locked` (travado para
 * novos personagens) é independente e NÃO significa offline. Se a fonte passar a indicar
 * manutenção/offline, esta função é o único ponto a alterar (ver research C3).
 */
export function deriveWorldStatus(world: WorldData): World {
  return { ...world, status: 'online' };
}
