import { describe, it, expect } from 'vitest';
import { validateContactMessage } from '@/domain/services/validate-contact-message';

const base = { name: 'Luis', email: 'luis@example.com', message: 'Mensagem com conteúdo suficiente.' };

describe('validateContactMessage (RG-7)', () => {
  it('aceita mensagem válida', () => {
    expect(validateContactMessage(base).valid).toBe(true);
  });

  it('rejeita nome vazio', () => {
    const v = validateContactMessage({ ...base, name: ' ' });
    expect(v.valid).toBe(false);
    expect(v.errors.name).toBeTruthy();
  });

  it('rejeita e-mail inválido', () => {
    const v = validateContactMessage({ ...base, email: 'invalido' });
    expect(v.valid).toBe(false);
    expect(v.errors.email).toBeTruthy();
  });

  it('rejeita mensagem curta', () => {
    const v = validateContactMessage({ ...base, message: 'curta' });
    expect(v.valid).toBe(false);
    expect(v.errors.message).toBeTruthy();
  });
});
