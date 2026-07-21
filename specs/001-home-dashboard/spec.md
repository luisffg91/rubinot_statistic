# Feature Specification: Home Dashboard — Rubibot Statistics (MVP)

**Feature Branch**: `001-home-dashboard`

**Created**: 2026-07-20

**Status**: Draft

**Input**: User description: "MVP do Rubibot Statistics — Página inicial (home) com total de jogadores online (auto-refresh), mundos online e busca por personagem. Referência: guildstats.eu / guild-stats-page.png. Fontes de dados do Rubinot rastreadas em docs/data-sources.md."

## Clarifications

### Session 2026-07-20

- Q: Qual a origem das News? → A: Endpoint oficial do Rubinot (agregação das publicações oficiais, não conteúdo editorial próprio). Decisão registrada para a Evolução 1.
- Q: Profundidade da busca de personagem no MVP? → A: Apenas os dados principais (nível, vocação, mundo, guild, status online/offline); perfil histórico completo fica para evolução futura.
- Q: News entra no MVP? → A: Não. Movida para a Evolução 1.
- Q: Guilds entra no MVP ou na Evolução 1? → A: Movida para a Evolução 1. O MVP contém apenas vitais do servidor (online + mundos) e busca de personagem.
- Q: Quais são as referências visuais do produto? → A: `rubinot-home-page.png` = home real do Rubinot (fonte da verdade dos dados/elementos do servidor: mostra "13658 Online" no topo e um bloco BOOSTED de boss/criatura do dia — este último é Evolução 1); `guild-stats-page.png` = inspiração de layout/UX (hero com busca + tiles de estatística + News).
- Q: O arquivo `character-details.png` serve de referência para a visão de personagem (US2)? → A: **Não** — o arquivo entregue é idêntico (mesmo SHA-256) ao `guild-stats-page.png` (home do GuildStats), não a uma página de detalhes de personagem. Re-checado em 2026-07-20: arquivo permanece inalterado. A referência visual da US2 fica **pendente** de um novo print correto.
- Q: Diretriz de identidade visual? → A: Manter **proximidade** com a linguagem visual e a paleta do Rubinot (os usuários já estão acostumados com aquele layout), porém **sem ser cópia idêntica** de cores/estilos — usar uma paleta própria, familiar mas diferenciada.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver o pulso do servidor de relance (Priority: P1)

Um jogador abre a página inicial do Rubibot Statistics e, em poucos segundos, entende o estado atual
do servidor: quantos jogadores estão online agora (no total e por mundo) e quais mundos estão online. O número
de jogadores online se atualiza sozinho, sem o jogador precisar recarregar a página.

**Why this priority**: É o núcleo do produto e prova a tese "bons dados ajudam o jogador". Sem esse painel de
vitais, o site não se diferencia de uma página estática. É a menor fatia que já entrega valor sozinha e é
totalmente construível com a fonte de dados já confirmada.

**Independent Test**: Abrir a home sem interagir com mais nada e verificar que o total de jogadores online e a
lista de mundos com seu status aparecem com dados coerentes, e que o contador de online se atualiza
automaticamente após o intervalo definido.

**Acceptance Scenarios**:

1. **DADO** que existem dados disponíveis do servidor, **QUANDO** o jogador abre a home, **ENTÃO** o total de jogadores online e a lista de mundos (com jogadores online por mundo e selo de `locked`) são exibidos.
2. **DADO** que a home está aberta e o número de jogadores online muda na fonte, **QUANDO** o intervalo de atualização automática é atingido, **ENTÃO** o contador de jogadores online reflete o novo valor sem recarregar a página.
3. **DADO** que a atualização automática ocorreu, **QUANDO** o jogador observa o painel, **ENTÃO** há indicação de quando os dados foram atualizados pela última vez (horário/"há X segundos").
4. **DADO** que a fonte de dados está temporariamente indisponível, **QUANDO** o jogador abre a home, **ENTÃO** o bloco afetado exibe um estado claro (mensagem/placeholder) sem quebrar o restante da página.

---

### User Story 2 - Buscar um personagem (Priority: P2)

Um jogador quer conferir os dados de um personagem específico. Na home, ele digita o nome no campo de busca
e é levado aos dados principais daquele personagem (nível, vocação, mundo, guild e status online/offline).

**Why this priority**: É a interação de maior utilidade recorrente (o coração do tipo de fansite que inspira o
produto). Depende do painel de vitais estar de pé, mas entrega valor próprio e é testável isoladamente.

