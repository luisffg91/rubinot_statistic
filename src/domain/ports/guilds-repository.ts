import type { Guild } from '../entities/guild';
import type { DataOrigin } from '../shared/data-origin';

export interface GuildsResult {
  count: number;
  guilds: Guild[];
  origin: DataOrigin;
  fetchedAt: Date;
}

export interface GuildResult {
  guild: Guild | null; // null = não encontrada
  origin: DataOrigin;
  fetchedAt: Date;
}

/** Port: fonte de guilds (lista e detalhe). */
export interface GuildsRepository {
  fetchGuilds(): Promise<GuildsResult>;
  fetchGuild(name: string): Promise<GuildResult>;
}
