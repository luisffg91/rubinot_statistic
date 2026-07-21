import type { StreamerDto } from '@/app/_lib/streamers-dto';

/** Card de streamer patrocinado; destaca quem está ao vivo. */
export function StreamerCard({ streamer }: { streamer: StreamerDto }) {
  return (
    <a
      className={`streamer-card${streamer.isLive ? ' streamer-card--live' : ''}`}
      href={streamer.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="streamer-card__head">
        <span className="streamer-card__name">{streamer.displayName}</span>
        {streamer.isLive && (
          <span className="live-badge" data-testid="live-badge">
            AO VIVO
          </span>
        )}
      </span>
      {streamer.isLive ? (
        <span className="streamer-card__title">
          {streamer.liveTitle}
          {streamer.viewers != null && (
            <span className="streamer-card__viewers">
              {' '}
              · {streamer.viewers.toLocaleString('pt-BR')} espectadores
            </span>
          )}
        </span>
      ) : (
        <span className="streamer-card__offline">offline</span>
      )}
    </a>
  );
}
