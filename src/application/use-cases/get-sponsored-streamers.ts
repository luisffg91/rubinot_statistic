import type { SponsoredStreamersRepository } from '@/domain/ports/sponsored-streamers-repository';
import type { SponsoredStreamer, SponsoredChannel } from '@/domain/entities/sponsored';
import { sortStreamers } from '@/domain/services/sort-streamers';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface Sponsored {
  streamers: SponsoredStreamer[];
  channels: SponsoredChannel[];
  liveCount: number;
  origin: DataOrigin;
  fetchedAt: Date;
}

/** Caso de uso: patrocinados (streamers ordenados com ao vivo primeiro + canais). */
export class GetSponsoredStreamers {
  constructor(private readonly repo: SponsoredStreamersRepository) {}

  async execute(): Promise<Sponsored> {
    const { streamers, channels, origin, fetchedAt } = await this.repo.fetchSponsored();
    const sorted = sortStreamers(streamers);
    return {
      streamers: sorted,
      channels,
      liveCount: sorted.filter((s) => s.isLive).length,
      origin,
      fetchedAt,
    };
  }
}
