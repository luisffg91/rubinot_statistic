import { describe, it, expect } from 'vitest';
import { SubmitContact } from '@/application/use-cases/submit-contact';
import type { ContactSender } from '@/domain/ports/contact-sender';
import { ok, unavailable } from '@/domain/shared/result';

const valid = { name: 'Luis', email: 'luis@example.com', message: 'Mensagem com conteúdo suficiente.' };

describe('SubmitContact', () => {
  it('entrada inválida não aciona o sender', async () => {
    let called = false;
    const sender: ContactSender = {
      send: async () => {
        called = true;
        return ok(undefined);
      },
    };
    const outcome = await new SubmitContact(sender).execute({ ...valid, email: 'x' });
    expect(outcome.kind).toBe('invalid');
    expect(called).toBe(false);
  });

  it('envia e retorna ok', async () => {
    const outcome = await new SubmitContact({ send: async () => ok(undefined) }).execute(valid);
    expect(outcome.kind).toBe('ok');
  });

  it('propaga indisponível', async () => {
    const outcome = await new SubmitContact({ send: async () => unavailable() }).execute(valid);
    expect(outcome.kind).toBe('unavailable');
  });
});
