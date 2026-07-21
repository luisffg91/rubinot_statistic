# Feature Specification: Evolução 1 — Rankings, Power Gamers, Bosses, Guilds e News

**Feature Branch**: `003-evolution-1`

**Created**: 2026-07-21

**Status**: Draft

**Input**: User description: "Evolução 1 — Top Experiência, Ranking de Power Gamers (ganho de XP por dia/semana/mês, exige histórico), bosses boostados do dia, guilds e News (fonte oficial). Mantém arquitetura em camadas e compatibilidade com o MVP; dados dependem de endpoints do Rubinot ainda não confirmados (mesmo bloqueio Cloudflare)."

## Clarifications

### Session 2026-07-21

- Q: Como a Evolução 1 é apresentada antes do allowlist dos endpoints? → A: **Modo demonstração** — todas as páginas renderizam a experiência completa (rankings, tiles e gráficos) com **dados de exemplo sintéticos, claramente rotulados**; ao liberar os endpoints reais, os mocks são substituídos atrás dos mesmos ports, sem reescrever a UI.
- Q: Padrão de apresentação de referência? → A: Inspirado nos padrões do GuildStats (tabelas de ranking, tiles de estatística, sparklines/gráficos), sem copiar arte/identidade.
- Q: Períodos do Power Gamers? → A: dia (24h), semana (7 dias), mês (30 dias).
- Q: Tamanho do ranking e cadência de coleta? → A: top 100; snapshots diários (cadência ajustável).
- Q: Escopo de Guilds no MVP da evolução? → A: contagem + lista + visão básica de uma guild (nome, mundo, membros conforme disponível).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Top Experiência (Priority: P1)

Um jogador quer saber quem são os personagens de maior nível/experiência do servidor. Ele acessa a página de
ranking e vê a lista de top experiência, podendo filtrar por mundo (ou ver o geral).

**Why this priority**: É a capacidade de maior apelo e a base de dados sobre a qual o ranking de power gamers
é construído. Entrega valor sozinha e é diretamente testável.

**Independent Test**: Abrir a página de ranking e verificar que os top personagens por experiência são
listados com posição, nome, nível/exp e mundo; alternar o filtro de mundo e ver a lista mudar.

**Acceptance Scenarios**:

1. **DADO** que há dados de ranking disponíveis, **QUANDO** o jogador abre a página de Top Experiência, **ENTÃO** vê uma lista ordenada por experiência (maior → menor) com posição, personagem, nível/exp e mundo.
2. **DADO** que o jogador escolhe um mundo específico, **QUANDO** aplica o filtro, **ENTÃO** a lista passa a refletir apenas aquele mundo.
3. **DADO** que a fonte de ranking está indisponível, **QUANDO** o jogador abre a página, **ENTÃO** um estado claro de indisponibilidade é exibido, sem quebrar a página.

---

### User Story 2 - Ranking de Power Gamers (Priority: P2)

Um jogador quer saber quem MAIS EVOLUIU num período — quem ganhou mais experiência hoje, na semana e no mês.
Ele acessa o ranking de power gamers e escolhe o período.

**Why this priority**: É um diferencial forte (ninguém no Rubinot oferece), mas depende de dado histórico
(snapshots ao longo do tempo) — logo, entra após a base de ranking existir e a persistência estar resolvida.

**Independent Test**: Com pelo menos dois snapshots de ranking em datas diferentes, verificar que o ganho de
XP por personagem no período é calculado e ordenado corretamente (maior ganho no topo).

**Acceptance Scenarios**:

1. **DADO** que existem snapshots de ranking em datas distintas, **QUANDO** o jogador seleciona o período "dia", **ENTÃO** vê os personagens ordenados pelo XP ganho nas últimas 24h (maior → menor).
2. **DADO** os períodos "semana" e "mês", **QUANDO** o jogador os seleciona, **ENTÃO** o ranking reflete o ganho acumulado no período correspondente.
3. **DADO** que ainda não há histórico suficiente para um período, **QUANDO** o jogador o seleciona, **ENTÃO** o sistema informa claramente que os dados ainda estão sendo coletados (sem erro).
4. **DADO** um personagem que subiu de posição no período, **QUANDO** o ranking é exibido, **ENTÃO** o ganho apresentado corresponde ao delta de experiência entre o início e o fim do período.

---

### User Story 3 - Bosses Boostados do Dia (Priority: P2)

Um jogador quer saber quais são o boss e a criatura boostados do dia para planejar sua caça.

**Why this priority**: Alto valor prático e diário, com esforço baixo (dado pontual). Independente das demais.

**Independent Test**: Abrir o bloco/página de boosted e verificar que o boss e a criatura do dia são exibidos
com nome e (se disponível) imagem/identificação.

**Acceptance Scenarios**:

