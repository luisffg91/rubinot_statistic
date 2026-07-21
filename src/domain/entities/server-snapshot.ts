import type { World } from './world';

/** Agregação dos vitais do servidor em um instante (base para exibição e staleness). */
export interface ServerSnapshot {
  worlds: World[];
  totalOnline: number;
  fetchedAt: Date;
  source: string;
}