**Independent Test**: Digitar o nome de um personagem existente e verificar que os dados principais são
apresentados; digitar um nome inexistente e verificar a mensagem de "não encontrado".

**Acceptance Scenarios**:

1. **DADO** que o jogador está na home, **QUANDO** ele digita um nome de personagem válido e confirma a busca, **ENTÃO** os dados principais do personagem são exibidos (nível, vocação, mundo, guild; status online/offline quando disponível na fonte).
2. **DADO** que o jogador busca um nome que não existe, **QUANDO** a busca é executada, **ENTÃO** uma mensagem clara de "personagem não encontrado" é exibida, sem erro técnico.
3. **DADO** que o jogador submete uma busca vazia ou inválida, **QUANDO** confirma, **ENTÃO** o sistema orienta o formato esperado e não executa uma busca sem critério.
4. **DADO** que a fonte de dados de personagem está indisponível, **QUANDO** o jogador busca, **ENTÃO** é exibida uma mensagem de indisponibilidade temporária, sem quebrar a página.

---

### Edge Cases

- **Fonte indisponível/instável**: cada bloco (online/mundos e busca de personagem) deve degradar de forma independente — a falha de um não derruba o outro nem a página.
- **Dado desatualizado (stale)**: se a atualização automática falhar, o painel deve manter o último valor conhecido e sinalizar que o dado pode estar desatualizado.
- **Zero jogadores online / mundo travado (locked) ou em manutenção**: exibir "0 online" ou o estado do mundo de forma explícita, sem parecer erro.
- **Personagem não encontrado / nome com caracteres especiais**: tratamento claro, sem exposição de erro técnico.
- **Volume grande de mundos**: apresentação deve permanecer legível (lista ordenada/resumida).
- **Rate limit / bloqueio da fonte**: se o auto-refresh for limitado pela origem, o sistema deve respeitar o limite e não degradar a experiência (ver Assumptions).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir, na página inicial, o total de jogadores online do servidor.
- **FR-002**: O sistema MUST atualizar automaticamente o total de jogadores online em intervalos regulares (default do MVP: 30 segundos), sem recarga manual da página.
- **FR-003**: O sistema MUST indicar ao usuário o momento da última atualização dos dados exibidos.
- **FR-004**: O sistema MUST exibir a lista de mundos (worlds) com a quantidade de jogadores online por mundo e o indicador de travado (`locked`). No MVP, mundo presente no feed é considerado **online**; um estado "offline/manutenção" só é exibido se a fonte passar a indicá-lo (ver C3 em research.md).
- **FR-005**: O sistema MUST oferecer, na home, um campo de busca por nome de personagem.
- **FR-006**: O sistema MUST apresentar os dados principais de um personagem encontrado: nível, vocação, mundo e guild. O status online/offline MUST ser exibido **quando disponível na fonte** (pendente — ver C2 em docs/data-sources.md; enquanto indisponível, o campo é omitido).
- **FR-007**: O sistema MUST exibir mensagem clara quando um personagem não for encontrado, sem expor erro técnico.
- **FR-008**: O sistema MUST validar a entrada de busca (rejeitar busca vazia/inválida) e orientar o formato esperado.
- **FR-009**: O sistema MUST degradar de forma graciosa e independente por bloco quando uma fonte de dados estiver indisponível (mensagem/placeholder claro), preservando os demais blocos e a página.
- **FR-010**: O sistema MUST sinalizar quando um dado exibido pode estar desatualizado (stale) por falha de atualização.
- **FR-011**: O sistema MUST rastrear a origem de cada dado exibido (dado oficial vs. derivado), conforme o princípio de transparência de dados.
- **FR-012**: A página inicial MUST seguir boas práticas atuais de web (responsividade e acessibilidade básicas) para leitura em desktop e mobile.

*Fora do escopo do MVP (evoluções futuras — não implementar nesta fase)*: guilds (Evolução 1), News (Evolução
1, fonte oficial já decidida), ranking/top de experiência (Evolução 1), bosses boostados (Evolução 1) e
hunt finder (Evolução 2).

### Key Entities *(include if feature involves data)*

