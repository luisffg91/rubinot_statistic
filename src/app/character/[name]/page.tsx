import Link from 'next/link';
import { CharacterView } from '@/app/components/character-view';

export const dynamic = 'force-dynamic';

/** Página de detalhes do personagem. Os dados são buscados no cliente (via BFF). */
export default async function CharacterPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  return (
    <main className="container">
      <p className="breadcrumb">
        <Link href="/">← voltar</Link>
      </p>
      <CharacterView name={decoded} />
    </main>
  );
}
