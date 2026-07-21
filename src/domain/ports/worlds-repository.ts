import type { World } from '../entities/world';

/**
 * Port: fonte de mundos que a aplicação conhece. O domínio define a interface;
 * a infraestrutura a implementa (Princípio II — dependências apontam para dentro).
 */
export interface WorldsRepository {
  /** Retorna os mundos do servidor. Rejeita em caso de indisponibilidade da fonte. */
  fetchWorlds(): Promise<{ worlds: World[]; source: string; fetchedAt: Date }>;
}
