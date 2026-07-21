import type { Character } from '@/domain/entities/character';
import type { CharacterRepository } from '@/domain/ports/character-repository';
import { ok, notFound, unavailable, type Result } from '@/domain/shared/result';
import { getJson, HttpError } from '../http/http-client';
import { RUBINOT_USER_AGENT } from './user-agent';
import { mapCharacter, type RawCharacterResponse } from './mappers/character-mapper';

// Endpoint confirmado: GET /api/characters/search?name={nome} (URL-encoded).
// Sobrescrevível por env para E2E determinístico.
const CHARACTER_SEARCH_URL =
  process.env.RUBINOT_CHARACTER_URL ?? 'https://rubinot.com.br/api/characters/search';
export const CHARACTER_SOURCE = 'rubinot:/api/characters/search';

/** Implementação do port CharacterRepository consumindo a API do Rubinot. */
export class RubinotCharacterClient implements CharacterRepository {
  constructor(private readonly baseUrl: string = CHARACTER_SEARCH_URL) {}

  async search(name: string): Promise<Result<Character>> {
    const url = `${this.baseUrl}?name=${encodeURIComponent(name)}`;
    try {
      const payload = await getJson<RawCharacterResponse>(url, {
        headers: { 'User-Agent': RUBINOT_USER_AGENT, Accept: 'application/json' },
      });
      const character = mapCharacter(payload);
      return character ? ok({ ...character, origin: 'oficial' as const }) : notFound();
    } catch (e) {
      // 404 = personagem inexistente (RG-5); demais falhas = indisponível (FR-009).
      if (e instanceof HttpError && e.status === 404) return notFound();
      return unavailable();
    }
  }
}
