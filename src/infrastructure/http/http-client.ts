/** Erro HTTP tipado — não expõe detalhe técnico ao usuário final (tratado nas camadas acima). */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export interface GetJsonOptions {
  timeoutMs?: number;
  /** Cabeçalhos extras (ex.: User-Agent identificável para allowlist da fonte). */
  headers?: Record<string, string>;
}

/**
 * Helper HTTP resiliente: timeout via AbortController e sem cache (dados sempre frescos).
 * Usado pelos clients da infraestrutura; mantém o domínio livre de detalhes de rede.
 */
export async function getJson<T>(url: string, opts: GetJsonOptions = {}): Promise<T> {
  const { timeoutMs = 8_000, headers } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { cache: 'no-store', signal: controller.signal, headers });
    if (!res.ok) throw new HttpError(res.status, `HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}
