import { describe, it, expect } from 'vitest';
import { MockWorldsRepository } from '@/infrastructure/mock/mock-worlds-repository';
import { computeTotalOnline } from '@/domain/services/compute-total-online';

describe('MockWorldsRepository (demo)', () => {
  it('rotula origem como exemplo e traz mundos online', async () => {
    const r = await new MockWorldsRepository().fetchWorlds();
    expect(r.origin).toBe('exemplo');
    expect(r.worlds.length).toBeGreaterThan(0);
    expect(r.worlds.every((w) => w.status === 'online')).toBe(true);
  });

  it('total online é a soma dos mundos e é positivo', async () => {
    const r = await new MockWorldsRepository().fetchWorlds();
    expect(computeTotalOnline(r.worlds)).toBeGreaterThan(0);
  });
});
