import type { BossRepository, BoostedResult } from '@/domain/ports/boss-repository';

/** Adapter MOCK do boosted do dia — nomes fictícios, sem imagem (origin='exemplo'). */
export class MockBossRepository implements BossRepository {
  async fetchBoosted(): Promise<BoostedResult> {
    return {
      boosted: {
        boss: { name: 'Guardião das Brumas', imageUrl: null },
        creature: { name: 'Lobo Espectral', imageUrl: null },
        date: new Date(),
      },
      origin: 'exemplo',
      fetchedAt: new Date(),
    };
  }
}
