import type { Metadata } from 'next';
import Link from 'next/link';
import { GetTopExperience } from '@/application/use-cases/get-top-experience';
import { getRankingRepository } from '@/infrastructure/config/repositories';
import { toRankingDto } from '@/app/_lib/ranking-dto';
import { RankingTable } from '@/app/components/ranking-table';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Top Experiência' };

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{ world?: string }>;
}) {
  const { world } = await searchParams;
  const top = await new GetTopExperience(getRankingRepository()).execute(world);
  const data = toRankingDto(top);

  return (
    <main className="container">
      <header className="hero">
        <h1>Top Experiência</h1>
        <p>
          Os personagens de maior experiência do servidor.
          {data.origin === 'exemplo' && (
            <>
              {' '}
              <DemoBadge />
            </>
          )}
        </p>
      </header>

      <nav className="world-filter" aria-label="Filtrar por mundo">
        <Link href="/ranking" className={!data.world ? 'is-active' : ''}>
          Todos
        </Link>
        {data.worlds.map((w) => (
          <Link
            key={w}
            href={`/ranking?world=${encodeURIComponent(w)}`}
            className={data.world === w ? 'is-active' : ''}
          >
            {w}
          </Link>
        ))}
      </nav>

      <div className="data-block">
        <RankingTable entries={data.entries} />
      </div>
    </main>
  );
}
