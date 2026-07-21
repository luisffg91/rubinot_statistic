import type { GuildsRepository } from '@/domain/ports/guilds-repository';

/** Casos de uso de guilds: lista e detalhe. */
export class GetGuilds {
  constructor(private readonly repo: GuildsRepository) {}

  list() {
    return this.repo.fetchGuilds();
  }

  detail(name: string) {
    return this.repo.fetchGuild(name);
  }
}
