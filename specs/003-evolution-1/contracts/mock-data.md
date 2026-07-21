# Contrato — Dados de exemplo (modo demonstração)

Os adapters mock (`src/infrastructure/mock/`) geram dados **sintéticos e determinísticos** (sem aleatoriedade
que quebre testes), representativos do que o Rubinot fornecerá. Sempre com `origin = "exemplo"`.

## Princípios

- **Fictício e plausível**: nomes de personagens/guilds inventados (não dados reais de jogadores); valores de
  XP/level coerentes com um servidor de Tibia.
- **Rotulado**: todo conjunto vem com `origin: "exemplo"`; a UI exibe selo "dados de exemplo".
- **Determinístico**: geração estável (ex.: a partir de uma seed fixa/listas fixas) para E2E e snapshots de teste.
- **Cobertura**: top 100 no ranking; ganhos por período com sparkline; boss+criatura do dia; ~lista de guilds;
  ~itens de news com data.

## Shapes

Mesmos das entidades em `data-model.md` e dos DTOs em `internal-bff.md`. Para Power Gamers, o mock produz uma
série curta de pontos (`spark`) representando a evolução recente, apenas para a visualização.

## Troca para real (Onda 2)

Quando `RUBINOT_*` (endpoints/credenciais) estiverem configurados, o seletor em `infrastructure/config/`
passa a usar os clients reais. A UI e os DTOs não mudam (FR-015).
