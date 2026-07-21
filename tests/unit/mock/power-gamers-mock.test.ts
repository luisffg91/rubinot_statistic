import { describe, it, expect } from 'vitest';
import { MockPowerGamersRepository } from '@/infrastructure/mock/mock-power-gamers-repository';

describe('MockPowerGamersRepository (demo)', () => {
  it('rotula origem como exemplo e não está coletando', async () => {
    const r = await new MockPowerGamersRepository().fetchGains('day');
    expect(r.origin).toBe('exemplo');
    expect(r.collecting).toBe(false);
    expect(r.entries.length).toBeGreaterThanOrEqual(100);
    expect(r.entries.every((e) => e.gained >= 0)).toBe(true);
  });

  it('ganho do mês é maior que o do dia (mesmo personagem)', async () => {
    const day = await new MockPowerGamersRepository().fetchGains('day');
    const month = await new MockPowerGamersRepository().fetchGains('month');
    expect(month.entries[0].gained).toBeGreaterThan(day.entries[0].gained);
  });

  it('é determinístico e filtra por mundo', async () => {
    const a = await new MockPowerGamersRepository().fetchGains('week');
    const b = await new MockPowerGamersRepository().fetchGains('week');
    expect(a.entries).toEqual(b.entries);
    const auroria = await new MockPowerGamersRepository().fetchGains('week', 'Auroria');
    expect(auroria.entries.every((e) => e.world === 'Auroria')).toBe(true);
  });

  it('dia específico: mesmo dia é estável e dias diferentes variam', async () => {
    const d1a = await new MockPowerGamersRepository().fetchGains('day', undefined, '2026-01-01');
    const d1b = await new MockPowerGamersRepository().fetchGains('day', undefined, '2026-01-01');
    const d2 = await new MockPowerGamersRepository().fetchGains('day', undefined, '2026-02-15');
    expect(d1a.day).toBe('2026-01-01');
    expect(d1a.entries).toEqual(d1b.entries);
    expect(d1a.entries[0].gained).not.toBe(d2.entries[0].gained);
  });
});
