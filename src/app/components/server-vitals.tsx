'use client';

import { useEffect, useState } from 'react';
import type { ServerSnapshotDto } from '@/app/_lib/snapshot-dto';
import { REFRESH_INTERVAL_MS } from '@/domain/services/staleness';
import { DataBlock } from './data-block';
import { OnlineCounter } from './online-counter';
import { WorldsList } from './worlds-list';
import { DemoBadge } from './demo-badge';

function updatedLabel(fetchedAt: string | null): string {
  if (!fetchedAt) return 'sem atualização';
  const secs = Math.max(0, Math.round((Date.now() - new Date(fetchedAt).getTime()) / 1000));
  return `atualizado há ${secs}s`;
}

/**
 * Componente cliente dos vitais do servidor: faz polling do BFF (30s) e mantém o último
 * valor conhecido em caso de falha, sinalizando staleness (FR-002/003/009/010).
 */
export function ServerVitals({ initial }: { initial: ServerSnapshotDto | null }) {
  const [snapshot, setSnapshot] = useState<ServerSnapshotDto | null>(initial);
  const [stale, setStale] = useState(false);
  const [unavailable, setUnavailable] = useState(initial === null);

  useEffect(() => {
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

  return (
    <div className="grid">
      <DataBlock
        title="Jogadores online"
        source={snapshot?.source}
        updatedLabel={updatedLabel(snapshot?.fetchedAt ?? null)}
        stale={stale}
        unavailable={unavailable}
      >
        <OnlineCounter total={snapshot?.totalOnline ?? null} />
        {snapshot?.origin === 'exemplo' && <DemoBadge />}
      </DataBlock>

      <DataBlock
        title="Mundos"
        source={snapshot?.source}
        updatedLabel={updatedLabel(snapshot?.fetchedAt ?? null)}
        stale={stale}
        unavailable={unavailable}
      >
        {snapshot && <WorldsList worlds={snapshot.worlds} />}
        {snapshot?.origin === 'exemplo' && <DemoBadge />}
      </DataBlock>
    </div>
  );
}
