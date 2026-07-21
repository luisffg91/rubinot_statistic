import Link from 'next/link';
import { GetServerSnapshot } from '@/application/use-cases/get-server-snapshot';
import { GetBoostedOfDay } from '@/application/use-cases/get-boosted-of-day';
import { GetSponsoredStreamers } from '@/application/use-cases/get-sponsored-streamers';
import { GetNews } from '@/application/use-cases/get-news';
import {
  getWorldsRepository,
  getBossRepository,
  getSponsoredStreamersRepository,
  getNewsRepository,
} from '@/infrastructure/config/repositories';
import { toSnapshotDto } from '@/app/_lib/to-snapshot-dto';
import { toBoostedDto, type BoostedDto } from '@/app/_lib/boss-dto';
import { toStreamersDto, type StreamerDto } from '@/app/_lib/streamers-dto';
import { toNewsDto, type NewsItemDto } from '@/app/_lib/news-dto';
import type { ServerSnapshotDto } from '@/app/_lib/snapshot-dto';
import { ServerVitals } from '@/app/components/server-vitals';
import { CharacterSearch } from '@/app/components/character-search';
import { RubinotBanner } from '@/app/components/rubinot-banner';
import { BoostedCards } from '@/app/components/boosted-cards';
import { StreamerCard } from '@/app/components/streamer-card';
import { NewsList } from '@/app/components/news-list';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';

async function loadInitialSnapshot(): Promise<ServerSnapshotDto | null> {
  try {
    return toSnapshotDto(await new GetServerSnapshot(getWorldsRepository()).execute());
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

async function loadNews(): Promise<NewsItemDto[]> {
  try {
    return toNewsDto(await new GetNews(getNewsRepository()).execute()).items;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [snapshot, boosted, live, news] = await Promise.all([
    loadInitialSnapshot(),
    loadBoosted(),
    loadLiveStreamers(),
    loadNews(),
  ]);

  return (
    <main className="container home">
      <header className="hero hero--art">
        <h1>As estatísticas do Rubinot</h1>
        <p>O pulso do servidor em tempo real — de forma didática.</p>
        <CharacterSearch />
        <p className="hero__hint">
          Para teste, busque pelo personagem{' '}
          <Link href="/character/Dejairzin">Dejairzin</Link>.
        </p>
      </header>

      {news.length > 0 && (
        <section className="home-section">
          <h2 className="section-title">News</h2>
          <NewsList items={news} />
        </section>
      )}

      <ServerVitals initial={snapshot} />

      {boosted && (
        <section className="home-section">
          <h2 className="section-title">
            Boosted do dia
            {boosted.origin === 'exemplo' && <DemoBadge />}
          </h2>
          <BoostedCards boosted={boosted} />
        </section>
      )}

      {live.length > 0 && (
        <section className="home-section">
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
