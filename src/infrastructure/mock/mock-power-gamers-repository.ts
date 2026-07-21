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

/** Adapter MOCK de power gamers — deltas de exemplo determinísticos (origin='exemplo'). */
export class MockPowerGamersRepository implements PowerGamersRepository {
  async fetchGains(period: GainPeriod, world?: string): Promise<PowerGamersResult> {
    const factor = PERIOD_FACTOR[period];
    const all = Array.from({ length: TOTAL }, (_, i) => {
      // "antes" e "depois" sintéticos → o ganho passa pela regra de domínio (RG-E2).
      const before = 3_000_000_000 - i * 15_000_000;
      const after = before + (50_000_000 - i * 350_000) * factor;
      const gained = computeExperienceGain(before, after);
      // Sparkline: 7 pontos crescentes proporcionais ao ganho.
      const spark = Array.from({ length: 7 }, (_, k) => Math.round((gained / 6) * k));
      return { name: demoCharacterName(i), world: DEMO_WORLDS[i % DEMO_WORLDS.length], gained, spark };
    });
    const entries = world ? all.filter((e) => e.world === world) : all;
    return { entries, worlds: DEMO_WORLDS, origin: 'exemplo', fetchedAt: new Date(), collecting: false };
  }
}
