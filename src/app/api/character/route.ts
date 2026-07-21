import { NextResponse } from 'next/server';
import { SearchCharacter } from '@/application/use-cases/search-character';
import {
  RubinotCharacterClient,
  CHARACTER_SOURCE,
} from '@/infrastructure/rubinot/rubinot-character-client';
import { toCharacterDto } from '@/app/_lib/character-dto';

export const dynamic = 'force-dynamic';

const useCase = new SearchCharacter(new RubinotCharacterClient());

/** GET /api/character?name= — busca de personagem via BFF (ver contracts/internal-bff.md). */
export async function GET(request: Request) {
  const name = new URL(request.url).searchParams.get('name') ?? '';
  const outcome = await useCase.execute(name);

  switch (outcome.kind) {
    case 'ok':
      return NextResponse.json({
        found: true,
        character: toCharacterDto(outcome.character),
        source: CHARACTER_SOURCE,
        fetchedAt: new Date().toISOString(),
      });
    case 'not-found':
      return NextResponse.json({ found: false });
    case 'invalid':
      return NextResponse.json({ error: 'invalid_name', message: outcome.message }, { status: 400 });
    case 'unavailable':
      return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
