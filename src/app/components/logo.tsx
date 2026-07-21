/**
 * Logo do Rubinot Statistics — arte original que ecoa o estilo do Rubinot (não é cópia).
 * Emblema: escudo azul com espada dourada apontada para baixo (homenagem ao logo do Rubinot,
 * que traz um escudo azul + espada dourada). Wordmark "RUBINOT / STATISTICS" em fonte display.
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
        {/* Escudo (eco do azul do Rubinot) */}
        <path
          d="M24 4 L40 9 L40 22 C40 32.5 33 40.5 24 44 C15 40.5 8 32.5 8 22 L8 9 Z"
          fill="#16203a"
          stroke="#4aa3e0"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Espada dourada apontando para baixo */}
        <g fill="url(#rs-gold)" stroke="#1a1200" strokeWidth="0.6" strokeLinejoin="round">
          <circle cx="24" cy="12.6" r="2.2" />
          <rect x="22.9" y="14.2" width="2.2" height="2.6" />
          <rect x="18.4" y="16.6" width="11.2" height="2.4" rx="1.1" />
          <path d="M22.2 19.2 L25.8 19.2 L24.9 32 L24 35.6 L23.1 32 Z" />
        </g>
      </svg>
      {withWordmark && (
        <span className="logo__word">
          <span className="logo__kicker">RUBINOT</span>
          <span className="logo__name">STATISTICS</span>
        </span>
      )}
    </span>
  );
}
