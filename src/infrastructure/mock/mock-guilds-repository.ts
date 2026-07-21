import type {
  GuildsRepository,
  GuildsResult,
  GuildResult,
} from '@/domain/ports/guilds-repository';
import { DEMO_WORLDS, demoGuildName, demoCharacterName } from './demo-data';

const TOTAL = 40;

function buildGuilds() {
  return Array.from({ length: TOTAL }, (_, i) => ({
    name: demoGuildName(i),
    world: DEMO_WORLDS[i % DEMO_WORLDS.length],
    memberCount: 150 - i * 3,
    members: null as string[] | null,
  }));
}

/** Adapter MOCK de guilds — dados fictícios determinísticos (origin='exemplo'). */
export class MockGuildsRepository implements GuildsRepository {
  async fetchGuilds(): Promise<GuildsResult> {
    return { count: 2999, guilds: buildGuilds(), origin: 'exemplo', fetchedAt: new Date() };
  }

  async fetchGuild(name: string): Promise<GuildResult> {
    const guild = buildGuilds().find((g) => g.name === name) ?? null;
    if (!guild) return { guild: null, origin: 'exemplo', fetchedAt: new Date() };
    const members = Array.from({ length: 12 }, (_, i) => demoCharacterName(i));
    return { guild: { ...guild, members }, origin: 'exemplo', fetchedAt: new Date() };
  }
}
