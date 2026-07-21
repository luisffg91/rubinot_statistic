# Research — Home Dashboard (MVP)

Fase 0 do plano. Resolve as incógnitas do Technical Context. Formato por decisão: **Decisão / Rationale /
Alternativas consideradas**.

## R1. Estratégia de busca de dados e auto-refresh

- **Decisão**: A home é um Server Component que busca o snapshot inicial (mundos + total online) no servidor. O auto-refresh do total online é feito por *polling* no cliente (a cada ~30s) contra um Route Handler interno (`/api/server-snapshot`) que faz proxy do `GET /api/worlds` do Rubinot.
- **Rationale**: mantém o client do Rubinot no servidor (Princípio II + FR-011 rastreabilidade), evita CORS, e centraliza tratamento de erro/staleness. Sem rate limit (Q4), polling curto é seguro. SSR inicial atende SC-001 (< 5s).
- **Alternativas**: (a) fetch direto do browser ao Rubinot — rejeitado (CORS, expõe origem, sem controle de erro); (b) WebSocket/SSE — rejeitado (YAGNI; a fonte é REST e não há push); (c) ISR/revalidate agressivo — insuficiente para "atualiza sozinho" percebido pelo usuário.

## R2. Persistência e cache

- **Decisão**: sem banco de dados e sem cache persistente no MVP. O snapshot é volátil; o "último valor conhecido" para o indicador de staleness (FR-010) vive no estado do cliente durante a sessão. `fetch` com `cache: 'no-store'` para dados sempre frescos.
- **Rationale**: Princípio VI (YAGNI). Não há requisito de histórico no MVP (histórico é evolução futura).
- **Alternativas**: cache em memória no servidor com TTL — adiado; só entra se surgir custo/latência real.

## R3. Cálculo do total de jogadores online

- **Decisão**: regra de domínio pura `computeTotalOnline(worlds)` = soma de `playersOnline` de todos os mundos. Vive em `src/domain/services`, testada com Vitest usando fixture `docs/worlds-response.json` (esperado: 14167).
- **Rationale**: Princípio III (regra centralizada) e IV (testável sem rede).
- **Alternativas**: somar na UI — rejeitado (lógica de negócio fora do domínio, não testável isoladamente).

## R4. Status de mundo (online/offline) — gap de dados

- **Decisão**: o `/api/worlds` **não** traz um flag explícito de offline; traz `locked` (mundo travado para novos personagens, ≠ offline). Para o MVP: todo mundo presente no feed é considerado **online**; `locked` é exibido como um selo/estado separado. A derivação fica em `deriveWorldStatus(world)` no domínio, isolando a regra caso a fonte passe a indicar offline/manutenção.
- **Rationale**: modela a realidade da fonte sem inventar dado; concentra a regra num único ponto para evolução barata.
- **Alternativas**: tratar `locked` como offline — **rejeitado** (semântica incorreta; enganaria o jogador).
- **Follow-up**: confirmar com a fonte se existe representação de mundo offline/manutenção (registrar em data-sources.md).

## R5. Busca de personagem — endpoint e status online

- **Decisão**: modelar `CharacterRepository` (port) no domínio e implementá-lo em `RubinotCharacterClient`. O mapper extrai apenas os **dados principais** do JSON (`player.name`, `player.level`, `player.vocation`, `player.world`, `player.guild`). 404 da fonte → resultado "não encontrado" (não é erro técnico).
- **Rationale**: isola a US2 atrás de uma interface (Princípio II), permitindo implementar/testar US1 sem depender do endpoint exato de personagem.
- **NEEDS CLARIFICATION (não bloqueia US1)**:
  - **C1** — caminho/método exatos do endpoint de personagem (data-sources.md D5 sugere `/character/{nome}`; confirmar).
  - **C2** — campo de **status online/offline** do personagem: ausente no exemplo (`docs/character-details.json` é de personagem oculto, `isHidden:true`). O `/api/worlds` dá só contagem, não nomes online, então o status não é derivável das fontes atuais. Confirmar se o endpoint retorna status para personagens não-ocultos ou se haverá uma lista de online por mundo.
- **Estratégia enquanto pendente**: `RubinotCharacterClient` fica atrás de um *feature flag*/implementação `NotConfiguredCharacterRepository` que responde "indisponível" (exercitando FR-009), permitindo a US1 seguir. O `status` no modelo de domínio é **opcional** até C2 ser resolvido.

## R6. Degradação graciosa e staleness (FR-009, FR-010, FR-011)

- **Decisão**: cada bloco da home (vitais e busca) trata falha de forma independente. Em falha de refresh, o cliente mantém o último valor e exibe selo "atualizado há X / possivelmente desatualizado". Cada dado carrega metadado de origem (`source: 'rubinot:/api/worlds'`) e `fetchedAt` para transparência (FR-011).
- **Rationale**: transforma a incerteza das fontes em comportamento testável; risco central de qualidade do produto.
- **Alternativas**: erro global de página — rejeitado (viola FR-009).

## R7. Ferramentas de teste

- **Decisão**: **Vitest** para unitário (domínio + mappers), rodando sobre as fixtures `docs/worlds-response.json` e `docs/character-details.json`. **Playwright** para E2E, com `page.route()` interceptando `/api/worlds` e o endpoint de personagem para cenários determinísticos (incluindo indisponibilidade e "não encontrado").
- **Rationale**: alinhado ao Princípio IV (domínio sem rede) e ao stack do time (Playwright). E2E determinístico evita dependência do servidor real do Rubinot.
- **Alternativas**: Jest — equivalente, mas Vitest integra melhor com o ecossistema Vite/TS e é mais rápido.

## Incógnitas remanescentes (para o usuário)

| ID | Pergunta | Bloqueia? | Onde rastrear |
|----|----------|-----------|---------------|
| C1 | Caminho/método exatos do endpoint de personagem | US2 apenas | docs/data-sources.md (D5) |
| C2 | Campo de status online/offline do personagem (e/ou lista de online por mundo) | US2 apenas (status) | docs/data-sources.md (D5) |
| C3 | A fonte representa mundo offline/manutenção? | Não (assunção: presente=online) | docs/data-sources.md (D2) |
