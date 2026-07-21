import { describe, it, expect } from 'vitest';
import { MockSponsoredStreamersRepository } from '@/infrastructure/mock/mock-sponsored-streamers-repository';

describe('MockSponsoredStreamersRepository (demo)', () => {
  it('rotula origem como exemplo e traz streamers ao vivo + canais', async () => {
    const r = await new MockSponsoredStreamersRepository().fetchSponsored();
    expect(r.origin).toBe('exemplo');
    expect(r.streamers.some((s) => s.isLive)).toBe(true);
    expect(r.streamers.every((s) => s.platform === 'twitch')).toBe(true);
    expect(r.channels.length).toBeGreaterThan(0);
    expect(r.channels.every((c) => c.platform === 'youtube')).toBe(true);
  });
});
