import { describe, it, expect } from 'vitest';
import { MockCharacterRepository } from '@/infrastructure/mock/mock-character-repository';

describe('MockCharacterRepository (demo)', () => {
  it('retorna o personagem de exemplo rotulado como exemplo, com perfil e experiência', async () => {
    const result = await new MockCharacterRepository().search('qualquer nome');
    expect(result.kind).toBe('ok');
    if (result.kind !== 'ok') return;
    const c = result.value;
    expect(c.origin).toBe('exemplo');
    expect(c.name).toBeTruthy();
    expect(c.profile).toBeTruthy();
    expect(c.experience).toBeTruthy();
  });

  it('histórico de XP é consistente (30 dias, ganhos ≥ 0, total crescente, melhor dia = maior ganho)', async () => {
    const result = await new MockCharacterRepository().search('Dejairzin');
    if (result.kind !== 'ok') throw new Error('esperava ok');
    const exp = result.value.experience;
    if (!exp) throw new Error('esperava experiência');

    expect(exp.history).toHaveLength(30);
    expect(exp.history.every((d) => d.xpChange >= 0)).toBe(true);

    // Série do mais antigo ao mais recente deve ser estritamente crescente (XP total só sobe).
    for (let i = 1; i < exp.totalSeries.length; i++) {
      expect(exp.totalSeries[i]).toBeGreaterThan(exp.totalSeries[i - 1]);
    }

    const maxGain = Math.max(...exp.history.map((d) => d.xpChange));
    expect(exp.bestDay?.xpChange).toBe(maxGain);
  });
});
