import type { ContactMessage } from '../entities/contact-message';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 10;

export interface ContactValidation {
  valid: boolean;
  errors: Partial<Record<keyof ContactMessage, string>>;
}

/**
 * RG-7 — Validação da mensagem de contato (regra de domínio pura).
 * Rejeita nome vazio, e-mail inválido e mensagem curta demais, orientando a correção.
 */
export function validateContactMessage(input: ContactMessage): ContactValidation {
  const errors: Partial<Record<keyof ContactMessage, string>> = {};
  if (input.name.trim().length < 2) errors.name = 'Informe seu nome.';
  if (!EMAIL_RE.test(input.email.trim())) errors.email = 'Informe um e-mail válido.';
  if (input.message.trim().length < MIN_MESSAGE) {
    errors.message = `Escreva uma mensagem com pelo menos ${MIN_MESSAGE} caracteres.`;
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
