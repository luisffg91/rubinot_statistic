import { describe, it, expect } from 'vitest';
import characterResponse from '../../fixtures/character-details.json';
import { mapCharacter } from '@/infrastructure/rubinot/mappers/character-mapper';

describe('character-mapper', () => {
  it('extrai os campos principais da fixture', () => {
    const c = mapCharacter(characterResponse);
    expect(c).not.toBeNull();
    expect(c?.name).toBe('Minlek Tanker');
    expect(c?.level).toBe(1000);
    expect(c?.vocation).toBe('Elite Knight');
    expect(c?.world).toBe('Lunarian');
    expect(c?.guild).toBeNull();
    expect(c?.status).toBe('unknown');
  });

  it('retorna null quando não há player válido', () => {
    expect(mapCharacter({} as never)).toBeNull();
    expect(mapCharacter({ player: {} } as never)).toBeNull();
  });

  it('extrai o nome da guild quando é objeto', () => {
    const c = mapCharacter({ player: { name: 'X', guild: { name: 'Nostalgia' } } } as never);
    expect(c?.guild).toBe('Nostalgia');
  });
});
