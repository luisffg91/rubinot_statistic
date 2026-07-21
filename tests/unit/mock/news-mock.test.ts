import { describe, it, expect } from 'vitest';
import { MockNewsRepository } from '@/infrastructure/mock/mock-news-repository';

describe('MockNewsRepository (demo)', () => {
  it('retorna itens rotulados como exemplo, com título/data/url', async () => {
    const r = await new MockNewsRepository().fetchNews();
    expect(r.origin).toBe('exemplo');
    expect(r.items.length).toBeGreaterThan(0);
    for (const item of r.items) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.date).toBeInstanceOf(Date);
      expect(item.url).toContain('rubinot.com.br');
    }
  });
});
