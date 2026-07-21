import { NextResponse } from 'next/server';
import { SubmitContact } from '@/application/use-cases/submit-contact';
import { Web3FormsSender } from '@/infrastructure/contact/web3forms-sender';

export const dynamic = 'force-dynamic';

const useCase = new SubmitContact(new Web3FormsSender());

/** POST /api/contact — recebe a mensagem, valida e envia (ver contracts/internal-bff.md). */
export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }
  const input = {
    name: String(body.name ?? ''),
    email: String(body.email ?? ''),
    message: String(body.message ?? ''),
  };

  const outcome = await useCase.execute(input);
  switch (outcome.kind) {
    case 'ok':
      return NextResponse.json({ ok: true });
    case 'invalid':
      return NextResponse.json({ error: 'invalid', errors: outcome.errors }, { status: 400 });
    case 'unavailable':
      return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
