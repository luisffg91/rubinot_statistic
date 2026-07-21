import type { Metadata } from 'next';
import { ContactForm } from '@/app/components/contact-form';
import { Logo } from '@/app/components/logo';

export const metadata: Metadata = { title: 'Contato' };

export default function ContatoPage() {
  return (
    <main className="container">
      <header className="hero">
        <h1>Fale com a equipe</h1>
        <p>Dúvidas, sugestões ou parcerias? Envie uma mensagem — respondemos por e-mail.</p>
      </header>
      <section className="data-block contact-layout">
        <ContactForm />
        <aside className="contact-brand">
          <Logo />
          <p className="contact-brand__text">
            Estatísticas do Rubinot, de forma didática — um fansite feito por fãs.
          </p>
        </aside>
      </section>
    </main>
  );
}
