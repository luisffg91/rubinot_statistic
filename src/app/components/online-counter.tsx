interface OnlineCounterProps {
  total: number | null;
}

/** Apresentação do total de jogadores online (componente burro — sem lógica de negócio). */
export function OnlineCounter({ total }: OnlineCounterProps) {
  return (
    <div className="online-counter" data-testid="online-counter">
      <span className="online-counter__value">
        {total === null ? '—' : total.toLocaleString('pt-BR')}
      </span>
      <span className="online-counter__label">jogadores online</span>
    </div>
  );
}
