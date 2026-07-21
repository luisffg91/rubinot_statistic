import type { WorldsRepository } from '@/domain/ports/worlds-repository';
import type { World } from '@/domain/entities/world';

function world(
  name: string,
  pvpType: string,
  pvpTypeLabel: string,
  worldType: string,
  locked: boolean,
  playersOnline: number,
): World {
  return { name, pvpType, pvpTypeLabel, worldType, locked, createdAt: null, playersOnline, status: 'online' };
}

// Mundos de exemplo (fictícios/ilustrativos) para o modo demonstração.
const EXAMPLE_WORLDS: World[] = [
  world('Auroria', 'pvp', 'Open PvP', 'yellow', false, 972),
  world('Belaria', 'pvp', 'Open PvP', 'green', true, 853),
  world('Bellum', 'pvp-enforced', 'Retro PvP', 'yellow', false, 566),
  world('Divinian', 'no-pvp', 'Optional PvP', 'green', true, 665),
  world('Elysian', 'no-pvp', 'Optional PvP', 'yellow', false, 1269),
  world('Etherian', 'no-pvp', 'Optional PvP', 'green', true, 572),
  world('Grimoria I', 'pvp', 'Open PvP', 'green', true, 1046),
  world('Grimoria II', 'pvp', 'Open PvP', 'green', true, 614),
  world('Lunarian', 'no-pvp', 'Optional PvP', 'green', false, 988),
  world('Solaria', 'pvp', 'Open PvP', 'yellow', false, 742),
  world('Umbra', 'pvp-enforced', 'Retro PvP', 'green', false, 431),
  world('Verdant', 'no-pvp', 'Optional PvP', 'green', true, 803),
];

/** Adapter MOCK dos mundos — dados de exemplo determinísticos (origin='exemplo'). */
export class MockWorldsRepository implements WorldsRepository {
  async fetchWorlds() {
    return {
      worlds: EXAMPLE_WORLDS,
      source: 'exemplo:worlds',
      fetchedAt: new Date(),
      origin: 'exemplo' as const,
    };
  }
}
