'use client';

import { useEffect, useState } from 'react';
import type { CharacterDto, CharacterSearchDto } from '@/app/_lib/character-dto';
import { CharacterCard } from './character-card';
import { CharacterHistories } from './character-histories';
import { CharacterExperience } from './character-experience';
import { DemoBadge } from './demo-badge';

type ViewState = 'loading' | 'found' | 'not-found' | 'invalid' | 'unavailable';
type Tab = 'perfil' | 'experiencia';

const nf = new Intl.NumberFormat('pt-BR');

/**
 * Busca o personagem no BFF (client-side) e renderiza a página de detalhes com abas
 * (Personagem / Experiência). Trata não-encontrado (FR-007), inválido (FR-008) e
 * indisponível (FR-009) sem quebrar a página, e sinaliza dados de exemplo (FR-011).
 */
export function CharacterView({ name }: { name: string }) {
  const [state, setState] = useState<ViewState>('loading');
  const [character, setCharacter] = useState<CharacterDto | null>(null);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<Tab>('perfil');

  useEffect(() => {
    let active = true;
    setState('loading');
    setTab('perfil');
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

  const c = state === 'found' ? character : null;
  const p = c?.profile;
  const hasExperience = Boolean(c?.experience);

  return (
    <div className="character">
      <div className="character__identity">
        <h1 className="character__name">
          {c?.name ?? name}
          {c && c.status !== 'unknown' && (
            <span className={`status-pill status-pill--${c.status}`}>
              {c.status === 'online' ? 'Online' : 'Offline'}
            </span>
          )}
          {c?.origin === 'exemplo' && <DemoBadge />}
        </h1>

        {c && (
          <div className="character__meta">
            <span>
              Level <strong>{nf.format(c.level)}</strong>
            </span>
            {p && p.levelProgress > 0 && (
              <span className="character__progress" title="progresso até o próximo nível">
                <span className="character__progress-bar">
                  <span style={{ width: `${Math.min(100, p.levelProgress)}%` }} />
                </span>
                {p.levelProgress.toFixed(1)}%
              </span>
            )}
            <span>
              {c.vocation || '—'} · {c.world || '—'}
            </span>
            <span>
              Guild <strong>{c.guild ?? 'sem guild'}</strong>
              {p?.guildSince ? ` · desde ${p.guildSince}` : ''}
            </span>
          </div>
        )}

        {p && (
          <ul className="character__vitals" aria-label="atributos">
            <li>
              <span>Vida</span>
              <strong>{nf.format(p.health)}</strong>
            </li>
            <li>
              <span>Mana</span>
              <strong>{nf.format(p.mana)}</strong>
            </li>
            <li>
              <span>Capacidade</span>
              <strong>{nf.format(p.capacity)}</strong>
            </li>
          </ul>
        )}
      </div>

      {state === 'loading' && <p role="status">Carregando…</p>}

      {state === 'not-found' && (
        <p role="status" data-testid="not-found">
          Personagem não encontrado.
        </p>
      )}

      {state === 'invalid' && (
        <p role="alert" data-testid="invalid">
          {message || 'Nome inválido.'}
        </p>
      )}

      {state === 'unavailable' && (
        <p role="status" data-testid="unavailable">
          Dados temporariamente indisponíveis. Tente novamente em instantes.
        </p>
      )}

      {c && (
        <>
          {hasExperience && (
            <div className="tabs" role="tablist" aria-label="Seções do personagem">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'perfil'}
                className={`tabs__tab ${tab === 'perfil' ? 'is-active' : ''}`}
                onClick={() => setTab('perfil')}
              >
                Personagem
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'experiencia'}
                className={`tabs__tab ${tab === 'experiencia' ? 'is-active' : ''}`}
                onClick={() => setTab('experiencia')}
              >
                Experiência
              </button>
            </div>
          )}

          {tab === 'perfil' && (
            <div role="tabpanel">
              <CharacterCard character={c} />
              {p && (
                <CharacterHistories
                  nameHistory={p.nameHistory}
                  worldHistory={p.worldHistory}
                />
              )}
            </div>
          )}

          {tab === 'experiencia' && c.experience && (
            <div role="tabpanel">
              <CharacterExperience experience={c.experience} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
