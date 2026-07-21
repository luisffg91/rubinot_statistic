import type { TopExperience } from '@/application/use-cases/get-top-experience';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface RankingEntryDto {
  rank: number;
  name: string;
  level: number;
  experience: number;
  world: string;
}

export interface RankingDto {
  entries: RankingEntryDto[];
  worlds: string[];
  world: string | null;
  origin: DataOrigin;
  fetchedAt: string;
}

export function toRankingDto(top: TopExperience): RankingDto {
  return {
    entries: top.entries.map((e) => ({
      rank: e.rank,
      name: e.name,
      level: e.level,
      experience: e.experience,
      world: e.world,
    })),
    worlds: top.worlds,
    world: top.world,
    origin: top.origin,
    fetchedAt: top.fetchedAt.toISOString(),
  };
}
