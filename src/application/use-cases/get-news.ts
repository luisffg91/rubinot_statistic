import type { NewsRepository, NewsResult } from '@/domain/ports/news-repository';

/** Caso de uso: obtém as News recentes. */
export class GetNews {
  constructor(private readonly repo: NewsRepository) {}

  execute(): Promise<NewsResult> {
    return this.repo.fetchNews();
  }
}
