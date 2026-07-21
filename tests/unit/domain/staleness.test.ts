import { describe, it, expect } from 'vitest';
import { isStale, REFRESH_INTERVAL_MS } from '@/domain/services/staleness';

describe('isStale (RG-4)', () => {
  const now = new Date(1_000_000);

  it('não é stale dentro do intervalo', () => {
    const fetchedAt = new Date(now.getTime() - (REFRESH_INTERVAL_MS - 1));
    expect(isStale(fetchedAt, now, REFRESH_INTERVAL_MS)).toBe(false);
  });

  it('é stale além do intervalo', () => {
    const fetchedAt = new Date(now.getTime() - (REFRESH_INTERVAL_MS + 1));
    expect(isStale(fetchedAt, now, REFRESH_INTERVAL_MS)).toBe(true);
  });
});
