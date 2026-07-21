import type { NewsResult } from '@/domain/ports/news-repository';
import type { DataOrigin } from '@/domain/shared/data-origin';

export interface NewsItemDto {
  title: string;
  date: string;
  url: string;
}

export interface NewsDto {
  items: NewsItemDto[];
  origin: DataOrigin;
  fetchedAt: string;
}

export function toNewsDto(r: NewsResult): NewsDto {
  return {
    items: r.items.map((i) => ({ title: i.title, date: i.date.toISOString(), url: i.url })),
    origin: r.origin,
    fetchedAt: r.fetchedAt.toISOString(),
  };
}
