import type { PowerGamerDto } from '@/app/_lib/power-gamers-dto';
import { Sparkline } from './charts/sparkline';

/** Tabela do ranking de power gamers (XP ganho no período) com sparkline da evolução. */
export function PowerGamersTable({ entries }: { entries: PowerGamerDto[] }) {
  if (entries.length === 0) {
    return <p className="data-block__unavailable">Sem dados para exibir.</p>;
  }
  return (
    <table className="ranking-table" data-testid="power-gamers-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Personagem</th>
          <th>Mundo</th>
          <th className="num">XP ganho</th>
          <th className="spark-col">Evolução</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={`${e.world}-${e.name}`}>
            <td className="ranking-table__rank">{e.rank}</td>
            <td>{e.name}</td>
            <td className="ranking-table__world">{e.world}</td>
            <td className="num gain-cell">+{e.gained.toLocaleString('pt-BR')}</td>
            <td className="spark-col">
              <Sparkline points={e.spark} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
