import Link from 'next/link';
import { CharacterView } from '@/app/components/character-view';

export const dynamic = 'force-dynamic';

/** Página de detalhes do personagem. Os dados são buscados no cliente (via BFF). */
export default async function CharacterPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  return (
    <main className="container">
      <header className="hero">
        <p>
          <Link href="/">← voltar</Link>
        </p>
        <h1>{decoded}</h1>
      </header>
      <section className="data-block">
        <CharacterView name={decoded} />
      </section>
    </main>
  );
}
