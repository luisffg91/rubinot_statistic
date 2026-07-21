import type { GuildsResult, GuildResult } from '@/domain/ports/guilds-repository';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface GuildDto {
  name: string;
  world: string;
  memberCount: number;
  members: string[] | null;
}

export interface GuildsListDto {
  count: number;
  guilds: GuildDto[];
  origin: DataOrigin;
  fetchedAt: string;
}

export interface GuildDetailDto {
  guild: GuildDto | null;
  origin: DataOrigin;
  fetchedAt: string;
}

export function toGuildsListDto(r: GuildsResult): GuildsListDto {
  return { count: r.count, guilds: r.guilds, origin: r.origin, fetchedAt: r.fetchedAt.toISOString() };
}

export function toGuildDetailDto(r: GuildResult): GuildDetailDto {
  return { guild: r.guild, origin: r.origin, fetchedAt: r.fetchedAt.toISOString() };
}