1. **DADO** que há boosted definido para o dia, **QUANDO** o jogador acessa a home/página, **ENTÃO** vê o boss e a criatura boostados do dia.
2. **DADO** que a fonte está indisponível, **QUANDO** o jogador acessa, **ENTÃO** vê estado de indisponibilidade, sem quebrar a página.

---

### User Story 4 - Guilds (Priority: P3)

Um jogador quer explorar as guilds do servidor: quantas existem, quais são e detalhes de uma guild.

**Why this priority**: Complementa o perfil do servidor, mas tem menor urgência que rankings/bosses.

**Independent Test**: Abrir a página de guilds e ver a contagem/lista; abrir uma guild e ver seus dados
(nome, mundo, membros, se disponível).

**Acceptance Scenarios**:

1. **DADO** que há guilds no servidor, **QUANDO** o jogador abre a página de guilds, **ENTÃO** vê a contagem e/ou a lista de guilds.
2. **DADO** que o jogador seleciona uma guild, **QUANDO** abre seus detalhes, **ENTÃO** vê os dados principais da guild (nome, mundo e membros, conforme disponível).
3. **DADO** fonte indisponível, **QUANDO** o jogador acessa, **ENTÃO** vê estado de indisponibilidade, sem quebrar a página.

---

### User Story 5 - News (Priority: P3)

Um jogador quer acompanhar as novidades oficiais do Rubinot dentro da plataforma.

**Why this priority**: Agrega contexto/engajamento; a fonte (oficial) já foi decidida, mas tem menor prioridade
que dados de gameplay.

**Independent Test**: Abrir a área de News e verificar a listagem das publicações recentes (título e data),
com acesso ao conteúdo completo na origem oficial.

**Acceptance Scenarios**:

1. **DADO** que há novidades publicadas, **QUANDO** o jogador acessa a área de News, **ENTÃO** vê as publicações recentes com título e data.
2. **DADO** um item de News, **QUANDO** o jogador o seleciona, **ENTÃO** acessa o conteúdo completo na origem oficial do Rubinot.
3. **DADO** que não há novidades ou a fonte está indisponível, **QUANDO** o jogador acessa, **ENTÃO** vê estado vazio/indisponível informativo, sem quebrar a página.

---

### User Story 6 - Streamers & Criadores patrocinados (Priority: P3)

Um jogador quer descobrir os **streamers patrocinados pelo Rubinot que estão AO VIVO agora na Twitch** e os
**canais de YouTube patrocinados** pelo Rubinot. Ele vê uma seção com os streamers online em destaque (nome do
canal, título da live, link para assistir) e a lista de canais do YouTube patrocinados (nome e link).

**Why this priority**: Fortalece o ecossistema do servidor e o plano de divulgação (streamers/criadores) — um
argumento direto na proposta ao Rubinot. É engajamento/comunidade, então tem prioridade menor que os dados de
gameplay.

**Independent Test**: Abrir a seção de streamers/criadores e verificar que os streamers ao vivo aparecem em
destaque (com link para a Twitch) e que os canais de YouTube patrocinados são listados (com link).

**Acceptance Scenarios**:

1. **DADO** uma lista curada de streamers patrocinados, **QUANDO** o jogador abre a seção, **ENTÃO** os que estão **ao vivo** na Twitch aparecem em destaque (canal, título da live, link), e os offline ficam depois ou ocultos.
2. **DADO** a lista de canais de YouTube patrocinados, **QUANDO** o jogador abre a seção, **ENTÃO** os canais são exibidos com nome e link para o YouTube.
3. **DADO** que a Twitch/YouTube está indisponível, **QUANDO** o jogador acessa, **ENTÃO** a seção degrada de forma graciosa (lista sem status ao vivo ou estado informativo), sem quebrar a página.
4. **DADO** o modo demonstração, **QUANDO** o jogador abre a seção, **ENTÃO** vê streamers/canais **fictícios rotulados como exemplo** (nunca identidades reais sem consentimento).

---

### Edge Cases

