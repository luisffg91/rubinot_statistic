/**
 * Origem de um conjunto de dados exibido — base da rastreabilidade (FR-011) e da
 * distinção do modo demonstração da Evolução 1.
 * - 'oficial'  : veio de uma fonte oficial do Rubinot.
 * - 'derivado' : calculado por nós a partir de dados oficiais.
 * - 'exemplo'  : dado sintético de demonstração (NÃO é real).
 */
export type DataOrigin = 'oficial' | 'derivado' | 'exemplo';
