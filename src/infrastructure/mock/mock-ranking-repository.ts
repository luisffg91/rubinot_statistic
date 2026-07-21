import type { RankingRepository, RankingResult } from '@/domain/ports/ranking-repository';
import { DEMO_WORLDS, demoCharacterName } from './demo-data';

const TOTAL = 120;

/** Adapter MOCK do ranking — dados de exemplo determinísticos (origin='exemplo'). */
export class MockRankingRepository implements RankingRepository {
  async fetchTopExperience(world?: string): Promise<RankingResult> {
    const all = Array.from({ length: TOTAL }, (_, i) => ({
      name: demoCharacterName(i),
      level: 1600 - i * 8,
      experience: 4_000_000_000 - i * 21_000_000,
      world: DEMO_WORLDS[i % DEMO_WORLDS.length],
    }));
    const entries = world ? all.filter((e) => e.world === world) : all;
    return { entries, worlds: DEMO_WORLDS, origin: 'exemplo', fetchedAt: new Date() };
  }
}
