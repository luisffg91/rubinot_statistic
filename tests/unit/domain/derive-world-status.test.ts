import { describe, it, expect } from 'vitest';
import { deriveWorldStatus } from '@/domain/services/derive-world-status';
import type { WorldData } from '@/domain/entities/world';

const base: WorldData = {
  name: 'Auroria',
  pvpType: 'pvp',
  pvpTypeLabel: 'Open PvP',
  worldType: 'yellow',
  locked: false,
  createdAt: null,
  playersOnline: 100,
};

describe('deriveWorldStatus (RG-2)', () => {
  it('mundo presente no feed é considerado online', () => {
    expect(deriveWorldStatus(base).status).toBe('online');
  });

  it('locked NÃO implica offline', () => {
    expect(deriveWorldStatus({ ...base, locked: true }).status).toBe('online');
  });
});
