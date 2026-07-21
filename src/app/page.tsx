import { GetServerSnapshot } from '@/application/use-cases/get-server-snapshot';
import { RubinotWorldsClient } from '@/infrastructure/rubinot/rubinot-worlds-client';
import { toSnapshotDto } from '@/app/_lib/to-snapshot-dto';
import type { ServerSnapshotDto } from '@/app/_lib/snapshot-dto';
import { ServerVitals } from '@/app/components/server-vitals';
import { CharacterSearch } from '@/app/components/character-search';
import { RubinotBanner } from '@/app/components/rubinot-banner';

export const dynamic = 'force-dynamic';

/** Snapshot inicial via SSR (SC-001). Em falha, retorna null e a UI degrada (FR-009). */
async function loadInitialSnapshot(): Promise<ServerSnapshotDto | null> {
  try {
    const useCase = new GetServerSnapshot(new RubinotWorldsClient());
    return toSnapshotDto(await useCase.execute());
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const snapshot = await loadInitialSnapshot();
  return (
    <main className="container">
      <header className="hero hero--art">
        <h1>As estatísticas do Rubinot</h1>
        <p>O pulso do servidor em tempo real — de forma didática.</p>
        <CharacterSearch />
      </header>
      <ServerVitals initial={snapshot} />
      <RubinotBanner />
    </main>
  );
}
