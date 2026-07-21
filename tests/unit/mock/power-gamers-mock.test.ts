import { describe, it, expect } from 'vitest';
import { MockPowerGamersRepository } from '@/infrastructure/mock/mock-power-gamers-repository';

describe('MockPowerGamersRepository (demo)', () => {
  it('rotula origem como exemplo, ecoa o intervalo e traz ganhos ≥ 0', async () => {
    const r = await new MockPowerGamersRepository().fetchGains('2026-01-01', '2026-01-01');
    expect(r.origin).toBe('exemplo');
    expect(r.from).toBe('2026-01-01');
    expect(r.to).toBe('2026-01-01');
    expect(r.entries.length).toBeGreaterThanOrEqual(100);
    expect(r.entries.every((e) => e.gained >= 0)).toBe(true);
  });

  it('intervalo maior gera ganho maior', async () => {
    const day = await new MockPowerGamersRepository().fetchGains('2026-01-01', '2026-01-01');
    const month = await new MockPowerGamersRepository().fetchGains('2026-01-01', '2026-01-30');
    expect(month.entries[0].gained).toBeGreaterThan(day.entries[0].gained);
  });

  it('é determinístico e filtra por mundo', async () => {
    const a = await new MockPowerGamersRepository().fetchGains('2026-02-01', '2026-02-07');
    const b = await new MockPowerGamersRepository().fetchGains('2026-02-01', '2026-02-07');
    expect(a.entries).toEqual(b.entries);
    const auroria = await new MockPowerGamersRepository().fetchGains('2026-02-01', '2026-02-07', 'Auroria');
    expect(auroria.entries.every((e) => e.world === 'Auroria')).toBe(true);
  });
});
