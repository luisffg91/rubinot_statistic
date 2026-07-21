'use client';

import { useEffect, useState } from 'react';
import type { ServerSnapshotDto, WorldDto } from '@/app/_lib/snapshot-dto';
import { REFRESH_INTERVAL_MS } from '@/domain/services/staleness';
import { OnlineCounter } from './online-counter';
import { WorldsList } from './worlds-list';
import { DemoBadge } from './demo-badge';

const nf = new Intl.NumberFormat('pt-BR');

function updatedLabel(fetchedAt: string | null): string {
  if (!fetchedAt) return 'sem atualização';
  const secs = Math.max(0, Math.round((Date.now() - new Date(fetchedAt).getTime()) / 1000));
  return `atualizado há ${secs}s`;
}

/** Estatísticas de apoio derivadas dos mundos, para dar corpo ao resumo. */
function onlineStats(worlds: WorldDto[], total: number) {
  const onlineCount = worlds.filter((w) => w.status === 'online').length;
  const busiest = worlds.reduce<WorldDto | null>(
    (best, w) => (!best || w.playersOnline > best.playersOnline ? w : best),
    null,
  );
  const average = worlds.length ? Math.round(total / worlds.length) : 0;
  return { onlineCount, busiest, average };
}

/**
 * Vitais do servidor num único card ("Status do servidor"): total online + estatísticas de
 * apoio no topo e a lista de mundos abaixo. Faz polling do BFF (30s), mantém o último valor
 * conhecido em falha e sinaliza staleness (FR-002/003/009/010).
 */
export function ServerVitals({ initial }: { initial: ServerSnapshotDto | null }) {
  const [snapshot, setSnapshot] = useState<ServerSnapshotDto | null>(initial);
  const [stale, setStale] = useState(false);
  const [unavailable, setUnavailable] = useState(initial === null);
  // O rótulo "há Xs" depende de Date.now(), que difere entre SSR e cliente. Só o exibimos
  // após montar, evitando divergência de hidratação (mostra "agora" no primeiro paint).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let active = true;

    async function poll() {
      try {
        const res = await fetch('/api/server-snapshot', { cache: 'no-store' });
        if (!res.ok) throw new Error('unavailable');
        const data = (await res.json()) as ServerSnapshotDto;
        if (!active) return;
        setSnapshot(data);
        setStale(false);
        setUnavailable(false);
      } catch {
        if (!active) return;
        // Mantém o último valor; se nunca houve dado, marca indisponível (FR-009/010).
        setStale((prev) => prev || true);
        setSnapshot((prev) => {
          if (prev === null) setUnavailable(true);
          return prev;
        });
      }
    }

    poll(); // coleta imediata ao montar
    const id = setInterval(poll, REFRESH_INTERVAL_MS);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const stats = snapshot ? onlineStats(snapshot.worlds, snapshot.totalOnline) : null;
  const updated = mounted ? updatedLabel(snapshot?.fetchedAt ?? null) : 'atualizado agora';

  return (
    <section className="home-section">
      <h2 className="section-title">
        Status do servidor
        {snapshot?.origin === 'exemplo' && <DemoBadge />}
        {stale && (
          <span className="badge badge--warn" role="status">
            possivelmente desatualizado
          </span>
        )}
      </h2>

      <div className="panel status-card">
        {unavailable ? (
          <p className="data-block__unavailable" role="status">
            Dados temporariamente indisponíveis. Tentaremos novamente automaticamente.
          </p>
        ) : (
          <>
            <div className="status-card__summary">
              <OnlineCounter total={snapshot?.totalOnline ?? null} />
              {stats && (
                <dl className="vitals-stats">
                  <div>
                    <dt>Mundos online</dt>
                    <dd>{stats.onlineCount}</dd>
                  </div>
                  {stats.busiest && (
                    <div>
                      <dt>Mais movimentado</dt>
                      <dd>
                        {stats.busiest.name}{' '}
                        <span className="vitals-stats__num">
                          {nf.format(stats.busiest.playersOnline)}
                        </span>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>Média por mundo</dt>
                    <dd>{nf.format(stats.average)}</dd>
                  </div>
                </dl>
              )}
            </div>

            {snapshot && (
              <div className="status-card__worlds">
                <h3 className="status-card__worlds-title">Mundos</h3>
                <WorldsList worlds={snapshot.worlds} />
              </div>
            )}
          </>
        )}

        <footer className="data-block__footer">
          <span>{updated}</span>
        </footer>
      </div>
    </section>
  );
}
