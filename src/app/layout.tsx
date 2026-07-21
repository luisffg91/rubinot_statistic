import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Cinzel, Inter } from 'next/font/google';
import Link from 'next/link';
import { Logo } from './components/logo';
import './globals.css';

// Fontes auto-hospedadas pelo Next (sem request externo em runtime — seguro p/ CSP e performance).
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Rubinot Statistics', template: '%s · Rubinot Statistics' },
  description: 'Dados e estatísticas do servidor Rubinot — de forma didática.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${inter.variable}`}>
      <body>
        <header className="site-header">
          <div className="site-header__inner">
            <Link href="/" className="site-header__brand" aria-label="Rubinot Statistics — início">
              <Logo />
            </Link>
            <nav className="site-nav" aria-label="Navegação principal">
              <Link href="/">Início</Link>
              <Link href="/ranking">Ranking</Link>
              <Link href="/power-gamers">Power Gamers</Link>
              <Link href="/contato">Contato</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <div className="site-footer__cols">
              <div className="site-footer__col site-footer__col--brand">
                <Logo />
                <p className="site-footer__about">
                  Estatísticas do servidor Rubinot, de forma didática. Fansite não-oficial, feito por
                  fãs — sem vínculo com a equipe do Rubinot.
                </p>
              </div>
              <nav className="site-footer__col" aria-label="Navegação">
                <h3>Navegação</h3>
                <ul>
                  <li>
                    <Link href="/">Início</Link>
                  </li>
                  <li>
                    <Link href="/contato">Contato</Link>
                  </li>
                </ul>
              </nav>
              <nav className="site-footer__col" aria-label="Rubinot">
                <h3>Rubinot</h3>
                <ul>
                  <li>
                    <a href="https://rubinot.com.br" target="_blank" rel="noopener noreferrer">
                      Site oficial
                    </a>
                  </li>
                  <li>
                    <a href="https://rubinot.com.br/news" target="_blank" rel="noopener noreferrer">
                      Notícias
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="site-footer__bar">
              <span>© {new Date().getFullYear()} Rubinot Statistics</span>
              <span>Feito com Next.js · dados via API do Rubinot</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
