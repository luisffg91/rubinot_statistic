import type { BossRepository, BoostedResult } from '@/domain/ports/boss-repository';
import { getJson } from '../http/http-client';

interface TibiaBoostable {
  boostable_bosses?: { boosted?: { name?: string; image_url?: string } };
}
interface TibiaCreatures {
  creatures?: { boosted?: { name?: string; image_url?: string } };
}

// API pública do TibiaData (Tibia global). Usada como IMAGEM DE EXEMPLO para ilustrar a seção
// de boosted enquanto a fonte do Rubinot (Onda 2) não está disponível. Sobrescrevível por env (E2E).
const BOSSES_URL = process.env.TIBIADATA_URL_BOSSES ?? 'https://api.tibiadata.com/v4/boostablebosses';
const CREATURES_URL = process.env.TIBIADATA_URL_CREATURES ?? 'https://api.tibiadata.com/v4/creatures';

/** Adapter do boosted usando o TibiaData; em falha, delega ao fallback (mock). */
export class TibiaBossRepository implements BossRepository {
  constructor(private readonly fallback: BossRepository) {}

  async fetchBoosted(): Promise<BoostedResult> {
    try {
      const [bosses, creatures] = await Promise.all([
        getJson<TibiaBoostable>(BOSSES_URL),
        getJson<TibiaCreatures>(CREATURES_URL),
      ]);
      const boss = bosses.boostable_bosses?.boosted;
      const creature = creatures.creatures?.boosted;
      if (!boss?.name || !creature?.name) throw new Error('formato inesperado do TibiaData');
      return {
        boosted: {
          boss: { name: boss.name, imageUrl: boss.image_url ?? null },
          creature: { name: creature.name, imageUrl: creature.image_url ?? null },
          date: new Date(),
        },
        // Dado ilustrativo (Tibia global) — não é o boosted real do Rubinot (Onda 2).
        origin: 'exemplo',
        fetchedAt: new Date(),
      };
    } catch {
      return this.fallback.fetchBoosted();
    }
  }
}
