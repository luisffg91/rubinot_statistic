import { describe, it, expect } from 'vitest';
import { sortRanking } from '@/domain/services/sort-ranking';
import type { RankingEntry } from '@/domain/entities/ranking-entry';

const e = (name: string, experience: number, world = 'Auroria'): RankingEntry => ({
  name,
  experience,
  level: 100,
  world,
});

describe('sortRanking (RG-E1)', () => {
  it('ordena por experiência desc e atribui rank', () => {
    const out = sortRanking([e('B', 100), e('A', 300), e('C', 200)]);
    expect(out.map((x) => x.name)).toEqual(['A', 'C', 'B']);
    expect(out.map((x) => x.rank)).toEqual([1, 2, 3]);
  });

  it('empate de experiência resolve por nome asc', () => {
    const out = sortRanking([e('Zed', 500), e('Ana', 500)]);
    expect(out.map((x) => x.name)).toEqual(['Ana', 'Zed']);
  });

  it('não muta a lista original', () => {
    const input = [e('B', 100), e('A', 300)];
    sortRanking(input);
    expect(input.map((x) => x.name)).toEqual(['B', 'A']);
  });
});
