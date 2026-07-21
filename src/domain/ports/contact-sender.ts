import type { ContactMessage } from '../entities/contact-message';
import type { Result } from '../shared/result';

/**
 * Port: envio da mensagem de contato. Implementado na infraestrutura.
 * Retorna `ok` quando enviada, ou `unavailable` (inclui "não configurado").
 */
export interface ContactSender {
  send(message: ContactMessage): Promise<Result<void>>;
}
