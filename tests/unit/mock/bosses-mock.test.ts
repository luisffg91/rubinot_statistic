import { describe, it, expect } from 'vitest';
import { MockBossRepository } from '@/infrastructure/mock/mock-boss-repository';

describe('MockBossRepository (demo)', () => {
  it('retorna boss e criatura rotulados como exemplo', async () => {
    const r = await new MockBossRepository().fetchBoosted();
    expect(r.origin).toBe('exemplo');
    expect(r.boosted.boss.length).toBeGreaterThan(0);
    expect(r.boosted.creature.length).toBeGreaterThan(0);
  });
});
