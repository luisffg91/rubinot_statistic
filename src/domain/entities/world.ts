export type WorldStatus = 'online' | 'offline';

/** Dados de um mundo, ainda SEM o status derivado (o que a fonte fornece). */
export interface WorldData {
  name: string;
  pvpType: string;
  pvpTypeLabel: string;
  worldType: string;
  locked: boolean;
  createdAt: Date | null;
  playersOnline: number;
}

/** Mundo com o status de disponibilidade derivado (ver RG-2). */
export interface World extends WorldData {
  status: WorldStatus;
}
