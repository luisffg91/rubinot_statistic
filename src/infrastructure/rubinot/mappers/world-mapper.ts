import type { WorldData } from '@/domain/entities/world';

/** Formato bruto do item de mundo no /api/worlds (fonte externa, não versionada). */
export interface RawWorld {
  name?: unknown;
  pvpType?: unknown;
  pvpTypeLabel?: unknown;
  worldType?: unknown;
  locked?: unknown;
  creationDate?: unknown; // unix EM SEGUNDOS
  playersOnline?: unknown;
}

export interface RawWorldsResponse {
  worlds?: RawWorld[];
}

const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const bool = (v: unknown): boolean => v === true;
const nonNegInt = (v: unknown): number =>
  typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;

function toDate(unixSeconds: unknown): Date | null {
  if (typeof unixSeconds !== 'number' || !Number.isFinite(unixSeconds) || unixSeconds <= 0) {
    return null;
  }
  return new Date(unixSeconds * 1000);
}

/** Converte um item bruto em WorldData de domínio, tolerando tipos inconsistentes. */
export function mapWorld(raw: RawWorld): WorldData {
  return {
    name: str(raw.name),
    pvpType: str(raw.pvpType),
    pvpTypeLabel: str(raw.pvpTypeLabel),
    worldType: str(raw.worldType),
    locked: bool(raw.locked),
    createdAt: toDate(raw.creationDate),
    playersOnline: nonNegInt(raw.playersOnline),
  };
}

/** Converte o payload completo; payload inválido vira lista vazia (defensivo). */
export function mapWorlds(payload: RawWorldsResponse): WorldData[] {
  if (!payload || !Array.isArray(payload.worlds)) return [];
  return payload.worlds.map(mapWorld);
}
