import type { ContactMessage } from '@/domain/entities/contact-message';
import type { ContactSender } from '@/domain/ports/contact-sender';
import { ok, unavailable, type Result } from '@/domain/shared/result';
import { postJson } from '../http/http-client';

// Envio via Web3Forms (form→e-mail, sem backend próprio de e-mail).
// A chave e o e-mail de destino são configurados no painel do Web3Forms; aqui só usamos a access key.
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/** Implementação do port ContactSender usando o Web3Forms. */
export class Web3FormsSender implements ContactSender {
  constructor(private readonly accessKey: string | undefined = process.env.WEB3FORMS_ACCESS_KEY) {}

  async send(message: ContactMessage): Promise<Result<void>> {
    // Sem chave configurada → degrada como "indisponível" (não quebra a página).
    if (!this.accessKey) return unavailable('WEB3FORMS_ACCESS_KEY não configurada');
    try {
      await postJson(WEB3FORMS_URL, {
        access_key: this.accessKey,
        subject: `Contato Rubinot Statistics — ${message.name}`,
        from_name: message.name,
        email: message.email,
        message: message.message,
      });
      return ok(undefined);
    } catch {
      return unavailable();
    }
  }
}
