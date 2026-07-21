/** Streamer patrocinado (Twitch), com status ao vivo quando disponível. */
export interface SponsoredStreamer {
  platform: 'twitch';
  channel: string; // handle da Twitch
  displayName: string;
  url: string;
  isLive: boolean;
  liveTitle: string | null;
  viewers: number | null;
}

/** Canal patrocinado (YouTube). */
export interface SponsoredChannel {
  platform: 'youtube';
  name: string;
  url: string;
}
