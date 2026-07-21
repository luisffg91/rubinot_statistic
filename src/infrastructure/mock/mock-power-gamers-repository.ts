import type {
  PowerGamersRepository,
  PowerGamersResult,
} from '@/domain/ports/power-gamers-repository';
import type { GainPeriod } from '@/domain/entities/experience-gain';
import { computeExperienceGain } from '@/domain/services/compute-experience-gain';
import { DEMO_WORLDS, demoCharacterName } from './demo-data';

const TOTAL = 120;

// Fator de magnitude por período (mês ganha mais que a semana, que ganha mais que o dia).
const PERIOD_FACTOR: Record<GainPeriod, number> = { day: 1, week: 6, month: 24 };

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Seed determinístico derivado da data (soma dos dígitos) → cada dia varia de forma estável. */
function daySeed(iso: string): number {
  return iso.split('').reduce((sum, ch) => sum + (ch >= '0' && ch <= '9' ? Number(ch) : 0), 0);
}

/** Adapter MOCK de power gamers — deltas de exemplo determinísticos (origin='exemplo'). */
export class MockPowerGamersRepository implements PowerGamersRepository {
  async fetchGains(period: GainPeriod, world?: string, day?: string): Promise<PowerGamersResult> {
    const factor = PERIOD_FACTOR[period];
    const resolvedDay = period === 'day' ? (day ?? todayIso()) : null;
    const seed = resolvedDay ? daySeed(resolvedDay) : 0;

    const all = Array.from({ length: TOTAL }, (_, i) => {
      // "antes" e "depois" sintéticos → o ganho passa pela regra de domínio (RG-E2).
      const before = 3_000_000_000 - i * 15_000_000;
      const after = before + (50_000_000 - i * 350_000 + seed * 400_000) * factor;
      const gained = computeExperienceGain(before, after);
      const spark = Array.from({ length: 7 }, (_, k) => Math.round((gained / 6) * k));
      return { name: demoCharacterName(i), world: DEMO_WORLDS[i % DEMO_WORLDS.length], gained, spark };
    });

    const entries = world ? all.filter((e) => e.world === world) : all;
    return {
      entries,
      worlds: DEMO_WORLDS,
      origin: 'exemplo',
      fetchedAt: new Date(),
      day: resolvedDay,
      collecting: false,
    };
  }
}
