import { describe, it, expect } from 'vitest';
import { MockRankingRepository } from '@/infrastructure/mock/mock-ranking-repository';

describe('MockRankingRepository (demo)', () => {
  it('rotula a origem como exemplo e traz mundos', async () => {
    const r = await new MockRankingRepository().fetchTopExperience();
    expect(r.origin).toBe('exemplo');
    expect(r.worlds.length).toBeGreaterThan(0);
    expect(r.entries.length).toBeGreaterThanOrEqual(100);
  });

  it('é determinístico (mesmas entradas em duas chamadas)', async () => {
    const a = await new MockRankingRepository().fetchTopExperience();
    const b = await new MockRankingRepository().fetchTopExperience();
    expect(a.entries).toEqual(b.entries);
  });

  it('filtra por mundo', async () => {
    const r = await new MockRankingRepository().fetchTopExperience('Auroria');
    expect(r.entries.every((e) => e.world === 'Auroria')).toBe(true);
  });
});
