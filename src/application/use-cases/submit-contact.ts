import type { ContactMessage } from '@/domain/entities/contact-message';
import type { ContactSender } from '@/domain/ports/contact-sender';
import { validateContactMessage } from '@/domain/services/validate-contact-message';

export type SubmitOutcome =
  | { kind: 'ok' }
  | { kind: 'invalid'; errors: Partial<Record<keyof ContactMessage, string>> }
  | { kind: 'unavailable' };

/**
 * Caso de uso: enviar mensagem de contato.
 * Valida a entrada (FR-008 análogo) antes de acionar o sender; normaliza (trim) o conteúdo.
 */
export class SubmitContact {
  constructor(private readonly sender: ContactSender) {}

  async execute(input: ContactMessage): Promise<SubmitOutcome> {
    const validation = validateContactMessage(input);
    if (!validation.valid) return { kind: 'invalid', errors: validation.errors };

    const message: ContactMessage = {
      name: input.name.trim(),
      email: input.email.trim(),
      message: input.message.trim(),
    };
    const result = await this.sender.send(message);
    return result.kind === 'ok' ? { kind: 'ok' } : { kind: 'unavailable' };
  }
}
