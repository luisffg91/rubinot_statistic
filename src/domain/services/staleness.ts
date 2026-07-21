/** Intervalo padrão de auto-refresh do MVP: 30 segundos (SC-002 / FR-002). */
export const REFRESH_INTERVAL_MS = 30_000;

/**
 * RG-4 — Staleness. Um dado é "possivelmente desatualizado" quando o tempo desde a
 * última coleta bem-sucedida excede o intervalo de atualização esperado.
 */
export function isStale(fetchedAt: Date, now: Date, refreshIntervalMs: number): boolean {
  return now.getTime() - fetchedAt.getTime() > refreshIntervalMs;
}
