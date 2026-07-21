import type { Character, CharacterExperienceDay } from '@/domain/entities/character';
import type { CharacterRepository } from '@/domain/ports/character-repository';
import { ok, type Result } from '@/domain/shared/result';

// Histórico de XP de exemplo (30 dias), recentes primeiro. Números fictícios, coerentes entre si
// (inspirados no padrão de exibição do GuildStats). Determinístico — sem aleatoriedade.
const XP_HISTORY: CharacterExperienceDay[] = [
  { date: '2026-07-20', xpChange: 257_783_307, vocationRank: 1, level: 3122, levelsGained: 0, totalExperience: 506_500_193_053, onlineTime: '8h 15min', avgPerHour: 31_246_461 },
  { date: '2026-07-19', xpChange: 268_411_599, vocationRank: 1, level: 3122, levelsGained: 1, totalExperience: 506_242_409_746, onlineTime: '7h 30min', avgPerHour: 35_788_213 },
  { date: '2026-07-18', xpChange: 434_523_328, vocationRank: 1, level: 3121, levelsGained: 0, totalExperience: 505_973_998_147, onlineTime: '5h 30min', avgPerHour: 79_004_241 },
  { date: '2026-07-17', xpChange: 242_390_204, vocationRank: 1, level: 3120, levelsGained: 0, totalExperience: 505_539_474_819, onlineTime: '6h 30min', avgPerHour: 37_290_801 },
  { date: '2026-07-16', xpChange: 290_955_118, vocationRank: 1, level: 3120, levelsGained: 1, totalExperience: 505_297_084_615, onlineTime: '5h 45min', avgPerHour: 50_600_890 },
  { date: '2026-07-15', xpChange: 235_235_895, vocationRank: 1, level: 3119, levelsGained: 0, totalExperience: 505_006_129_497, onlineTime: '6h 15min', avgPerHour: 37_637_743 },
  { date: '2026-07-14', xpChange: 239_355_030, vocationRank: 1, level: 3119, levelsGained: 1, totalExperience: 504_770_893_602, onlineTime: '6h 15min', avgPerHour: 38_296_805 },
  { date: '2026-07-13', xpChange: 247_083_917, vocationRank: 1, level: 3118, levelsGained: 0, totalExperience: 504_531_538_572, onlineTime: '8h 15min', avgPerHour: 29_949_566 },
  { date: '2026-07-12', xpChange: 264_556_120, vocationRank: 1, level: 3118, levelsGained: 1, totalExperience: 504_284_454_655, onlineTime: '5h 45min', avgPerHour: 46_009_760 },
  { date: '2026-07-11', xpChange: 263_972_346, vocationRank: 1, level: 3117, levelsGained: 1, totalExperience: 504_019_898_535, onlineTime: '7h', avgPerHour: 37_710_335 },
  { date: '2026-07-10', xpChange: 290_267_078, vocationRank: 1, level: 3116, levelsGained: 0, totalExperience: 503_755_926_189, onlineTime: '6h 30min', avgPerHour: 44_656_474 },
  { date: '2026-07-09', xpChange: 236_204_426, vocationRank: 1, level: 3116, levelsGained: 1, totalExperience: 503_465_659_111, onlineTime: '6h 30min', avgPerHour: 36_339_142 },
  { date: '2026-07-08', xpChange: 229_336_513, vocationRank: 1, level: 3115, levelsGained: 0, totalExperience: 503_229_454_685, onlineTime: '6h 15min', avgPerHour: 36_693_842 },
  { date: '2026-07-07', xpChange: 287_148_235, vocationRank: 1, level: 3115, levelsGained: 1, totalExperience: 503_000_118_172, onlineTime: '4h 30min', avgPerHour: 63_810_719 },
  { date: '2026-07-06', xpChange: 301_224_036, vocationRank: 1, level: 3114, levelsGained: 0, totalExperience: 502_712_969_937, onlineTime: '12h 45min', avgPerHour: 23_625_415 },
  { date: '2026-07-05', xpChange: 410_402_484, vocationRank: 1, level: 3114, levelsGained: 1, totalExperience: 502_411_745_901, onlineTime: '10h 45min', avgPerHour: 38_176_975 },
  { date: '2026-07-04', xpChange: 1_112_877_470, vocationRank: 1, level: 3113, levelsGained: 2, totalExperience: 502_001_343_417, onlineTime: '16h 30min', avgPerHour: 67_447_119 },
  { date: '2026-07-03', xpChange: 1_428_031_308, vocationRank: 1, level: 3111, levelsGained: 3, totalExperience: 500_888_465_947, onlineTime: '9h 15min', avgPerHour: 154_381_763 },
  { date: '2026-07-02', xpChange: 304_454_990, vocationRank: 1, level: 3108, levelsGained: 1, totalExperience: 499_460_434_639, onlineTime: '5h 30min', avgPerHour: 55_355_453 },
  { date: '2026-07-01', xpChange: 390_393_434, vocationRank: 1, level: 3107, levelsGained: 1, totalExperience: 499_155_979_649, onlineTime: '6h 15min', avgPerHour: 62_462_949 },
  { date: '2026-06-30', xpChange: 361_861_016, vocationRank: 1, level: 3106, levelsGained: 1, totalExperience: 498_765_586_215, onlineTime: '5h 45min', avgPerHour: 62_932_351 },
  { date: '2026-06-29', xpChange: 235_345_128, vocationRank: 1, level: 3105, levelsGained: 0, totalExperience: 498_403_725_199, onlineTime: '7h 30min', avgPerHour: 31_379_350 },
  { date: '2026-06-28', xpChange: 377_790_890, vocationRank: 1, level: 3105, levelsGained: 1, totalExperience: 498_168_380_071, onlineTime: '6h 15min', avgPerHour: 60_446_542 },
  { date: '2026-06-27', xpChange: 364_083_459, vocationRank: 1, level: 3104, levelsGained: 1, totalExperience: 497_790_589_181, onlineTime: '6h 15min', avgPerHour: 58_253_353 },
  { date: '2026-06-26', xpChange: 524_063_766, vocationRank: 1, level: 3103, levelsGained: 1, totalExperience: 497_426_505_722, onlineTime: '7h', avgPerHour: 74_866_252 },
  { date: '2026-06-25', xpChange: 405_891_810, vocationRank: 1, level: 3102, levelsGained: 1, totalExperience: 496_902_441_956, onlineTime: '4h 45min', avgPerHour: 85_450_907 },
  { date: '2026-06-24', xpChange: 225_191_237, vocationRank: 1, level: 3101, levelsGained: 0, totalExperience: 496_496_550_146, onlineTime: '6h 15min', avgPerHour: 36_030_598 },
  { date: '2026-06-23', xpChange: 266_094_486, vocationRank: 1, level: 3101, levelsGained: 1, totalExperience: 496_271_358_909, onlineTime: '6h 45min', avgPerHour: 39_421_405 },
  { date: '2026-06-22', xpChange: 262_005_074, vocationRank: 1, level: 3100, levelsGained: 0, totalExperience: 496_005_264_423, onlineTime: '7h', avgPerHour: 37_429_296 },
  { date: '2026-06-21', xpChange: 330_186_101, vocationRank: 1, level: 3100, levelsGained: 1, totalExperience: 495_743_259_349, onlineTime: '6h 45min', avgPerHour: 48_916_459 },
];

