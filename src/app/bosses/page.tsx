import type { Metadata } from 'next';
import { GetBoostedOfDay } from '@/application/use-cases/get-boosted-of-day';
import { getBossRepository } from '@/infrastructure/config/repositories';
import { toBoostedDto } from '@/app/_lib/boss-dto';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Bosses Boostados' };

export default async function BossesPage() {
  const data = toBoostedDto(await new GetBoostedOfDay(getBossRepository()).execute());
  return (
    <main className="container">
      <header className="hero">
        <h1>Bosses Boostados</h1>
        <p>
          O boss e a criatura em destaque hoje.
          {data.origin === 'exemplo' && (
            <>
              {' '}
              <DemoBadge />
            </>
          )}
        </p>
      </header>
      <div className="grid">
        <div className="data-block boosted-card">
          <h2>Boss do dia</h2>
          <p className="boosted-card__name" data-testid="boss">
            {data.boss}
          </p>
        </div>
        <div className="data-block boosted-card">
          <h2>Criatura do dia</h2>
          <p className="boosted-card__name" data-testid="creature">
            {data.creature}
          </p>
        </div>
      </div>
    </main>
  );
}
