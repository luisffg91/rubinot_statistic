import type { BossRepository, BoostedResult } from '@/domain/ports/boss-repository';

/** Adapter MOCK do boosted do dia — nomes fictícios (origin='exemplo'). */
export class MockBossRepository implements BossRepository {
  async fetchBoosted(): Promise<BoostedResult> {
    return {
      boosted: { boss: 'Guardião das Brumas', creature: 'Lobo Espectral', date: new Date() },
      origin: 'exemplo',
      fetchedAt: new Date(),
    };
  }
}