// Personagem FICTÍCIO de demonstração (não representa uma pessoa/personagem real).
// Baseado no padrão de exibição do GuildStats (docs/references/personagem-details.png).
const DEMO_CHARACTER: Character = {
  name: 'Dejairzin',
  level: 3122,
  vocation: 'Elder Druid',
  world: 'Ferobra',
  guild: 'United',
  status: 'online',
  origin: 'exemplo',
  profile: {
    levelProgress: 63.9,
    sex: 'Male',
    residence: 'Thais',
    nationality: null,
    lastLogin: '20-07-2026 02:14',
    accountStatus: 'Premium Account',
    achievementPoints: 449,
    titles: 34,
    tibianAge: '303 anos, 10 meses, 24 dias',
    accountCreated: '28-01-2014',
    guildSince: '22-05-2026',
    health: 15_755,
    mana: 93_510,
    capacity: 31_610,
    nameHistory: [
      { from: null, to: 'Dejairzin', changedAt: null, level: 3122 },
      { from: 'Dejair Invencivel', to: 'Dejairzin', changedAt: '12-04-2024', level: 2576 },
      { from: 'Dejair Arrogante', to: 'Dejair Invencivel', changedAt: '08-02-2023', level: 2189 },
      { from: 'Dejair Veoito', to: 'Dejair Arrogante', changedAt: '12-10-2021', level: 1811 },
    ],
    worldHistory: [
      { from: null, to: 'Ferobra', changedAt: null, level: 3122 },
      { from: 'Inabra', to: 'Ferobra', changedAt: '09-06-2026', level: 3092 },
      { from: 'Serdebra', to: 'Inabra', changedAt: '08-12-2023', level: 2477 },
      { from: 'Quintera', to: 'Serdebra', changedAt: '28-06-2023', level: 2323 },
    ],
  },
  experience: {
    bestDay: { date: '2026-07-03', xpChange: 1_428_031_308, level: 3111, rank: 1 },
    dailyAverage: 317_832_715,
    totalGained: 11_087_119_805,
    totalLevels: 22,
    history: XP_HISTORY,
    // XP total do mais antigo ao mais recente (para a linha "Experiência ao longo do tempo").
    totalSeries: [...XP_HISTORY].reverse().map((d) => d.totalExperience),
  },
};

/**
 * Adapter MOCK do port de personagem (modo demonstração). Rotula os dados como `origin: 'exemplo'`.
 * Retorna sempre o personagem fictício de exemplo para qualquer nome válido, para que a página de
 * detalhes fique completa e apresentável antes do allowlist (na Onda 2, o client real resolve o
 * personagem realmente buscado atrás do MESMO port).
 */
export class MockCharacterRepository implements CharacterRepository {
  // O mock ignora o nome buscado por design (sempre devolve o personagem de exemplo).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async search(_name: string): Promise<Result<Character>> {
    return ok(DEMO_CHARACTER);
  }
}
