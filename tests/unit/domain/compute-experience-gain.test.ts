import { describe, it, expect } from 'vitest';
import { computeExperienceGain } from '@/domain/services/compute-experience-gain';

describe('computeExperienceGain (RG-E2)', () => {
  it('retorna o delta positivo', () => {
    expect(computeExperienceGain(100, 250)).toBe(150);
  });

  it('delta negativo (reset/rollback) vira 0', () => {
    expect(computeExperienceGain(500, 300)).toBe(0);
  });

  it('sem variação retorna 0', () => {
    expect(computeExperienceGain(1000, 1000)).toBe(0);
  });
});
