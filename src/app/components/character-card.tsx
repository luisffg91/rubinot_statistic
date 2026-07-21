import type { CharacterDto } from '@/app/_lib/character-dto';

/** Apresentação dos dados principais do personagem (componente burro). */
export function CharacterCard({ character }: { character: CharacterDto }) {
  return (
    <dl className="character-card" data-testid="character-card">
      <div>
        <dt>Nível</dt>
        <dd>{character.level.toLocaleString('pt-BR')}</dd>
      </div>
      <div>
        <dt>Vocação</dt>
        <dd>{character.vocation || '—'}</dd>
      </div>
      <div>
        <dt>Mundo</dt>
        <dd>{character.world || '—'}</dd>
      </div>
      <div>
        <dt>Guild</dt>
        <dd>{character.guild ?? 'sem guild'}</dd>
      </div>
      {character.status !== 'unknown' && (
        <div>
          <dt>Status</dt>
          <dd>{character.status === 'online' ? 'Online' : 'Offline'}</dd>
        </div>
      )}
    </dl>
  );
}
