/**
 * Regras do Server Save (SS) do Rubinot.
 *
 * O SS acontece às 10h no horário de Brasília. O Brasil não adota horário de verão
 * desde 2019, então Brasília é UTC-3 o ano todo → 10h BRT = 13:00 UTC. Ancorar em UTC
 * mantém a função pura e independente do fuso de quem executa (servidor ou navegador).
 */
export const SERVER_SAVE_HOUR_UTC = 13; // 10:00 America/Sao_Paulo (UTC-3)

export interface Countdown {
  totalMs: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Próximo instante de Server Save (>= now). */
export function nextServerSave(now: Date): Date {
  const target = new Date(now.getTime());
  target.setUTCHours(SERVER_SAVE_HOUR_UTC, 0, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setUTCDate(target.getUTCDate() + 1);
  }
  return target;
}

/** Tempo restante até o próximo Server Save, decomposto para exibição. */
export function timeUntilServerSave(now: Date): Countdown {
  const totalMs = Math.max(0, nextServerSave(now).getTime() - now.getTime());
  const totalSeconds = Math.floor(totalMs / 1000);
  return {
    totalMs,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
