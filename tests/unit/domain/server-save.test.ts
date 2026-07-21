import { describe, it, expect } from 'vitest';
import {
  nextServerSave,
  timeUntilServerSave,
  SERVER_SAVE_HOUR_UTC,
} from '@/domain/services/server-save';

describe('server-save', () => {
  it('antes das 13:00 UTC no mesmo dia → SS ainda é hoje', () => {
    const now = new Date('2026-07-21T09:00:00.000Z'); // 06h Brasília
    const ss = nextServerSave(now);
    expect(ss.toISOString()).toBe('2026-07-21T13:00:00.000Z');
    expect(ss.getUTCHours()).toBe(SERVER_SAVE_HOUR_UTC);
  });

  it('depois das 13:00 UTC → SS vai para o dia seguinte', () => {
    const now = new Date('2026-07-21T15:30:00.000Z'); // 12h30 Brasília
    const ss = nextServerSave(now);
    expect(ss.toISOString()).toBe('2026-07-22T13:00:00.000Z');
  });

  it('exatamente às 13:00 UTC → conta para o próximo dia (não fica em zero preso)', () => {
    const now = new Date('2026-07-21T13:00:00.000Z');
    expect(nextServerSave(now).toISOString()).toBe('2026-07-22T13:00:00.000Z');
  });

  it('decompõe o tempo restante em h/m/s', () => {
    const now = new Date('2026-07-21T09:15:30.000Z'); // faltam 3h44min30s
    const c = timeUntilServerSave(now);
    expect(c).toEqual({
      totalMs: (3 * 3600 + 44 * 60 + 30) * 1000,
      hours: 3,
      minutes: 44,
      seconds: 30,
    });
  });

  it('vira o dia (23:59 UTC) sem quebrar', () => {
    const now = new Date('2026-07-21T23:59:00.000Z');
    const ss = nextServerSave(now);
    expect(ss.toISOString()).toBe('2026-07-22T13:00:00.000Z');
    expect(timeUntilServerSave(now).totalMs).toBeGreaterThan(0);
  });
});
