/**
 * Resultado de operações que podem "falhar" sem ser erro técnico exposto ao usuário.
 * Base para o tratamento de "não encontrado" (FR-007) e "indisponível" (FR-009).
 */
export type Result<T> =
  | { kind: 'ok'; value: T }
  | { kind: 'not-found' }
  | { kind: 'unavailable'; reason?: string };

export const ok = <T>(value: T): Result<T> => ({ kind: 'ok', value });
export const notFound = <T>(): Result<T> => ({ kind: 'not-found' });
export const unavailable = <T>(reason?: string): Result<T> => ({ kind: 'unavailable', reason });
