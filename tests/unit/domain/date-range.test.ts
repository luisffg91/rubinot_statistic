import { describe, it, expect } from 'vitest';
import { daysInRange } from '@/domain/services/date-range';

describe('daysInRange', () => {
  it('mesmo dia conta 1', () => {
    expect(daysInRange('2026-01-01', '2026-01-01')).toBe(1);
  });

  it('conta os dias inclusivos', () => {
    expect(daysInRange('2026-01-01', '2026-01-07')).toBe(7);
  });

  it('from > to retorna 1 (mínimo)', () => {
    expect(daysInRange('2026-01-07', '2026-01-01')).toBe(1);
  });
});
