import type { World } from './world';
import type { DataOrigin } from './../shared/data-origin';

/** Agregação dos vitais do servidor em um instante (base para exibição e staleness). */
export interface ServerSnapshot {
  worlds: World[];
  totalOnline: number;
  fetchedAt: Date;
  source: string;
  origin: DataOrigin;
}
