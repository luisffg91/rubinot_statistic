/**
 * Logo do Rubinot Statistics — arte original (homenagem, não cópia).
 * Emblema: escudo (vibe medieval do Rubinot) com barras de gráfico ascendentes (estatísticas).
 * Wordmark: "RUBINOT / STATISTICS" na fonte display (Cinzel).
 */
export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <span className="logo">
      <svg
        className="logo__emblem"
        viewBox="0 0 48 48"
        role="img"
        aria-label="Rubinot Statistics"
      >
        <defs>
          <linearGradient id="rs-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2cd7d" />
            <stop offset="1" stopColor="#d9932f" />
          </linearGradient>
        </defs>
        <path
          d="M24 4 L40 9 L40 22 C40 32 33 40 24 43.5 C15 40 8 32 8 22 L8 9 Z"
          fill="#16203a"
          stroke="url(#rs-gold)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <g fill="url(#rs-gold)">
          <rect x="15" y="27" width="5.5" height="6" rx="1" />
          <rect x="21.75" y="22" width="5.5" height="11" rx="1" />
          <rect x="28.5" y="17" width="5.5" height="16" rx="1" />
        </g>
      </svg>
      {withWordmark && (
        <span className="logo__word">
          <span className="logo__name">RUBINOT</span>
          <span className="logo__sub">STATISTICS</span>
        </span>
      )}
    </span>
  );
}
