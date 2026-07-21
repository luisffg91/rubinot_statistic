import { describe, it, expect } from 'vitest';
import { MockGuildsRepository } from '@/infrastructure/mock/mock-guilds-repository';

describe('MockGuildsRepository (demo)', () => {
  it('lista guilds rotuladas como exemplo', async () => {
    const r = await new MockGuildsRepository().fetchGuilds();
    expect(r.origin).toBe('exemplo');
    expect(r.count).toBeGreaterThan(0);
    expect(r.guilds.length).toBeGreaterThan(0);
  });

  it('detalhe de guild existente traz membros', async () => {
    const list = await new MockGuildsRepository().fetchGuilds();
    const name = list.guilds[0].name;
    const detail = await new MockGuildsRepository().fetchGuild(name);
    expect(detail.guild?.name).toBe(name);
    expect(detail.guild?.members?.length).toBeGreaterThan(0);
  });

  it('guild inexistente retorna null', async () => {
    const detail = await new MockGuildsRepository().fetchGuild('Inexistente XYZ');
    expect(detail.guild).toBeNull();
  });
});
