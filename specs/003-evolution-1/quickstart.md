# Quickstart — Evolução 1

## Rodar (modo demonstração)

```bash
npm run dev            # http://localhost:3000
```

Sem nenhuma variável de ambiente de dados, o app opera em **modo demonstração**: as páginas de ranking,
power gamers, bosses, guilds e news aparecem populadas com **dados de exemplo** (com selo "dados de exemplo").

## Testes

```bash
npm run test:unit      # regras: delta de ganho (RG-E2), ordenação (RG-E1), rotulagem de origem
npm run test:e2e       # páginas em modo demo populadas + degradação por bloco (rede interceptada)
```

## Cenários de validação

- **Top Experiência (US1/SC-001)**: abrir `/ranking`, ver top 100 ordenado por exp; alternar mundo muda a lista.
- **Power Gamers (US2/SC-002/003)**: abrir a aba/seletor de período (dia/semana/mês); ver o ranking de ganho e a sparkline; em histórico insuficiente (real), ver "coletando dados".
- **Bosses (US3/SC-005)**: ver boss + criatura do dia.
- **Guilds (US4)**: ver contagem/lista; abrir uma guild.
- **News (US5)**: ver publicações recentes; item leva à origem.
- **Modo demonstração (SC-007)**: todas as páginas populadas e rotuladas como "exemplo", sem "indisponível".
- **Compatibilidade**: home (US1 vitais) e busca de personagem (US2) do MVP seguem funcionando.

## Ativar dados reais (Onda 2 — pós-allowlist)

1. Confirmar os endpoints (E1/E2/D3/D4) em `docs/data-sources.md`.
2. Implementar os clients reais + mappers atrás dos ports e configurar as env `RUBINOT_*`.
3. Para Power Gamers real: provisionar o datastore (Postgres) e o coletor (Vercel Cron) para snapshots diários.

## Definition of Done (Onda 1 — demo)

- [ ] Páginas de ranking/power-gamers/bosses/guilds/news populadas com dados de exemplo rotulados + gráficos.
- [ ] Regras de domínio testadas (delta, ordenação, rotulagem).
- [ ] E2E das páginas em modo demo verdes; MVP intacto.
- [ ] README/CLAUDE.md atualizados.
