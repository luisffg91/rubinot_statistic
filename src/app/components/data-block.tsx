import type { ReactNode } from 'react';

interface DataBlockProps {
  title: string;
  source?: string; // FR-011
  updatedLabel?: string; // FR-003
  stale?: boolean; // FR-010
  unavailable?: boolean; // FR-009
  children?: ReactNode;
}

/**
 * Bloco genérico da home com estados de disponível / indisponível / desatualizado.
 * Concentra a apresentação da degradação graciosa e da rastreabilidade de origem.
 */
export function DataBlock({
  title,
  source,
  updatedLabel,
  stale,
  unavailable,
  children,
}: DataBlockProps) {
  return (
    <section className="data-block">
      <header className="data-block__header">
        <h2>{title}</h2>
        {stale && (
          <span className="badge badge--warn" role="status">
            possivelmente desatualizado
          </span>
        )}
      </header>

      {unavailable ? (
        <p className="data-block__unavailable" role="status">
          Dados temporariamente indisponíveis. Tentaremos novamente automaticamente.
        </p>
      ) : (
        children
      )}

      {(updatedLabel || source) && (
        <footer className="data-block__footer">
          <span>{updatedLabel}</span>
          {source && (
            <span className="data-block__source" title="Origem do dado">
              {source}
            </span>
          )}
        </footer>
      )}
    </section>
  );
}
