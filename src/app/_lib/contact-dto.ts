import type { ContactMessage } from '@/domain/entities/contact-message';

/** DTOs da fronteira BFF↔UI para o formulário de contato. */
export type ContactRequestDto = ContactMessage;

export type ContactResponseDto =
  | { ok: true }
  | { error: 'invalid'; errors: Partial<Record<keyof ContactMessage, string>> }
  | { error: 'unavailable' };
