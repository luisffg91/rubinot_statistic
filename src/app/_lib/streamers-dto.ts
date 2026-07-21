import type { Sponsored } from '@/application/use-cases/get-sponsored-streamers';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface StreamerDto {
  channel: string;
  displayName: string;
  url: string;
  isLive: boolean;
  liveTitle: string | null;
  viewers: number | null;
}

export interface ChannelDto {
  name: string;
  url: string;
}

export interface StreamersDto {
  streamers: StreamerDto[];
  channels: ChannelDto[];
  liveCount: number;
  origin: DataOrigin;
  fetchedAt: string;
}

export function toStreamersDto(s: Sponsored): StreamersDto {
  return {
    streamers: s.streamers.map((x) => ({
      channel: x.channel,
      displayName: x.displayName,
      url: x.url,
      isLive: x.isLive,
      liveTitle: x.liveTitle,
      viewers: x.viewers,
    })),
    channels: s.channels.map((c) => ({ name: c.name, url: c.url })),
    liveCount: s.liveCount,
    origin: s.origin,
    fetchedAt: s.fetchedAt.toISOString(),
  };
}
