import type { SponsoredStreamer, SponsoredChannel } from '../entities/sponsored';
import type { DataOrigin } from '../shared/data-origin';

export interface SponsoredResult {
  streamers: SponsoredStreamer[];
  channels: SponsoredChannel[];
  origin: DataOrigin;
  fetchedAt: Date;
}

/** Port: fonte dos patrocinados (lista curada + status ao vivo da Twitch). */
export interface SponsoredStreamersRepository {
  fetchSponsored(): Promise<SponsoredResult>;
}
