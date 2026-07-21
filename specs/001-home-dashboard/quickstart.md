# Quickstart — Home Dashboard (MVP)

Guia para rodar e **validar** a feature. Detalhes de contrato/entidades estão em `contracts/` e
`data-model.md`; a lista de tarefas virá em `tasks.md` (`/speckit-tasks`).

## Pré-requisitos

- Node.js 20+ e npm.
- Acesso de rede a `https://rubinot.com.br/api/worlds` (US1). Para US2, o endpoint de personagem (C1) ainda precisa ser confirmado.

## Setup

```bash
npm install
npm run dev            # sobe a home em http://localhost:3000
```

## Testes

```bash
npm run test:unit      # Vitest — regras de domínio e mappers (sem rede)
npm run test:e2e       # Playwright — home + busca (rede interceptada)
```

- Os testes unitários usam as fixtures `docs/worlds-response.json` e `docs/character-details.json`.
- Os E2E interceptam a rede (`page.route`) — não dependem do servidor real do Rubinot.

## Cenários de validação (mapeados aos Success Criteria)

### US1 — Vitais do servidor (P1)

1. **SC-001 / SC-002**: abrir `/`. Esperado: total de jogadores online e lista de mundos visíveis em < 5s; o contador de online se atualiza sozinho (~30s) sem recarregar.
2. **RG-1**: com a fixture de mundos, `computeTotalOnline` retorna **14167** (teste unitário).
3. **FR-003**: a home mostra "atualizado há X" / horário da última coleta.
4. **SC-003 / FR-009 / FR-010**: simular falha do `/api/worlds` (E2E: responder 503) — o bloco de vitais mostra estado de indisponibilidade/último valor com selo de "desatualizado", e a página não quebra.

### US2 — Busca de personagem (P2)

5. **FR-005 / FR-006**: buscar um personagem existente — exibe nome, nível, vocação, mundo, guild (status omitido enquanto C2 pendente).
6. **FR-007 / RG-5**: buscar nome inexistente (fonte 404) — mensagem "personagem não encontrado", sem erro técnico.
7. **FR-008**: submeter busca vazia/inválida — orientação de formato, sem chamar a fonte.
8. **FR-009**: endpoint de personagem indisponível/não configurado (C1 pendente) — mensagem de indisponibilidade, sem quebrar a home.

## Definition of Done (MVP)

- [ ] US1 funcional e validada isoladamente (vitais + auto-refresh + degradação).
- [ ] US2 funcional (ou, se C1/C2 pendentes, exibindo indisponibilidade de forma graciosa e testada).
- [ ] Testes unitários do domínio passando (RG-1..RG-5).
- [ ] E2E cobrindo os cenários acima (incluindo falha de fonte).
- [ ] `README.md` e `CLAUDE.md` criados/atualizados (Princípio VII).

## Pendências que afetam a US2 (rastrear em docs/data-sources.md)

- **C1**: caminho/método exatos do endpoint de personagem.
- **C2**: fonte do status online/offline do personagem.
