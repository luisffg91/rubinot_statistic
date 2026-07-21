/**
 * Sparkline SVG minimalista (sem dependência). Linha de tendência acessível em dark.
 * Usada em Power Gamers (evolução recente). Puro/apresentação.
 */
export function Sparkline({
  points,
  width = 120,
  height = 32,
}: {
  points: number[];
  width?: number;
  height?: number;
}) {
  if (points.length < 2) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = (i * step).toFixed(1);
      const y = (height - ((p - min) / range) * height).toFixed(1);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
  return (
    <svg
      className="sparkline"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="tendência recente"
    >
      <path d={d} fill="none" stroke="var(--color-accent)" strokeWidth="2" />
    </svg>
  );
}
