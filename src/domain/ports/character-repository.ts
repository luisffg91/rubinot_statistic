import type { Character } from '../entities/character';
import type { Result } from '../shared/result';

/**
 * Port: fonte de dados de personagem. Implementada na infraestrutura.
 * Retorna `ok` (encontrado), `not-found` (404 estável) ou `unavailable` (falha da fonte).
 */
export interface CharacterRepository {
  search(name: string): Promise<Result<Character>>;
}
