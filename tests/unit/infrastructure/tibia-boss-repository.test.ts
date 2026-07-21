import { describe, it, expect, vi, afterEach } from 'vitest';
import { TibiaBossRepository } from '@/infrastructure/tibiadata/tibia-boss-repository';
import { MockBossRepository } from '@/infrastructure/mock/mock-boss-repository';

afterEach(() => vi.unstubAllGlobals());

describe('TibiaBossRepository', () => {
  it('cai no fallback (mock) quando o TibiaData falha', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    const repo = new TibiaBossRepository(new MockBossRepository());
    const r = await repo.fetchBoosted();
    expect(r.boosted.boss.name).toBe('Guardião das Brumas'); // valor do mock
  });

  it('usa os dados do TibiaData quando disponível', async () => {
    const bosses = { boostable_bosses: { boosted: { name: 'Boss X', image_url: 'http://x/boss.gif' } } };
    const creatures = { creatures: { boosted: { name: 'Creature Y', image_url: 'http://x/cre.gif' } } };
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve(String(url).includes('boostablebosses') ? bosses : creatures),
        } as Response),
      ),
    );
    const repo = new TibiaBossRepository(new MockBossRepository());
    const r = await repo.fetchBoosted();
    expect(r.boosted.boss.name).toBe('Boss X');
    expect(r.boosted.creature.name).toBe('Creature Y');
    expect(r.boosted.boss.imageUrl).toContain('.gif');
  });
});
