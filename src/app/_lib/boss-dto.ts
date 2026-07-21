import type { BoostedResult } from '@/domain/ports/boss-repository';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface BoostedEntryDto {
  name: string;
  imageUrl: string | null;
}

export interface BoostedDto {
  boss: BoostedEntryDto;
  creature: BoostedEntryDto;
  date: string;
  origin: DataOrigin;
  fetchedAt: string;
}

export function toBoostedDto(r: BoostedResult): BoostedDto {
  return {
    boss: r.boosted.boss,
    creature: r.boosted.creature,
    date: r.boosted.date.toISOString(),
    origin: r.origin,
    fetchedAt: r.fetchedAt.toISOString(),
  };
}
