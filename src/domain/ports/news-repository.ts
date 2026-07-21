import type { NewsItem } from '../entities/news-item';
import type { DataOrigin } from '../shared/data-origin';

export interface NewsResult {
  items: NewsItem[];
  origin: DataOrigin;
  fetchedAt: Date;
}

/** Port: fonte das News. */
export interface NewsRepository {
  fetchNews(): Promise<NewsResult>;
}
