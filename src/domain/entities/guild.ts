/** Uma guild do servidor. */
export interface Guild {
  name: string;
  world: string;
  memberCount: number;
  members: string[] | null; // preenchido na visão de detalhe (quando disponível)
}
