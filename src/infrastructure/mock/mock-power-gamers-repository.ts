import type {
  PowerGamersRepository,
  PowerGamersResult,
} from '@/domain/ports/power-gamers-repository';
import { computeExperienceGain } from '@/domain/services/compute-experience-gain';
import { daysInRange } from '@/domain/services/date-range';
import { DEMO_WORLDS, demoCharacterName } from './demo-data';

const TOTAL = 120;

/** Seed determinístico derivado da data (soma dos dígitos) → cada intervalo varia de forma estável. */
function daySeed(iso: string): number {
  return iso.split('').reduce((sum, ch) => sum + (ch >= '0' && ch <= '9' ? Number(ch) : 0), 0);
}

/** Adapter MOCK de power gamers — ganho de exemplo proporcional ao tamanho do intervalo. */
export class MockPowerGamersRepository implements PowerGamersRepository {
  async fetchGains(from: string, to: string, world?: string): Promise<PowerGamersResult> {
    const days = daysInRange(from, to);
    const seed = daySeed(from) + daySeed(to);

    const all = Array.from({ length: TOTAL }, (_, i) => {
      // "antes" e "depois" sintéticos → o ganho passa pela regra de domínio (RG-E2).
      const before = 3_000_000_000 - i * 15_000_000;
      const after = before + (12_000_000 - i * 80_000 + seed * 120_000) * days;
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
      from,
      to,
      collecting: false,
    };
  }
}
