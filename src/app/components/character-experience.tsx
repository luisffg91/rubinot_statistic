import type { CharacterExperience } from '@/domain/entities/character';
import { Sparkline } from './charts/sparkline';
import { Bars } from './charts/bars';

const nf = new Intl.NumberFormat('pt-BR');
const signed = (n: number) => `${n >= 0 ? '+' : ''}${nf.format(n)}`;

/** Aba Experiência: resumo, gráficos e histórico diário de XP (docs/references/historico-xp.png). */
export function CharacterExperience({ experience }: { experience: CharacterExperience }) {
  const { bestDay, dailyAverage, totalGained, totalLevels, history, totalSeries } = experience;
  // Ganho diário do mais antigo ao mais recente, para as barras alinharem com a linha de total.
  const dailyGains = [...history].reverse().map((d) => d.xpChange);

  return (
    <div className="xp" data-testid="character-experience">
      <div className="xp__tiles">
        {bestDay && (
          <div className="xp-tile xp-tile--highlight">
            <span className="xp-tile__label">Melhor dia</span>
            <strong className="xp-tile__value">{signed(bestDay.xpChange)}</strong>
            <span className="xp-tile__meta">
              {bestDay.date} · Lvl {nf.format(bestDay.level)} · Rank #{bestDay.rank}
            </span>
          </div>
        )}
        <div className="xp-tile">
          <span className="xp-tile__label">Exp diário médio</span>
          <strong className="xp-tile__value">{nf.format(dailyAverage)}</strong>
          <span className="xp-tile__meta">por dia no período</span>
        </div>
        <div className="xp-tile">
          <span className="xp-tile__label">Total ganho</span>
          <strong className="xp-tile__value">{signed(totalGained)}</strong>
          <span className="xp-tile__meta">
            {signed(totalLevels)} {Math.abs(totalLevels) === 1 ? 'nível' : 'níveis'} no período
          </span>
        </div>
      </div>

      <div className="xp__charts">
        <figure className="xp-chart">
          <figcaption>Experiência ao longo do tempo</figcaption>
          <div className="xp-chart__line">
            <Sparkline points={totalSeries} width={640} height={120} />
          </div>
        </figure>
        <figure className="xp-chart">
          <figcaption>Ganho diário de XP</figcaption>
          <div className="xp-chart__bars">
            <Bars points={dailyGains} label="ganho diário de XP" height={120} />
          </div>
        </figure>
      </div>

      <div className="table-scroll">
        <table className="ranking-table xp-table" data-testid="xp-history">
          <thead>
            <tr>
              <th>Quando</th>
              <th>Mudança de exp</th>
              <th>Rank voc.</th>
              <th>Lvl</th>
              <th>Experiência</th>
              <th>Tempo online</th>
              <th>Exp méd./h</th>
            </tr>
          </thead>
          <tbody>
            {history.map((d) => (
              <tr key={d.date}>
                <td>{d.date}</td>
                <td className="xp-table__gain">{signed(d.xpChange)}</td>
                <td>{d.vocationRank ?? '—'}</td>
                <td>
                  {nf.format(d.level)}
                  {d.levelsGained > 0 && <span className="xp-table__lvlup"> (+{d.levelsGained})</span>}
                </td>
                <td className="num">{nf.format(d.totalExperience)}</td>
                <td>{d.onlineTime}</td>
                <td className="num">{nf.format(d.avgPerHour)}/h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
