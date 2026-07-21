/** Selo que marca dados como sintéticos/demonstração (FR-011/FR-013). */
export function DemoBadge() {
  return (
    <span
      className="demo-badge"
      data-testid="demo-badge"
      title="Dados de exemplo — ainda não são dados reais do servidor"
    >
      dados de exemplo
    </span>
  );
}
