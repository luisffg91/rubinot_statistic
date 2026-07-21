<!--
SYNC IMPACT REPORT
==================
Versão: (não versionado / template) → 1.0.0
Tipo de mudança: MAJOR (ratificação inicial)

Princípios definidos (novos):
  I.   Didática e Legibilidade em Primeiro Lugar
  II.  Domínio no Centro (Arquitetura em Camadas)
  III. Regras de Negócio Explícitas e Centralizadas
  IV.  Testes do Domínio (NÃO-NEGOCIÁVEL)
  V.   Evolução Incremental e Compatível
  VI.  Simplicidade Deliberada (YAGNI)
  VII. Documentação Viva e Transparência de Dados

Seções adicionadas:
  - Restrições Técnicas & Fontes de Dados
  - Fluxo de Desenvolvimento (Spec Kit)
  - Governança

Seções removidas: nenhuma (criação inicial)

Templates verificados:
  ✅ .specify/templates/plan-template.md — "Constitution Check" é preenchido pelo /speckit-plan; gates alinhados aos princípios.
  ✅ .specify/templates/spec-template.md — nenhuma seção obrigatória nova exigida pela constituição.
  ⚠ .specify/templates/tasks-template.md — o template marca testes como OPCIONAIS; por força do Princípio IV,
     tarefas de teste unitário para REGRAS DE DOMÍNIO são OBRIGATÓRIAS. O /speckit-tasks deve incluí-las
     para o núcleo de domínio mesmo quando não solicitadas explicitamente.

Follow-ups (TODO):
  - TODO(ENDPOINTS_RUBINOT): confirmar com o usuário os endpoints reais da API do Rubinot / ranking oficial
    (players online, guilds, mundos, ranking de exp, bosses boostados). Ver Princípio VII e seção Fontes de Dados.
  - Correção de nomenclatura: o prompt pedia ".CLAUDE.md"; adotado o padrão do Claude Code "CLAUDE.md" (sem ponto inicial).
  - Trecho do prompt sobre "álbum de figurinhas / trocas" foi tratado como resíduo de template e NÃO incorporado.
-->

# Rubibot Statistics Constitution

Plataforma didática de dados e estatísticas para o servidor alternativo de Tibia **Rubinot**,
inspirada no fansite **GuildStats**. Objetivo: demonstrar, de forma clara e educativa, como bons
dados e dicas tornam o jogo mais fácil e performático para os jogadores.

## Core Principles

### I. Didática e Legibilidade em Primeiro Lugar

O código é material de treinamento técnico — legibilidade não é opcional.

- Nomes de classes, métodos, entidades e serviços MUST ser claros e expressar intenção de negócio.
- Preferir código óbvio a código "esperto"; qualquer decisão não-óbvia MUST ter comentário curto explicando o porquê.
- Qualquer desenvolvedor com conhecimento intermediário MUST conseguir entender um módulo sem depender do autor.

**Racional**: o produto existe para ensinar. Código ilegível derruba tanto o objetivo educativo quanto a confiança na plataforma.

### II. Domínio no Centro (Arquitetura em Camadas)

Arquitetura em camadas simples: **domínio → aplicação → infraestrutura**.

- O domínio MUST ser a fonte primária das regras do sistema e NÃO MUST depender de detalhes técnicos (HTTP, banco, APIs externas, framework de UI).
- Dependências apontam para dentro: infraestrutura e aplicação conhecem o domínio; o domínio não conhece nenhuma das duas.
- Integrações externas (API do Rubinot, ranking oficial) MUST ser isoladas na camada de infraestrutura, atrás de contratos/interfaces definidos pelo domínio ou aplicação.

**Racional**: manter o domínio limpo torna as regras testáveis, evolutivas e independentes de qual API ou UI está em uso hoje.

### III. Regras de Negócio Explícitas e Centralizadas

Cada regra de negócio tem um único lugar de verdade.

- Regras MUST ser explícitas e documentadas (não escondidas em componentes de UI ou controllers).
- Lógica de negócio NÃO MUST ser duplicada; ao encontrar duplicação, centralizar no domínio.
- Cálculos de estatística (ex.: ganho de exp por ranking, top experiência) MUST viver no domínio, não na apresentação.

**Racional**: regra duplicada é regra que diverge. Centralização garante consistência dos números — o ativo central deste produto.

### IV. Testes do Domínio (NÃO-NEGOCIÁVEL)

O comportamento do domínio é validado por testes automatizados.

- Toda regra de negócio no domínio MUST ter teste unitário cobrindo caso feliz e ao menos os limites/erros relevantes.
- Testes de regra de domínio NÃO MUST depender de rede, banco ou APIs externas (usar dublês/fakes).
- Nenhuma regra de domínio nova é considerada concluída sem seu teste correspondente.

**Racional**: os dados precisam ser confiáveis. Sem testes de domínio, uma estatística errada passa despercebida e mina a confiança do jogador.

### V. Evolução Incremental e Compatível

O sistema cresce em fatias, começando pelo MVP.

