// Dados de exemplo DETERMINÍSTICOS (sem aleatoriedade) para o modo demonstração.
// Nomes/guilds são FICTÍCIOS — não representam pessoas ou personagens reais.

export const DEMO_WORLDS = [
  'Auroria',
  'Belaria',
  'Bellum',
  'Divinian',
  'Elysian',
  'Etherian',
  'Grimoria I',
  'Grimoria II',
];

const FIRST = ['Mystic', 'Dark', 'Elder', 'Storm', 'Iron', 'Shadow', 'Golden', 'Frost', 'Blaze', 'Silent'];
const LAST = ['Slayer', 'Knight', 'Mage', 'Hunter', 'Warden', 'Reaper', 'Sage', 'Titan', 'Fury', 'Ghost'];

/** Nome de personagem fictício e estável a partir de um índice. */
export function demoCharacterName(i: number): string {
  return `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]} ${i + 1}`;
}

/** Nome de guild fictício e estável. */
export function demoGuildName(i: number): string {
  return `${LAST[i % LAST.length]}s of ${FIRST[(i * 2) % FIRST.length]}`;
}
