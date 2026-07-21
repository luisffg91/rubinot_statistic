/**
 * Gráfico de barras SVG minimalista (sem dependência). Responsivo via viewBox.
 * Destaca a barra de maior valor (ex.: melhor dia de XP). Puro/apresentação.
 */
export function Bars({
  points,
  label = 'ganho por dia',
  height = 96,
}: {
  points: number[];
  label?: string;
  height?: number;
}) {
  if (points.length === 0) return null;
  const max = Math.max(...points) || 1;
  const gap = 2;
  const barWidth = 10;
  const width = points.length * (barWidth + gap);
  const peak = points.indexOf(max);

  return (
    <svg
      className="bars"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      {points.map((p, i) => {
        const h = Math.max(1, (p / max) * height);
        return (
          <rect
            key={i}
            x={i * (barWidth + gap)}
            y={height - h}
            width={barWidth}
            height={h}
            rx="1.5"
            fill={i === peak ? 'var(--color-primary)' : 'var(--color-accent)'}
            opacity={i === peak ? 1 : 0.7}
          />
        );
      })}
    </svg>
  );
}
