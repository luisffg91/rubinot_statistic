/** DTOs da fronteira BFF↔UI (contrato interno — ver contracts/internal-bff.md). */

export interface WorldDto {
  name: string;
  pvpTypeLabel: string;
  worldType: string;
  locked: boolean;
  status: 'online' | 'offline';
  playersOnline: number;
  createdAt: string | null;
}

export interface ServerSnapshotDto {
  totalOnline: number;
  worlds: WorldDto[];
  fetchedAt: string;
  source: string;
  origin: 'oficial' | 'derivado' | 'exemplo';
  stale: boolean;
}
