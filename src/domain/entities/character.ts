import type { DataOrigin } from '../shared/data-origin';

export type CharacterStatus = 'online' | 'offline' | 'unknown';

/** Transição no histórico de nick/mundo (de → para, na data e nível informados). */
export interface CharacterTransition {
  /** Origem da transição; `null` na entrada atual. */
  from: string | null;
  to: string;
  /** Data da mudança (`DD-MM-YYYY`); `null` = atual. */
  changedAt: string | null;
  level: number;
}

/** Um dia no histórico de experiência (uma linha da tabela). */
export interface CharacterExperienceDay {
  date: string; // 'YYYY-MM-DD'
  xpChange: number; // XP ganho no dia
  vocationRank: number | null;
  level: number;
  levelsGained: number; // quantos níveis subiu no dia (0 = nenhum)
  totalExperience: number;
  onlineTime: string; // ex.: '8h 15min'
  avgPerHour: number; // XP média por hora
}

/** Histórico de experiência do personagem (aba Experiência). */
export interface CharacterExperience {
  bestDay: { date: string; xpChange: number; level: number; rank: number } | null;
  dailyAverage: number;
  totalGained: number;
  totalLevels: number;
  /** Dias recentes primeiro (como exibido na tabela). */
  history: CharacterExperienceDay[];
  /** XP total ao longo do tempo (antigo → recente) para o gráfico de linha. */
  totalSeries: number[];
}

/** Perfil estendido do personagem (preenchido em fontes ricas / modo demonstração). */
export interface CharacterProfile {
  levelProgress: number; // % até o próximo nível (0-100)
  sex: string;
  residence: string;
  nationality: string | null;
  lastLogin: string;
  accountStatus: string;
  achievementPoints: number;
  titles: number;
  tibianAge: string;
  accountCreated: string;
  guildSince: string | null;
  health: number;
  mana: number;
  capacity: number;
  nameHistory: CharacterTransition[];
  worldHistory: CharacterTransition[];
}

/** Dados de um personagem. Núcleo obrigatório + blocos ricos opcionais. */
export interface Character {
  name: string;
  level: number;
  vocation: string;
  world: string;
  guild: string | null;
  /** 'unknown' enquanto a fonte não expõe o status online (ver C2 em docs/data-sources.md). */
  status: CharacterStatus;
  /** Origem do dado (para rastreabilidade/selo — FR-011). Ausente = tratado como oficial. */
  origin?: DataOrigin;
  profile?: CharacterProfile;
  experience?: CharacterExperience;
}
