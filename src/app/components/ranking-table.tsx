import type { RankingEntryDto } from '@/app/_lib/ranking-dto';

/** Tabela do Top Experiência, com barra relativa de experiência (visualização — FR-014). */
export function RankingTable({ entries }: { entries: RankingEntryDto[] }) {
  if (entries.length === 0) {
    return <p className="data-block__unavailable">Sem dados para exibir.</p>;
  }
  const maxExp = entries[0]?.experience || 1;
  return (
    <table className="ranking-table" data-testid="ranking-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Personagem</th>
          <th>Mundo</th>
          <th>Nível</th>
          <th>Experiência</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={`${e.world}-${e.name}`}>
            <td className="ranking-table__rank">{e.rank}</td>
            <td>{e.name}</td>
            <td className="ranking-table__world">{e.world}</td>
            <td>{e.level.toLocaleString('pt-BR')}</td>
            <td>
              <span className="ranking-table__exp">{e.experience.toLocaleString('pt-BR')}</span>
              <span className="exp-bar" aria-hidden="true">
                <span style={{ width: `${Math.max(4, (e.experience / maxExp) * 100)}%` }} />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
