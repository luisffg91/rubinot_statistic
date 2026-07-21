import { describe, it, expect } from 'vitest';
import worldsResponse from '../../fixtures/worlds-response.json';
import { computeTotalOnline } from '@/domain/services/compute-total-online';

describe('computeTotalOnline (RG-1)', () => {
  it('soma playersOnline de todos os mundos da fixture (espera 14167)', () => {
    expect(computeTotalOnline(worldsResponse.worlds)).toBe(14167);
  });

  it('retorna 0 para lista vazia', () => {
    expect(computeTotalOnline([])).toBe(0);
  });

  it('ignora valores negativos como 0', () => {
    expect(computeTotalOnline([{ playersOnline: 10 }, { playersOnline: -5 }])).toBe(10);
  });
});
