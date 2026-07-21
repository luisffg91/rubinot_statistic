import type { Metadata } from 'next';
import Link from 'next/link';
import { GetGuilds } from '@/application/use-cases/get-guilds';
import { getGuildsRepository } from '@/infrastructure/config/repositories';
import { toGuildsListDto } from '@/app/_lib/guilds-dto';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Guilds' };

export default async function GuildsPage() {
  const data = toGuildsListDto(await new GetGuilds(getGuildsRepository()).list());
  return (
    <main className="container">
      <header className="hero">
        <h1>Guilds</h1>
        <p>
          {data.count.toLocaleString('pt-BR')} guilds no servidor.
          {data.origin === 'exemplo' && (
            <>
              {' '}
              <DemoBadge />
            </>
          )}
        </p>
      </header>
      <ul className="guilds-grid" data-testid="guilds-grid">
        {data.guilds.map((g) => (
          <li key={g.name} className="data-block guild-card">
            <Link href={`/guilds/${encodeURIComponent(g.name)}`}>{g.name}</Link>
            <span className="guild-card__meta">
              {g.world} · {g.memberCount} membros
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
