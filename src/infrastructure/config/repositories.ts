import type { RankingRepository } from '@/domain/ports/ranking-repository';
import type { PowerGamersRepository } from '@/domain/ports/power-gamers-repository';
import type { BossRepository } from '@/domain/ports/boss-repository';
import type { GuildsRepository } from '@/domain/ports/guilds-repository';
import type { NewsRepository } from '@/domain/ports/news-repository';
import { MockRankingRepository } from '@/infrastructure/mock/mock-ranking-repository';
import { MockPowerGamersRepository } from '@/infrastructure/mock/mock-power-gamers-repository';
import { MockBossRepository } from '@/infrastructure/mock/mock-boss-repository';
import { MockGuildsRepository } from '@/infrastructure/mock/mock-guilds-repository';
import { MockNewsRepository } from '@/infrastructure/mock/mock-news-repository';

/**
 * Fábricas de repositórios por capacidade. Onda 1: sempre o adapter MOCK (demo).
 * Onda 2: quando as env `RUBINOT_*` existirem, retornar o client real atrás do MESMO port
 * (troca local, sem tocar na UI — FR-015).
 */
export function getRankingRepository(): RankingRepository {
  // if (process.env.RUBINOT_RANKING_URL) return new RubinotRankingClient(); // Onda 2
  return new MockRankingRepository();
}

export function getPowerGamersRepository(): PowerGamersRepository {
  // Onda 2: derivado do histórico de snapshots (Postgres) do ranking real.
  return new MockPowerGamersRepository();
}

export function getBossRepository(): BossRepository {
  return new MockBossRepository();
}

export function getGuildsRepository(): GuildsRepository {
  return new MockGuildsRepository();
}

export function getNewsRepository(): NewsRepository {
  return new MockNewsRepository();
}
