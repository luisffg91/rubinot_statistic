import type { WorldsRepository } from '@/domain/ports/worlds-repository';
import { deriveWorldStatus } from '@/domain/services/derive-world-status';
import { getJson } from '../http/http-client';
import { mapWorlds, type RawWorldsResponse } from './mappers/world-mapper';

// URL sobrescrevível por env para permitir E2E determinístico (ver playwright.config.ts).
const WORLDS_URL = process.env.RUBINOT_WORLDS_URL ?? 'https://rubinot.com.br/api/worlds';
export const WORLDS_SOURCE = 'rubinot:/api/worlds';

// User-Agent identificável. A API do Rubinot fica atrás do Cloudflare e bloqueia fetch server-side
// anônimo; este UA dá à staff do Rubinot um alvo claro para allowlist (ver docs/data-sources.md).
// Sobrescrevível por env caso o Rubinot peça um valor específico.
const RUBINOT_USER_AGENT =
  process.env.RUBINOT_USER_AGENT ??
  'RubibotStatistics/1.0 (+https://rubinot-statistic.vercel.app)';

/** Implementação do port WorldsRepository consumindo a API pública do Rubinot. */
export class RubinotWorldsClient implements WorldsRepository {
  constructor(private readonly url: string = WORLDS_URL) {}

  async fetchWorlds() {
    const payload = await getJson<RawWorldsResponse>(this.url, {
      headers: { 'User-Agent': RUBINOT_USER_AGENT, Accept: 'application/json' },
    });
    const worlds = mapWorlds(payload).map(deriveWorldStatus);
    return { worlds, source: WORLDS_SOURCE, fetchedAt: new Date() };
  }
}
