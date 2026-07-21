const DAY_MS = 86_400_000;

function parseIso(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, (m ?? 1) - 1, d ?? 1);
}

/**
 * Número de dias no intervalo [from, to] inclusivo (mínimo 1).
 * "Dia" é um intervalo de 1 dia (from === to). Se from > to ou inválido, retorna 1.
 */
export function daysInRange(from: string, to: string): number {
  const a = parseIso(from);
  const b = parseIso(to);
  if (Number.isNaN(a) || Number.isNaN(b)) return 1;
  const days = Math.floor((b - a) / DAY_MS) + 1;
  return days < 1 ? 1 : days;
}
