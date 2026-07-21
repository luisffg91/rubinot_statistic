import type { NewsItemDto } from '@/app/_lib/news-dto';

/** Lista de publicações de News (título + data + link para a origem). */
export function NewsList({ items }: { items: NewsItemDto[] }) {
  if (items.length === 0) {
    return <p className="data-block__unavailable">Sem novidades no momento.</p>;
  }
  return (
    <ul className="news-list" data-testid="news-list">
      {items.map((item) => (
        <li key={item.title} className="data-block news-item">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
          <span className="news-item__date">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
        </li>
      ))}
    </ul>
  );
}
