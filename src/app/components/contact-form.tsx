'use client';

import { useState } from 'react';
import type { ContactMessage } from '@/domain/entities/contact-message';
import { validateContactMessage } from '@/domain/services/validate-contact-message';
import type { ContactResponseDto } from '@/app/_lib/contact-dto';

type FieldErrors = Partial<Record<keyof ContactMessage, string>>;
type State = 'idle' | 'sending' | 'ok' | 'unavailable';

const EMPTY: ContactMessage = { name: '', email: '', message: '' };

/** Formulário de contato com a equipe. Valida no cliente (reuso da regra de domínio) e envia via BFF. */
export function ContactForm() {
  const [form, setForm] = useState<ContactMessage>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>('idle');

  function update(field: keyof ContactMessage, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateContactMessage(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState('ok');
        setForm(EMPTY);
      } else if (res.status === 400) {
        const data = (await res.json()) as Extract<ContactResponseDto, { error: 'invalid' }>;
        setErrors(data.errors ?? {});
        setState('idle');
      } else {
        setState('unavailable');
      }
    } catch {
      setState('unavailable');
    }
  }

  if (state === 'ok') {
    return (
      <p role="status" data-testid="contact-ok">
        Mensagem enviada! Obrigado — responderemos em breve.
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <label className="contact-form__field">
        <span>Nome</span>
        <input
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          data-testid="contact-name"
        />
        {errors.name && <em data-testid="err-name">{errors.name}</em>}
      </label>

      <label className="contact-form__field">
        <span>E-mail</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          data-testid="contact-email"
        />
        {errors.email && <em data-testid="err-email">{errors.email}</em>}
      </label>

      <label className="contact-form__field">
        <span>Mensagem</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          data-testid="contact-message"
        />
        {errors.message && <em data-testid="err-message">{errors.message}</em>}
      </label>

      {state === 'unavailable' && (
        <p role="status" data-testid="contact-unavailable" className="contact-form__error">
          Não foi possível enviar agora. Tente novamente em instantes.
        </p>
      )}

      <button type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
      </button>
    </form>
  );
}
