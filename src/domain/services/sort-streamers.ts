import type { SponsoredStreamer } from '../entities/sponsored';

/**
 * Ordena streamers: ao vivo primeiro; entre os ao vivo, por espectadores desc;
 * o restante por nome asc. Puro; não muta a entrada.
 */
export function sortStreamers(streamers: SponsoredStreamer[]): SponsoredStreamer[] {
  return [...streamers].sort((a, b) => {
    if (a.isLive !== b.isLive) return a.isLive ? -1 : 1;
    if (a.isLive && b.isLive) return (b.viewers ?? 0) - (a.viewers ?? 0);
    return a.displayName.localeCompare(b.displayName);
  });
}
