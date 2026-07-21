'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateCharacterName } from '@/domain/services/validate-character-name';

/** Campo de busca de personagem na home (FR-005/FR-008). Valida antes de navegar. */
export function CharacterSearch() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const check = validateCharacterName(name);
    if (!check.valid) {
      setError(check.reason ?? 'Nome inválido.');
      return;
    }
    setError('');
    router.push(`/character/${encodeURIComponent(name.trim())}`);
  }

  return (
    <form className="character-search" onSubmit={onSubmit} role="search">
      <input
        className="character-search__input"
        aria-label="Nome do personagem"
        placeholder="Buscar personagem…"
        value={name}
        onChange={(e) => setName(e.target.value)}
        data-testid="character-search-input"
      />
      <button className="character-search__button" type="submit">
        Buscar
      </button>
      {error && (
        <p className="character-search__error" role="alert" data-testid="search-error">
          {error}
        </p>
      )}
    </form>
  );
}
