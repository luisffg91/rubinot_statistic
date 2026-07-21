'use client';

import { useEffect, useState } from 'react';
import type { CharacterDto, CharacterSearchDto } from '@/app/_lib/character-dto';
import { CharacterCard } from './character-card';

type ViewState = 'loading' | 'found' | 'not-found' | 'invalid' | 'unavailable';

/**
 * Busca o personagem no BFF (client-side) e renderiza o estado correspondente.
 * Trata não-encontrado (FR-007), inválido (FR-008) e indisponível (FR-009) sem quebrar a página.
 */
export function CharacterView({ name }: { name: string }) {
  const [state, setState] = useState<ViewState>('loading');
  const [character, setCharacter] = useState<CharacterDto | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`/api/character?name=${encodeURIComponent(name)}`, {
          cache: 'no-store',
        });
        const data = (await res.json()) as CharacterSearchDto;
        if (!active) return;
        if (res.status === 400 && 'error' in data && data.error === 'invalid_name') {
          setMessage(data.message);
          setState('invalid');
        } else if (res.status === 503) {
          setState('unavailable');
        } else if ('found' in data && data.found) {
          setCharacter(data.character);
          setState('found');
        } else {
          setState('not-found');
        }
      } catch {
        if (active) setState('unavailable');
      }
    })();
    return () => {
      active = false;
    };
  }, [name]);

  switch (state) {
    case 'loading':
      return <p role="status">Carregando…</p>;
    case 'found':
      return character ? <CharacterCard character={character} /> : null;
    case 'not-found':
      return (
        <p role="status" data-testid="not-found">
          Personagem não encontrado.
        </p>
      );
    case 'invalid':
      return (
        <p role="alert" data-testid="invalid">
          {message || 'Nome inválido.'}
        </p>
      );
    case 'unavailable':
      return (
        <p role="status" data-testid="unavailable">
          Dados temporariamente indisponíveis. Tente novamente em instantes.
        </p>
      );
  }
}
