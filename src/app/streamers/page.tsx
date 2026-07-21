import type { Metadata } from 'next';
import { GetSponsoredStreamers } from '@/application/use-cases/get-sponsored-streamers';
import { getSponsoredStreamersRepository } from '@/infrastructure/config/repositories';
import { toStreamersDto } from '@/app/_lib/streamers-dto';
import { StreamerCard } from '@/app/components/streamer-card';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Streamers & Criadores' };

export default async function StreamersPage() {
  const data = toStreamersDto(await new GetSponsoredStreamers(getSponsoredStreamersRepository()).execute());
  return (
    <main className="container">
      <header className="hero">
        <h1>Streamers & Criadores</h1>
        <p>
          Streamers patrocinados ao vivo na Twitch e canais parceiros no YouTube.
          {data.origin === 'exemplo' && (
            <>
              {' '}
              <DemoBadge />
            </>
          )}
        </p>
      </header>

      <section>
        <h2 className="section-title">
          Ao vivo agora {data.liveCount > 0 && <span className="live-count">{data.liveCount}</span>}
        </h2>
        <div className="streamers-grid" data-testid="streamers-grid">
          {data.streamers.map((s) => (
            <StreamerCard key={s.channel} streamer={s} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Canais no YouTube</h2>
        <ul className="channels-list" data-testid="channels-list">
          {data.channels.map((c) => (
            <li key={c.url} className="data-block channel-item">
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
