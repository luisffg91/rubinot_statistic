import { describe, it, expect } from 'vitest';
import { validateCharacterName } from '@/domain/services/validate-character-name';

describe('validateCharacterName (RG-6 / FR-008)', () => {
  it('aceita nome válido com espaço', () => {
    expect(validateCharacterName('Minlek Tanker').valid).toBe(true);
  });

  it('faz trim e aceita', () => {
    expect(validateCharacterName('  Bubble  ').valid).toBe(true);
  });

  it('rejeita vazio', () => {
    expect(validateCharacterName('   ').valid).toBe(false);
  });

  it('rejeita dígitos e símbolos', () => {
    expect(validateCharacterName('Player123').valid).toBe(false);
    expect(validateCharacterName('a@b').valid).toBe(false);
  });

  it('rejeita nome longo demais', () => {
    expect(validateCharacterName('a'.repeat(30)).valid).toBe(false);
  });
});
