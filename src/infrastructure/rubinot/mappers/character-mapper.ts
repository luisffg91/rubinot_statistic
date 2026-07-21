import type { Character } from '@/domain/entities/character';

/** Subconjunto bruto do /api/characters/search usado no MVP (fonte externa, não versionada). */
export interface RawCharacterResponse {
  player?: {
    name?: unknown;
    level?: unknown;
    vocation?: unknown;
    world?: unknown;
    guild?: unknown; // null | string | { name?: string }
  };
}

const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const nonNegInt = (v: unknown): number =>
  typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;

function mapGuild(v: unknown): string | null {
  if (typeof v === 'string' && v.length > 0) return v;
  if (v && typeof v === 'object' && 'name' in v && typeof (v as { name: unknown }).name === 'string') {
    return (v as { name: string }).name;
  }
  return null;
}

/**
 * Converte o JSON externo em Character de domínio (só os campos principais).
 * Retorna null quando não há um personagem válido (ex.: payload sem `player.name`).
 * `status` fica 'unknown' até a fonte expor o online (C2).
 */
export function mapCharacter(payload: RawCharacterResponse): Character | null {
  const p = payload?.player;
  if (!p || typeof p.name !== 'string' || p.name.length === 0) return null;
  return {
    name: str(p.name),
    level: nonNegInt(p.level),
    vocation: str(p.vocation),
    world: str(p.world),
    guild: mapGuild(p.guild),
    status: 'unknown',
  };
}
