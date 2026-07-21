import type { CharacterDto } from '@/app/_lib/character-dto';

const nf = new Intl.NumberFormat('pt-BR');

/** Grade de dados do personagem (aba Personagem). Componente burro. */
export function CharacterCard({ character }: { character: CharacterDto }) {
  const p = character.profile;
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

      {p && (
        <>
          <div>
            <dt>Sexo</dt>
            <dd>{p.sex || '—'}</dd>
          </div>
          <div>
            <dt>Residência</dt>
            <dd>{p.residence || '—'}</dd>
          </div>
          <div>
            <dt>Nacionalidade</dt>
            <dd>{p.nationality ?? '—'}</dd>
          </div>
          <div>
            <dt>Último login</dt>
            <dd>{p.lastLogin || '—'}</dd>
          </div>
          <div>
            <dt>Pontos de Achievements</dt>
            <dd>{nf.format(p.achievementPoints)}</dd>
          </div>
          <div>
            <dt>Status da conta</dt>
            <dd>{p.accountStatus || '—'}</dd>
          </div>
          <div>
            <dt>Títulos</dt>
            <dd>{nf.format(p.titles)}</dd>
          </div>
          <div>
            <dt>Tibian age</dt>
            <dd>{p.tibianAge || '—'}</dd>
          </div>
          <div>
            <dt>Conta criada em</dt>
            <dd>{p.accountCreated || '—'}</dd>
          </div>
        </>
      )}
    </dl>
  );
}
