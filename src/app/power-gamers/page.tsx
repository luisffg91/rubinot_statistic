import type { Metadata } from 'next';
import Link from 'next/link';
import { GetPowerGamers } from '@/application/use-cases/get-power-gamers';
import { getPowerGamersRepository } from '@/infrastructure/config/repositories';
import { toPowerGamersDto } from '@/app/_lib/power-gamers-dto';
import { PowerGamersTable } from '@/app/components/power-gamers-table';
import { DemoBadge } from '@/app/components/demo-badge';
import type { GainPeriod } from '@/domain/entities/experience-gain';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Power Gamers' };

const PERIODS: { key: GainPeriod; label: string }[] = [
  { key: 'day', label: 'Dia' },
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mês' },
];

function parsePeriod(value?: string): GainPeriod {
  return value === 'week' || value === 'month' ? value : 'day';
}

export default async function PowerGamersPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period: raw } = await searchParams;
  const period = parsePeriod(raw);
  const pg = await new GetPowerGamers(getPowerGamersRepository()).execute(period);
  const data = toPowerGamersDto(pg);

  return (
    <main className="container">
      <header className="hero">
        <h1>Power Gamers</h1>
        <p>
          Quem mais ganhou experiência no período.
          {data.origin === 'exemplo' && (
            <>
              {' '}
              <DemoBadge />
            </>
          )}
        </p>
      </header>

      <nav className="world-filter" aria-label="Período">
        {PERIODS.map((x) => (
          <Link
            key={x.key}
            href={`/power-gamers?period=${x.key}`}
            className={data.period === x.key ? 'is-active' : ''}
          >
            {x.label}
          </Link>
        ))}
      </nav>

      <div className="data-block">
        {data.collecting ? (
          <p className="data-block__unavailable" data-testid="collecting">
            Coletando dados para este período… volte em breve.
          </p>
        ) : (
          <PowerGamersTable entries={data.entries} />
        )}
      </div>
    </main>
  );
}
