import type { Metadata } from 'next';
import Link from 'next/link';
import { GetPowerGamers } from '@/application/use-cases/get-power-gamers';
import { getPowerGamersRepository } from '@/infrastructure/config/repositories';
import { toPowerGamersDto } from '@/app/_lib/power-gamers-dto';
import { PowerGamersTable } from '@/app/components/power-gamers-table';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Power Gamers' };

const MODES = [
  { key: 'day', label: 'Dia' },
  { key: 'range', label: 'Período' },
];

function isoOf(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDay(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export default async function PowerGamersPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; date?: string; from?: string; to?: string }>;
}) {
  const sp = await searchParams;
  const mode = sp.mode === 'range' ? 'range' : 'day';
  const today = isoOf(new Date());
  const weekAgo = isoOf(new Date(Date.now() - 6 * 86_400_000));
  // Nunca aceita datas futuras (nem por URL): limita ao dia de hoje.
  const noFuture = (iso: string) => (iso > today ? today : iso);

  let from: string;
  let to: string;
  if (mode === 'day') {
    from = to = noFuture(sp.date ?? today);
  } else {
    from = noFuture(sp.from ?? weekAgo);
    to = noFuture(sp.to ?? today);
  }

  const data = toPowerGamersDto(
    await new GetPowerGamers(getPowerGamersRepository()).execute(from, to),
  );

  return (
    <main className="container">
      <header className="hero">
        <h1>Power Gamers</h1>
        <p>
          {mode === 'day'
            ? `Experiência ganha no dia ${formatDay(data.from)}.`
            : `Experiência ganha de ${formatDay(data.from)} a ${formatDay(data.to)}.`}
          {data.origin === 'exemplo' && (
            <>
              {' '}
              <DemoBadge />
            </>
          )}
        </p>
      </header>

      <nav className="world-filter" aria-label="Filtro">
        {MODES.map((m) => (
          <Link
            key={m.key}
            href={`/power-gamers?mode=${m.key}`}
            className={mode === m.key ? 'is-active' : ''}
          >
            {m.label}
          </Link>
        ))}
      </nav>

      {mode === 'day' ? (
        <form className="day-form" method="get" role="search">
          <input type="hidden" name="mode" value="day" />
          <label htmlFor="pg-date">Escolha o dia</label>
          <input id="pg-date" type="date" name="date" defaultValue={data.from} max={today} />
          <button type="submit">Ver</button>
        </form>
      ) : (
        <form className="day-form" method="get" role="search">
          <input type="hidden" name="mode" value="range" />
          <label htmlFor="pg-from">De</label>
          <input id="pg-from" type="date" name="from" defaultValue={data.from} max={today} />
          <label htmlFor="pg-to">até</label>
          <input id="pg-to" type="date" name="to" defaultValue={data.to} max={today} />
          <button type="submit">Ver</button>
        </form>
      )}

      <div className="data-block table-scroll">
        {data.collecting ? (
          <p className="data-block__unavailable" data-testid="collecting">
            Coletando dados para este intervalo… volte em breve.
          </p>
        ) : (
          <PowerGamersTable entries={data.entries} />
        )}
      </div>
    </main>
  );
}
