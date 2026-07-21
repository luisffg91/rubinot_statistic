import type { Metadata } from 'next';
import { ContactForm } from '@/app/components/contact-form';

export const metadata: Metadata = { title: 'Contato' };

export default function ContatoPage() {
  return (
    <main className="container">
      <header className="hero">
        <h1>Fale com a equipe</h1>
        <p>Dúvidas, sugestões ou parcerias? Envie uma mensagem — respondemos por e-mail.</p>
      </header>
      <section className="data-block">
        <ContactForm />
      </section>
    </main>
  );
}
