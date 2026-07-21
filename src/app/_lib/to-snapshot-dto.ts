import type { ServerSnapshot } from '@/domain/entities/server-snapshot';
import type { ServerSnapshotDto } from './snapshot-dto';

/** Converte a entidade de domínio no DTO da UI (fonte única — evita duplicação, Princípio III). */
export function toSnapshotDto(snapshot: ServerSnapshot, stale = false): ServerSnapshotDto {
  return {
    totalOnline: snapshot.totalOnline,
    worlds: snapshot.worlds.map((w) => ({
      name: w.name,
      pvpTypeLabel: w.pvpTypeLabel,
      worldType: w.worldType,
      locked: w.locked,
      status: w.status,
      playersOnline: w.playersOnline,
      createdAt: w.createdAt ? w.createdAt.toISOString() : null,
    })),
    fetchedAt: snapshot.fetchedAt.toISOString(),
    source: snapshot.source,
    stale,
  };
}
