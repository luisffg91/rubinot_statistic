/** Um item boostado (boss ou criatura), com imagem quando disponível. */
export interface BoostedEntry {
  name: string;
  imageUrl: string | null;
}

/** Boss e criatura boostados do dia. */
export interface BoostedOfDay {
  boss: BoostedEntry;
  creature: BoostedEntry;
  date: Date;
}
