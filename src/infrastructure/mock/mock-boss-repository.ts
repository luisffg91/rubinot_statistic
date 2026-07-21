import type { BossRepository, BoostedResult } from '@/domain/ports/boss-repository';

const SPRITE = 'https://static.tibia.com/images/library';

// Pares de exemplo (monstros do Tibia global) com sprites permanentes do static.tibia.com.
// Servem para ILUSTRAR a seção de boosted enquanto a fonte real do Rubinot (Onda 2) não existe;
// também é o fallback quando o TibiaData está indisponível. origin='exemplo'.
const DEMO_BOOSTED = [
  {
    boss: { name: 'Abyssador', imageUrl: `${SPRITE}/abyssador.gif` },
    creature: { name: 'Dragon Lord', imageUrl: `${SPRITE}/dragonlord.gif` },
  },
  {
    boss: { name: 'Gnomevil', imageUrl: `${SPRITE}/gnomehorticulist.gif` },
    creature: { name: 'Demon', imageUrl: `${SPRITE}/demon.gif` },
  },
  {
    boss: { name: 'Ahau', imageUrl: `${SPRITE}/ahau.gif` },
    creature: { name: 'Hydra', imageUrl: `${SPRITE}/hydra.gif` },
  },
];

/** Adapter MOCK do boosted do dia — monstros de exemplo com sprite (origin='exemplo'). */
export class MockBossRepository implements BossRepository {
  async fetchBoosted(): Promise<BoostedResult> {
    // Alterna por dia (determinístico, sem aleatoriedade) para dar sensação de rotação.
    const pick = DEMO_BOOSTED[new Date().getUTCDate() % DEMO_BOOSTED.length];
    return {
      boosted: { boss: pick.boss, creature: pick.creature, date: new Date() },
      origin: 'exemplo',
      fetchedAt: new Date(),
    };
  }
}
