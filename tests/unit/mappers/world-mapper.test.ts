import { describe, it, expect } from 'vitest';
import worldsResponse from '../../fixtures/worlds-response.json';
import { mapWorld, mapWorlds } from '@/infrastructure/rubinot/mappers/world-mapper';

describe('world-mapper', () => {
  it('mapeia todos os mundos da fixture', () => {
    expect(mapWorlds(worldsResponse)).toHaveLength(18);
  });

  it('converte creationDate (unix s) para Date', () => {
    const [first] = mapWorlds(worldsResponse);
    expect(first.createdAt).toBeInstanceOf(Date);
  });

  it('trata payload inválido como lista vazia', () => {
    expect(mapWorlds({} as never)).toEqual([]);
    expect(mapWorlds({ worlds: null } as never)).toEqual([]);
  });

  it('valores ausentes viram defaults seguros', () => {
    const w = mapWorld({});
    expect(w.playersOnline).toBe(0);
    expect(w.name).toBe('');
    expect(w.createdAt).toBeNull();
    expect(w.locked).toBe(false);
  });
});
