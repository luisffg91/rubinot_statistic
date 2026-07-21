import type { Metadata } from 'next';
import { GetNews } from '@/application/use-cases/get-news';
import { getNewsRepository } from '@/infrastructure/config/repositories';
import { toNewsDto } from '@/app/_lib/news-dto';
import { DemoBadge } from '@/app/components/demo-badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'News' };

export default async function NewsPage() {
  const data = toNewsDto(await new GetNews(getNewsRepository()).execute());
  return (
    <main className="container">
      <header className="hero">
        <h1>News</h1>
        <p>
          Novidades do servidor.
          {data.origin === 'exemplo' && (
            <>
              {' '}
              <DemoBadge />
            </>
          )}
        </p>
      </header>
      <ul className="news-list" data-testid="news-list">
        {data.items.map((item) => (
          <li key={item.title} className="data-block news-item">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            <span className="news-item__date">
              {new Date(item.date).toLocaleDateString('pt-BR')}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