- **Fonte indisponível/instável**: cada capacidade (ranking, power gamers, bosses, guilds, news) degrada de forma independente — a falha de uma não derruba as demais nem a página.
- **Histórico insuficiente (power gamers)**: se não houver snapshots suficientes para o período, informar "coletando dados" em vez de erro ou número enganoso.
- **Personagem novo no ranking**: sem snapshot anterior, o ganho no período é indeterminado → tratado como "sem base de comparação" (não zero enganoso).
- **Empates de XP / mudança de nome**: exibir de forma consistente; mudança de nome não deve duplicar o personagem no ranking de ganho (rastrear por identificador estável, se disponível).
- **Reset/rollback de XP na fonte** (evento de servidor): o cálculo de ganho não deve exibir valores negativos como "ganho"; tratar deltas negativos como 0 ou sinalizar.
- **Volume grande de ranking**: paginar/limitar (ex.: top N) mantendo desempenho e legibilidade.
- **Modo demonstração**: os dados de exemplo MUST estar sempre rotulados como "exemplo/demonstração"; nunca podem ser confundidos com dados reais do servidor.
- **Streamers/criadores**: streamer patrocinado que sai do ar entre atualizações deve deixar de aparecer como "ao vivo"; a seção não pode quebrar se a Twitch/YouTube estiver indisponível; no demo, identidades são fictícias.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir um ranking de Top Experiência com posição, personagem, nível/experiência e mundo.
- **FR-002**: O sistema MUST permitir filtrar o Top Experiência por mundo (e/ou visão geral).
- **FR-003**: O sistema MUST calcular e exibir o ranking de Power Gamers — o ganho de experiência por período (dia, semana e mês) — a partir de dados históricos.
- **FR-004**: O sistema MUST coletar e reter periodicamente snapshots do ranking para viabilizar o cálculo do ganho por período (persistência de histórico).
- **FR-005**: O sistema MUST calcular o ganho de um período como a diferença de experiência entre o início e o fim do período; deltas negativos (reset/rollback) MUST ser tratados como 0 (ou sinalizados), nunca como ganho.
- **FR-006**: O sistema MUST informar claramente quando não há histórico suficiente para um período (estado "coletando dados"), sem erro nem número enganoso.
- **FR-007**: O sistema MUST exibir o boss e a criatura boostados do dia.
- **FR-008**: O sistema MUST exibir a contagem e/ou a lista de guilds e permitir ver os dados principais de uma guild (nome, mundo, membros conforme disponível).
- **FR-009**: O sistema MUST exibir as News recentes (título e data) e permitir acessar o conteúdo completo na origem oficial do Rubinot.
- **FR-010**: Cada capacidade MUST degradar de forma graciosa e independente quando sua fonte estiver indisponível, preservando as demais e a página.
- **FR-011**: Todo dado exibido MUST carregar rastreabilidade de origem — **oficial**, **derivado/calculado** ou **exemplo/demonstração** — e o momento da coleta. Dados de exemplo MUST ser rotulados como tais para o usuário (nunca apresentados como reais).
- **FR-012**: As novas páginas MUST seguir a identidade visual e as práticas de responsividade já estabelecidas, sem quebrar as funcionalidades do MVP (US1 vitais e US2 busca de personagem).
- **FR-013**: Enquanto os endpoints reais não estiverem disponíveis, o sistema MUST operar em **modo demonstração**: as páginas da Evolução 1 renderizam a experiência completa (rankings, tiles e gráficos) com **dados de exemplo sintéticos e claramente rotulados**, em vez de estados de "indisponível".
- **FR-014**: As páginas de ranking (Top Experiência e Power Gamers) MUST incluir **visualização gráfica** (ex.: sparklines / gráfico de evolução da experiência), tanto no modo demonstração quanto com dados reais.
- **FR-015**: A troca de dados de exemplo para dados reais (quando a fonte for liberada) MUST ocorrer **atrás dos mesmos ports**, sem reescrever a UI — o modo demonstração é uma implementação de port, não uma tela separada.
- **FR-016**: O sistema MUST exibir os **streamers patrocinados pelo Rubinot que estão ao vivo na Twitch** (canal, título da live e link), destacando quem está online.
- **FR-017**: O sistema MUST exibir os **canais de YouTube patrocinados pelo Rubinot** (nome e link).
- **FR-018**: A lista de patrocinados (Twitch/YouTube) MUST ser **curada** (mantida pela plataforma ou fornecida pelo Rubinot); o status "ao vivo" MUST vir da Twitch. Guilds/rankings não se aplicam aqui.
- **FR-019**: No modo demonstração, os streamers/canais exibidos MUST ser **fictícios e rotulados como exemplo** — nunca identidades reais de pessoas sem consentimento.

*Fora do escopo desta evolução*: hunt finder (Evolução 2); qualquer análise preditiva ou recomendação
automática de caça.

### Key Entities *(include if feature involves data)*