- **Jogador Online (Online Count)**: contagem de jogadores conectados no momento; atributos: total (derivado da soma por mundo), distribuição por mundo, timestamp da medição.
- **Mundo (World)**: um servidor/mundo do Rubinot; atributos: nome, tipo de PvP, tipo de mundo, indicador de travado (locked), data de criação, quantidade de jogadores online. Status online/offline é derivado desses dados.
- **Personagem (Character)**: um personagem do jogo; atributos principais: nome, nível, vocação, mundo, guild, status online/offline.
- **Snapshot do Servidor (Server Snapshot)**: agregação dos vitais em um instante (total online + mundos) com timestamp — base para a exibição e a indicação de atualização/staleness.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Ao abrir a home, o jogador consegue identificar o estado do servidor (total online e mundos) em até 5 segundos, sem interagir com a página.
- **SC-002**: O total de jogadores online se atualiza automaticamente a cada 30 segundos (intervalo padrão do MVP), sem ação do usuário; a defasagem percebida entre o valor real e o exibido fica dentro desse intervalo.
- **SC-003**: 100% dos blocos da home indicam claramente quando estão indisponíveis ou com dados desatualizados, sem que a falha de um bloco derrube o outro.
- **SC-004**: Uma busca por personagem existente retorna os dados principais, e uma busca por personagem inexistente retorna mensagem clara — ambas sem erro técnico visível — em 100% das tentativas de teste.
- **SC-005**: A home permanece legível e utilizável em telas de desktop e mobile (largura mínima típica de smartphone).

## Assumptions

- **Escopo do MVP**: SOMENTE a página inicial com (a) vitais do servidor (total online + mundos) e (b) busca de personagem. Guilds, News, ranking, bosses e hunt finder estão fora do MVP.
- **Evolução 1 (próxima)**: guilds, News (fonte = endpoint oficial do Rubinot, já decidida), ranking/top de experiência e bosses boostados (o print `rubinot-home-page.png` confirma um bloco "BOOSTED" com boss + criatura do dia). **Evolução 2**: hunt finder.
- **Referências visuais**: `rubinot-home-page.png` (home real do Rubinot — dados do servidor) e `guild-stats-page.png` (layout/UX de inspiração). ⚠️ **Pendência**: a referência visual da visão de personagem (US2) não foi fornecida — `character-details.png` está incorreto (duplicata do GuildStats, confirmado por SHA-256 em 2026-07-20). Necessário novo print para detalhar a UI da US2.
- **Identidade visual**: aproximar-se da paleta/linguagem do Rubinot (familiaridade do usuário) sem ser cópia idêntica — paleta própria e diferenciada. O MVP deve definir um pequeno conjunto de tokens de cor/estilo próprios, inspirados (não copiados) no Rubinot.
- **Derivação do total online**: o total de jogadores online é calculado somando `playersOnline` de todos os mundos retornados pela fonte (regra de domínio centralizada).
- **Busca de personagem**: leva a uma visão com os dados principais do personagem (não a um perfil histórico completo, que fica para evolução futura).
- **Intervalo de auto-refresh**: **30 segundos** (default do MVP). Sem rate limit conhecido na fonte (data-sources.md Q4); ajustável caso a fonte passe a limitar.
- **Precisão dos dados**: a plataforma reflete os dados disponibilizados pelo Rubinot; divergências na origem se propagam para cá (dado "oficial" é o do Rubinot).

### Dependencies (dados externos)

As capacidades do MVP dependem das seguintes fontes do Rubinot, rastreadas em **`docs/data-sources.md`**:

- **D1** — Total de jogadores online (auto-refresh) → FR-001, FR-002 — **✅ Confirmado** (endpoint JSON `/api/worlds`).
- **D2** — Mundos e status → FR-004 — **✅ Confirmado** (mesmo endpoint `/api/worlds`; ver `docs/worlds-response.json`).
- **D5** — Dados de personagem (busca) → FR-005, FR-006 — **🟡 Parcial** (exemplo de response em `docs/character-details.json`; URL previsível e 404 estável confirmados. Falta o path exato — C1 — e o campo de status online — C2). Não bloqueia US1.

Fora do MVP (Evolução 1): **D3** (guilds) e **D4** (News) permanecem rastreados em `docs/data-sources.md`.

**Risco de qualidade**: online + mundos (D1/D2) vêm de uma API JSON confirmada — baixo risco. A busca de
personagem (D5) tem exemplo de contrato conhecido, mas falta confirmar o path exato (C1) e o campo de status
online (C2), o que mantém a US2 em risco parcial até a confirmação. Independentemente da fonte, o MVP exige degradação graciosa (FR-009),
indicação de staleness (FR-010) e rastreabilidade de origem (FR-011). A decisão técnica final é resolvida no
`/speckit-plan`, alimentada por `docs/data-sources.md`.
