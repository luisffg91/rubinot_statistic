import type { Metadata } from 'next';
import Link from 'next/link';
import { GetGuilds } from '@/application/use-cases/get-guilds';
import { getGuildsRepository } from '@/infrastructure/config/repositories';
import { toGuildDetailDto } from '@/app/_lib/guilds-dto';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Guild' };

export default async function GuildDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const data = toGuildDetailDto(await new GetGuilds(getGuildsRepository()).detail(decoded));

  return (
    <main className="container">
      <header className="hero">
        <p>
          <Link href="/guilds">← guilds</Link>
        </p>
        <h1>{decoded}</h1>
        {data.origin === 'exemplo' && <DemoBadge />}
      </header>
      <div className="data-block">
        {data.guild ? (
          <>
            <p>
              <strong>Mundo:</strong> {data.guild.world} · <strong>Membros:</strong>{' '}
              {data.guild.memberCount}
            </p>
            {data.guild.members && (
              <ul className="guild-members" data-testid="guild-members">
                {data.guild.members.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="data-block__unavailable" data-testid="guild-not-found">
            Guild não encontrada.
          </p>
        )}
      </div>
    </main>
  );
}
