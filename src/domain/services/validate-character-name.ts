// Nomes de personagem do Tibia são compostos por letras e espaços simples entre palavras.
const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
const MAX_LEN = 29;

export interface NameValidation {
  valid: boolean;
  reason?: string;
}

/**
 * RG-6 — Validação da entrada de busca (FR-008). Regra de domínio pura: rejeita entradas
 * vazias/inválidas e orienta o formato, sem tocar na fonte externa.
 */
export function validateCharacterName(raw: string): NameValidation {
  const name = raw.trim();
  if (name.length === 0) return { valid: false, reason: 'Informe um nome de personagem.' };
  if (name.length > MAX_LEN) return { valid: false, reason: 'Nome muito longo.' };
  if (!NAME_RE.test(name)) return { valid: false, reason: 'Use apenas letras e espaços.' };
  return { valid: true };
}
