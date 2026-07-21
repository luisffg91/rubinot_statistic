/**
 * RG-E2 — Ganho de experiência entre dois pontos de tempo: `after - before`.
 * Delta negativo (reset/rollback do servidor) NÃO é ganho → tratado como 0.
 */
export function computeExperienceGain(beforeXp: number, afterXp: number): number {
  return Math.max(0, afterXp - beforeXp);
}