- Cada evolução MUST ser especificada (`/speckit-specify`) antes de ser planejada (`/speckit-plan`) e implementada (`/speckit-implement`).
- Nenhuma funcionalidade fora do escopo definido da fase atual MUST ser adicionada (sem scope creep).
- Cada evolução MUST preservar compatibilidade com as funcionalidades já existentes; quebras exigem justificativa explícita e nota de migração.

**Racional**: entregas pequenas e compatíveis reduzem risco de regressão e mantêm o produto sempre demonstrável.

### VI. Simplicidade Deliberada (YAGNI)

A arquitetura MUST ser a mais simples que resolve o escopo atual.

- Não introduzir camadas, padrões ou abstrações "para o futuro" sem necessidade presente comprovada.
- Complexidade adicional MUST ser justificada por escrito (ver "Complexity Tracking" no plano).
- Preferir soluções e bibliotecas maduras e amplamente adotadas às caseiras.

**Racional**: complexidade desnecessária contradiz o objetivo didático e aumenta a superfície de falha.

### VII. Documentação Viva e Transparência de Dados

Documentação acompanha o código e as fontes de dados são explícitas.

- `README.md` MUST existir e ser mantido atualizado a cada evolução relevante.
- `CLAUDE.md` MUST conter as informações essenciais para qualquer dev operar o projeto com Claude Code (stack, como rodar, estrutura de camadas, convenções).
- Sempre que uma feature depender de dados externos, o time MUST listar explicitamente os **endpoints necessários** (URL, parâmetros, formato esperado) para que o usuário os providencie durante o desenvolvimento.
- Dados de fonte externa MUST ter origem rastreável; distinguir dado oficial (API) de dado derivado/calculado.

**Racional**: transparência sobre de onde vêm os números é pré-requisito de confiança; documentação viva mantém o projeto utilizável por qualquer colaborador.

## Restrições Técnicas & Fontes de Dados

- **Arquitetura**: camadas `domínio / aplicação / infraestrutura`, com o domínio livre de dependências técnicas.
- **Stack**: a definir na fase de `/speckit-plan`; MUST priorizar as melhores práticas atuais de desenvolvimento web para a página inicial e favorecer tecnologias maduras e bem suportadas.
- **Fontes de dados externas** (a confirmar — ver TODO(ENDPOINTS_RUBINOT)):
  - Jogadores online, guilds, mundos online — origem: Rubinot.
  - Ranking de experiência / top experiência — origem: ranking oficial do Rubinot (via API).
  - Bosses boostados do dia — origem a confirmar.
  - Notícias/News — origem: https://rubinot.com.br/news (a confirmar formato: API vs. scraping).
- **Contratos**: toda integração externa MUST ser acessada por uma interface/adaptador na infraestrutura; o domínio nunca chama HTTP diretamente.
- **Referência de produto**: `docs/references/guild-stats-page.png` e https://guildstats.eu/ servem de referência visual/funcional, não de vínculo técnico.

## Fluxo de Desenvolvimento (Spec Kit)

O desenvolvimento segue o fluxo do Spec Kit, e nenhuma etapa pula a anterior:

1. `/speckit-constitution` — princípios do projeto (este documento).
2. `/speckit-specify` — especificação da feature/evolução (o quê e por quê, sem detalhe técnico).
3. `/speckit-clarify` — reduzir ambiguidades antes de planejar (recomendado).
4. `/speckit-plan` — decisões técnicas, estrutura e "Constitution Check".
5. `/speckit-tasks` — tarefas acionáveis, ordenadas por dependência e agrupadas por user story.
6. `/speckit-analyze` — consistência entre spec, plan e tasks (recomendado antes de implementar).
7. `/speckit-implement` — execução das tarefas.

Regras do fluxo:
- Cada fase de produto (MVP → Evolução 1 → Evolução 2 → …) MUST passar por spec antes de plan e implement.
- O "Constitution Check" do plano MUST validar aderência aos princípios I–VII; violações MUST ir para "Complexity Tracking" com justificativa.
- Skills e subagentes específicos PODEM ser criados quando reduzirem retrabalho ou aumentarem consistência, desde que respeitem estes princípios.

## Governança

- Esta constituição **supersede** outras práticas em caso de conflito.
- **Emendas** MUST ser documentadas neste arquivo, com atualização do Sync Impact Report e da versão.
- **Versionamento semântico** do documento:
  - **MAJOR**: remoção/redefinição incompatível de princípios ou governança.
  - **MINOR**: novo princípio/seção ou expansão material de guidance.
  - **PATCH**: esclarecimentos, correções e refinamentos não-semânticos.
- **Revisão de conformidade**: toda spec, plan e revisão de código MUST verificar aderência aos princípios; desvios não justificados bloqueiam a entrega.
- **Guidance de runtime**: usar `CLAUDE.md` como fonte de orientação operacional para desenvolvimento assistido por Claude Code.

**Version**: 1.0.0 | **Ratified**: 2026-07-20 | **Last Amended**: 2026-07-20
