import type { NewsRepository, NewsResult } from '@/domain/ports/news-repository';

const EXAMPLES = [
  'Atualização de conteúdo chega aos mundos',
  'Evento de fim de semana com XP em dobro',
  'Novo mundo inaugurado',
  'Balanceamento de classes disponível',
  'Manutenção programada concluída',
];

/** Adapter MOCK de News — itens fictícios determinísticos (origin='exemplo'). */
export class MockNewsRepository implements NewsRepository {
  async fetchNews(): Promise<NewsResult> {
    const base = Date.UTC(2026, 6, 20); // data-base fixa (determinística)
    const items = EXAMPLES.map((title, i) => ({
      title,
      date: new Date(base - i * 86_400_000),
      url: 'https://rubinot.com.br/news',
    }));
    return { items, origin: 'exemplo', fetchedAt: new Date() };
  }
}
