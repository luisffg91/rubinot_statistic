import { describe, it, expect } from 'vitest';
import { sortStreamers } from '@/domain/services/sort-streamers';
import type { SponsoredStreamer } from '@/domain/entities/sponsored';

const s = (
  displayName: string,
  isLive: boolean,
  viewers: number | null,
): SponsoredStreamer => ({
  platform: 'twitch',
  channel: displayName.toLowerCase(),
  displayName,
  url: `https://twitch.tv/${displayName}`,
  isLive,
  liveTitle: isLive ? 'live' : null,
  viewers,
});

describe('sortStreamers', () => {
  it('coloca os ao vivo primeiro', () => {
    const out = sortStreamers([s('Off', false, null), s('Live', true, 10)]);
    expect(out.map((x) => x.displayName)).toEqual(['Live', 'Off']);
  });

  it('entre os ao vivo, ordena por espectadores desc', () => {
    const out = sortStreamers([s('A', true, 100), s('B', true, 500)]);
    expect(out.map((x) => x.displayName)).toEqual(['B', 'A']);
  });
});
