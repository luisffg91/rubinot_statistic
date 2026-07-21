import { NextResponse } from 'next/server';
import { GetServerSnapshot } from '@/application/use-cases/get-server-snapshot';
import { WORLDS_SOURCE } from '@/infrastructure/rubinot/rubinot-worlds-client';
import { getWorldsRepository } from '@/infrastructure/config/repositories';
import { toSnapshotDto } from '@/app/_lib/to-snapshot-dto';

export const dynamic = 'force-dynamic'; // sempre fresco (FR-002)

/** GET /api/server-snapshot — snapshot dos vitais (fonte real ou dados de exemplo no demo). */
export async function GET() {
  try {
    const snapshot = await new GetServerSnapshot(getWorldsRepository()).execute();
    return NextResponse.json(toSnapshotDto(snapshot));
  } catch {
    // FR-009: degradação graciosa, sem vazar detalhe técnico.
    return NextResponse.json(
      { error: 'unavailable', source: WORLDS_SOURCE, fetchedAt: new Date().toISOString() },
      { status: 503 },
    );
  }
}
