import type { CharacterTransition } from '@/domain/entities/character';

const nf = new Intl.NumberFormat('pt-BR');

function TransitionList({ items }: { items: CharacterTransition[] }) {
  return (
    <ol className="char-history__list">
      {items.map((t, i) => (
        <li key={i} className="char-history__item">
          <span className="char-history__label">
            {t.from ? (
              <>
                <span className="char-history__from">{t.from}</span>
                <span className="char-history__arrow" aria-hidden="true">
                  →
                </span>
                {t.to}
              </>
            ) : (
              <>
                {t.to} <span className="char-history__current">atual</span>
              </>
            )}
          </span>
          <span className="char-history__meta">
            {t.changedAt ?? '—'} · lvl {nf.format(t.level)}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Histórico de nicks e de mundos (blocos "Histórico de nicks/mundos" da referência). */
export function CharacterHistories({
  nameHistory,
  worldHistory,
}: {
  nameHistory: CharacterTransition[];
  worldHistory: CharacterTransition[];
}) {
  if (nameHistory.length === 0 && worldHistory.length === 0) return null;
  return (
    <div className="char-history">
      {nameHistory.length > 0 && (
        <section className="char-history__col">
          <h3 className="char-history__title">Histórico de nicks</h3>
          <TransitionList items={nameHistory} />
        </section>
      )}
      {worldHistory.length > 0 && (
        <section className="char-history__col">
          <h3 className="char-history__title">Histórico de mundos</h3>
          <TransitionList items={worldHistory} />
        </section>
      )}
    </div>
  );
}
