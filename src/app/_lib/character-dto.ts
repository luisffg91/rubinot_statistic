import type { Character } from '@/domain/entities/character';

/** DTO da fronteira BFF↔UI para personagem (ver contracts/internal-bff.md). */
export interface CharacterDto {
  name: string;
  level: number;
  vocation: string;
  world: string;
  guild: string | null;
  status: 'online' | 'offline' | 'unknown';
}

export type CharacterSearchDto =
  | { found: true; character: CharacterDto; source: string; fetchedAt: string }
  | { found: false }
  | { error: 'invalid_name'; message: string }
  | { error: 'unavailable' };

export function toCharacterDto(c: Character): CharacterDto {
  return {
    name: c.name,
    level: c.level,
    vocation: c.vocation,
    world: c.world,
    guild: c.guild,
    status: c.status,
  };
}
