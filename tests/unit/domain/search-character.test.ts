import { describe, it, expect } from 'vitest';
import { SearchCharacter } from '@/application/use-cases/search-character';
import type { CharacterRepository } from '@/domain/ports/character-repository';
import type { Character } from '@/domain/entities/character';
import { ok, notFound, unavailable, type Result } from '@/domain/shared/result';

function repoReturning(result: Result<Character>): CharacterRepository {
  return { search: async () => result };
}

const sample: Character = {
  name: 'Minlek Tanker',
  level: 1000,
  vocation: 'Elite Knight',
  world: 'Lunarian',
  guild: null,
  status: 'unknown',
};

describe('SearchCharacter', () => {
  it('entrada inválida não toca na fonte (FR-008)', async () => {
    let called = false;
    const repo: CharacterRepository = {
      search: async () => {
        called = true;
        return notFound();
      },
    };
    const outcome = await new SearchCharacter(repo).execute('   ');
    expect(outcome.kind).toBe('invalid');
    expect(called).toBe(false);
  });

  it('retorna ok quando encontrado', async () => {
    const outcome = await new SearchCharacter(repoReturning(ok(sample))).execute('Minlek Tanker');
    expect(outcome).toEqual({ kind: 'ok', character: sample });
  });

  it('mapeia 404 → not-found (RG-5)', async () => {
    const outcome = await new SearchCharacter(repoReturning(notFound())).execute('NaoExiste');
    expect(outcome.kind).toBe('not-found');
  });

  it('propaga indisponível (FR-009)', async () => {
    const outcome = await new SearchCharacter(repoReturning(unavailable())).execute('Minlek Tanker');
    expect(outcome.kind).toBe('unavailable');
  });
});
