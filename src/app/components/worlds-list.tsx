import type { WorldDto } from '@/app/_lib/snapshot-dto';

/** Lista de mundos com status e selo de `locked` (FR-004). Componente de apresentação. */
export function WorldsList({ worlds }: { worlds: WorldDto[] }) {
  if (worlds.length === 0) {
    return <p className="data-block__unavailable">Nenhum mundo disponível no momento.</p>;
  }
  return (
    <ul className="worlds-list" data-testid="worlds-list">
      {worlds.map((w) => (
        <li key={w.name} className="worlds-list__item">
          <span className={`status-dot status-dot--${w.status}`} aria-label={w.status} />
          <span className="worlds-list__name">{w.name}</span>
          <span className="worlds-list__pvp">{w.pvpTypeLabel}</span>
          <span className="worlds-list__players">
            {w.locked && (
              <span className="badge badge--locked" title="Mundo travado para novos personagens">
                travado
              </span>
            )}{' '}
            {w.playersOnline.toLocaleString('pt-BR')}
          </span>
        </li>
      ))}
    </ul>
  );
}
