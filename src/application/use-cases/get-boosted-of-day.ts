import type { BossRepository, BoostedResult } from '@/domain/ports/boss-repository';

/** Caso de uso: obtém o boosted do dia. */
export class GetBoostedOfDay {
  constructor(private readonly repo: BossRepository) {}

  execute(): Promise<BoostedResult> {
    return this.repo.fetchBoosted();
  }
}
