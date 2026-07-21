import type { ServerSnapshot } from '@/domain/entities/server-snapshot';
import type { WorldsRepository } from '@/domain/ports/worlds-repository';
import { computeTotalOnline } from '@/domain/services/compute-total-online';
import { sortWorlds } from '@/domain/services/sort-worlds';

/**
 * Caso de uso: obtém o snapshot dos vitais do servidor (total online + mundos).
 * Compõe o repositório com as regras de domínio e anexa origem/timestamp (FR-011/003).
 */
export class GetServerSnapshot {
  constructor(private readonly worlds: WorldsRepository) {}

  async execute(): Promise<ServerSnapshot> {
    const { worlds, source, fetchedAt } = await this.worlds.fetchWorlds();
    return {
      worlds: sortWorlds(worlds),
      totalOnline: computeTotalOnline(worlds),
      fetchedAt,
      source,
    };
  }
}
