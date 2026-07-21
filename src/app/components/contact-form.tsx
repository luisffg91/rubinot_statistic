'use client';

import { useState } from 'react';
import type { ContactMessage } from '@/domain/entities/contact-message';
import { validateContactMessage } from '@/domain/services/validate-contact-message';

type FieldErrors = Partial<Record<keyof ContactMessage, string>>;
type State = 'idle' | 'sending' | 'ok' | 'unavailable';

const EMPTY: ContactMessage = { name: '', email: '', message: '' };

// Web3Forms é um serviço form→e-mail feito para uso client-side; a access key é pública por design
// (o plano gratuito bloqueia envio server-side). Proteção anti-spam via allowlist de domínio/hCaptcha
// no painel do Web3Forms. Ver docs/environment.md.
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

/** Formulário de contato com a equipe. Valida no cliente (regra de domínio) e envia ao Web3Forms. */
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
    // Sem chave configurada → degrada como "indisponível" (não quebra a página).
    if (!ACCESS_KEY) {
      setState('unavailable');
      return;
    }
    setState('sending');
    try {
      // FormData (multipart) é "simple request" → sem preflight CORS. Enviar JSON dispararia um
      // OPTIONS que o Web3Forms não responde com Access-Control-Allow-Origin (a chamada é bloqueada).
      const payload = new FormData();
      payload.append('access_key', ACCESS_KEY);
      payload.append('subject', `Contato Rubinot Statistics — ${form.name}`);
      payload.append('from_name', form.name);
      payload.append('email', form.email);
      payload.append('message', form.message);
      const res = await fetch(WEB3FORMS_URL, { method: 'POST', body: payload });
      const data = (await res.json().catch(() => ({ success: false }))) as { success?: boolean };
      if (res.ok && data.success) {
        setState('ok');
        setForm(EMPTY);
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
