/**
 * Envelope de rastreabilidade dos dados exibidos (FR-011 / FR-010).
 * Todo dado carrega DE ONDE veio e QUANDO foi coletado, e se é um valor possivelmente
 * desatualizado (stale). Mantém a transparência de origem exigida pela constituição.
 */
export interface DataEnvelope<T> {
  data: T;
  source: string; // ex.: 'rubinot:/api/worlds'
  fetchedAt: Date;
  stale: boolean;
}

export function envelope<T>(
  data: T,
  source: string,
  fetchedAt: Date,
  stale = false,
): DataEnvelope<T> {
  return { data, source, fetchedAt, stale };
}