- **Entrada de Ranking (RankingEntry)**: posição, personagem, nível, experiência total, mundo — em um instante.
- **Snapshot de Ranking (RankingSnapshot)**: conjunto de entradas de ranking com timestamp — a base histórica para o cálculo de ganho.
- **Ganho de Experiência (ExperienceGain)**: personagem, período (dia/semana/mês), XP ganho (delta), posição no ranking de power gamers.
- **Boss Boostado (BoostedOfDay)**: boss do dia e criatura do dia (nome e identificação).
- **Guild**: nome, mundo, quantidade/lista de membros (conforme disponível).
- **Item de News (NewsItem)**: título, data, link para o conteúdo completo na origem.
- **Origem do Dado (DataOrigin)**: rótulo que acompanha cada conjunto exibido — `oficial`, `derivado` ou `exemplo` — base da rastreabilidade (FR-011) e da distinção do modo demonstração.
- **Streamer Patrocinado (SponsoredStreamer)**: plataforma (Twitch), canal/handle, nome de exibição, URL, `isLive` (bool), título da live e nº de espectadores (quando ao vivo).
- **Canal Patrocinado (SponsoredChannel)**: plataforma (YouTube), nome do canal, URL (e info adicional como inscritos, quando disponível).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O Top Experiência exibe a lista ordenada corretamente (maior → menor) e o filtro por mundo altera o resultado de forma consistente em 100% dos testes.
- **SC-002**: Dado histórico suficiente, o ranking de Power Gamers reflete o ganho correto por período (dia/semana/mês), validado por cenários com snapshots conhecidos (delta esperado).
- **SC-003**: Quando falta histórico, o sistema comunica "coletando dados" em 100% dos casos, sem exibir número enganoso.
- **SC-004**: Todas as capacidades novas degradam de forma independente sob indisponibilidade da fonte, sem derrubar a página nem as funcionalidades do MVP.
- **SC-005**: O boss e a criatura boostados do dia são exibidos corretamente quando a fonte informa o boosted.
- **SC-006**: As páginas novas permanecem legíveis e utilizáveis em desktop e mobile, mantendo a identidade visual.
- **SC-007**: No modo demonstração, 100% das páginas da Evolução 1 exibem conteúdo populado (rankings, tiles e gráficos) rotulado como "exemplo", sem estados de "indisponível" — validando a apresentação para stakeholders (ex.: staff do Rubinot).
- **SC-008**: A seção de streamers/criadores exibe os streamers ao vivo em destaque (no demo, exemplos fictícios) e os canais de YouTube patrocinados, sem quebrar quando a Twitch/YouTube estiver indisponível.

## Assumptions

- **Continuidade**: mantém a arquitetura em camadas (domínio puro, ports, BFF), testes de domínio obrigatórios (Princípio IV) e a identidade visual atual; nada do MVP pode quebrar (Princípio V).
- **Persistência (novo)**: o ranking de Power Gamers exige **guardar snapshots ao longo do tempo** e um **coletor agendado** (cron) para captura periódica. Isso introduz um datastore no projeto — uma expansão consciente do "sem DB" do MVP, justificada por este requisito. A escolha do datastore e do agendador é decisão do `/speckit-plan` (com Complexity Tracking na constituição).
- **Períodos**: "dia" = últimas 24h; "semana" = 7 dias; "mês" = 30 dias — ajustável no plano/clarify.
- **Top N**: o ranking exibe um top N (ex.: 100) para desempenho/legibilidade; valor exato definido no plano.
- **Identidade do personagem**: o cálculo de ganho depende de um identificador estável do personagem; se a fonte só oferecer o nome, mudanças de nome podem afetar a continuidade (tratar como caso de borda).

### Dependencies (dados externos — a confirmar)

Todas as capacidades dependem de fontes do Rubinot **ainda não confirmadas**, sujeitas ao **mesmo bloqueio
Cloudflare** do MVP (o allowlist solicitado na proposta cobre todas). Rastrear em **`docs/data-sources.md`**:

- **E1** — Ranking de experiência (top exp) → FR-001, FR-002, e base do FR-003.
- **Power Gamers** — derivado de E1 + histórico (não é um endpoint novo; é E1 coletado ao longo do tempo) → FR-003/004/005.
- **E2** — Bosses boostados do dia → FR-007.
- **D3** — Guilds → FR-008.
- **D4** — News (fonte oficial) → FR-009.
- **S1** — **Lista curada de patrocinados** (Twitch handles + canais de YouTube) → FR-016/017/018. Mantida pela plataforma ou fornecida pelo Rubinot (não é uma API do Rubinot).
- **S2** — **Twitch Helix API** para status "ao vivo" → FR-016. Requer credenciais (Client ID/Secret) — **fora** do bloqueio Cloudflare do Rubinot (API própria da Twitch).
- **S3** — **YouTube Data API** (opcional) para info dos canais → FR-017. Requer API key. Sem ela, exibir apenas nome + link.

**Risco central**: sem o allowlist, nenhuma dessas fontes responde server-side (igual ao MVP). Além disso, os
formatos/endpoints exatos (E1, E2, D3, D4) ainda são desconhecidos — devem ser confirmados e registrados em
`docs/data-sources.md` antes de fixar contratos no `/speckit-plan`. A persistência do histórico (FR-004) é a
principal decisão de arquitetura desta evolução.
