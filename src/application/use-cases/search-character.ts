import type { Character } from '@/domain/entities/character';
import type { CharacterRepository } from '@/domain/ports/character-repository';
import { validateCharacterName } from '@/domain/services/validate-character-name';

/** Resultado da busca do ponto de vista da aplicação (inclui entrada inválida). */
export type SearchOutcome =
  | { kind: 'ok'; character: Character }
  | { kind: 'not-found' }
  | { kind: 'invalid'; message: string }
  | { kind: 'unavailable' };

/**
 * Caso de uso: busca de personagem por nome.
 * Valida a entrada (FR-008) antes de tocar na fonte; mapeia 404 → not-found (RG-5).
 */
export class SearchCharacter {
  constructor(private readonly repo: CharacterRepository) {}

  async execute(rawName: string): Promise<SearchOutcome> {
    const check = validateCharacterName(rawName);
    if (!check.valid) return { kind: 'invalid', message: check.reason ?? 'Entrada inválida.' };

    const result = await this.repo.search(rawName.trim());
    switch (result.kind) {
      case 'ok':
        return { kind: 'ok', character: result.value };
      case 'not-found':
        return { kind: 'not-found' };
      case 'unavailable':
        return { kind: 'unavailable' };
    }
  }
}
