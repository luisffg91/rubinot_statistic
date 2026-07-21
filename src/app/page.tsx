import { GetServerSnapshot } from '@/application/use-cases/get-server-snapshot';
import { RubinotWorldsClient } from '@/infrastructure/rubinot/rubinot-worlds-client';
import { GetBoostedOfDay } from '@/application/use-cases/get-boosted-of-day';
import { GetSponsoredStreamers } from '@/application/use-cases/get-sponsored-streamers';
import {
  getBossRepository,
  getSponsoredStreamersRepository,
} from '@/infrastructure/config/repositories';
import { toSnapshotDto } from '@/app/_lib/to-snapshot-dto';
import { toBoostedDto, type BoostedDto } from '@/app/_lib/boss-dto';
import { toStreamersDto, type StreamerDto } from '@/app/_lib/streamers-dto';
import type { ServerSnapshotDto } from '@/app/_lib/snapshot-dto';
import { ServerVitals } from '@/app/components/server-vitals';
import { CharacterSearch } from '@/app/components/character-search';
import { RubinotBanner } from '@/app/components/rubinot-banner';
import { BoostedCards } from '@/app/components/boosted-cards';
import { StreamerCard } from '@/app/components/streamer-card';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';

async function loadInitialSnapshot(): Promise<ServerSnapshotDto | null> {
  try {
    return toSnapshotDto(await new GetServerSnapshot(new RubinotWorldsClient()).execute());
  } catch {
    return null;
  }
}

async function loadBoosted(): Promise<BoostedDto | null> {
  try {
    return toBoostedDto(await new GetBoostedOfDay(getBossRepository()).execute());
  } catch {
    return null;
  }
}

async function loadLiveStreamers(): Promise<StreamerDto[]> {
  try {
    const data = toStreamersDto(
      await new GetSponsoredStreamers(getSponsoredStreamersRepository()).execute(),
    );
    return data.streamers.filter((s) => s.isLive);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [snapshot, boosted, live] = await Promise.all([
    loadInitialSnapshot(),
    loadBoosted(),
    loadLiveStreamers(),
  ]);

  return (
    <main className="container">
      <header className="hero hero--art">
        <h1>As estatísticas do Rubinot</h1>
        <p>O pulso do servidor em tempo real — de forma didática.</p>
        <CharacterSearch />
      </header>

      <ServerVitals initial={snapshot} />

      {boosted && (
        <section>
          <h2 className="section-title">
            Boosted do dia
            {boosted.origin === 'exemplo' && <DemoBadge />}
          </h2>
          <BoostedCards boosted={boosted} />
        </section>
      )}

      {live.length > 0 && (
        <section>
          <h2 className="section-title">
            Streamers ao vivo <span className="live-count">{live.length}</span>
          </h2>
          <div className="streamers-grid" data-testid="home-live-streamers">
            {live.map((s) => (
              <StreamerCard key={s.channel} streamer={s} />
            ))}
          </div>
        </section>
      )}

      <RubinotBanner />
    </main>
  );
}
