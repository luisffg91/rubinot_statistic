export type CharacterStatus = 'online' | 'offline' | 'unknown';

/** Dados principais de um personagem (escopo do MVP). */
export interface Character {
  name: string;
  level: number;
  vocation: string;
  world: string;
  guild: string | null;
  /** 'unknown' enquanto a fonte não expõe o status online (ver C2 em docs/data-sources.md). */
  status: CharacterStatus;
}
