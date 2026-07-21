# Rubinot Statistics

<!-- Marca exibida: "Rubinot Statistics". Nome interno do pacote npm: rubibot-statistics. -->


Plataforma didática de **dados e estatísticas do servidor Rubinot** (servidor alternativo de Tibia),
inspirada no fansite [GuildStats](https://guildstats.eu/). O objetivo é demonstrar, de forma clara, como
bons dados ajudam os jogadores.

🔗 **Produção**: https://rubinot-statistic.vercel.app/

> Desenvolvido com [Spec Kit](https://github.com/github/spec-kit). A especificação de cada fase vive em
> `specs/`; os princípios do projeto em `.specify/memory/constitution.md`.

## MVP (feature `001-home-dashboard`)

Página inicial com:

- **Total de jogadores online** com atualização automática (a cada 30s).
- **Lista de mundos** com status e selo de mundo travado (`locked`).
- **Busca de personagem** (em construção — ver "Estado atual").

Fora do MVP (Evolução 1): guilds, News (fonte oficial já decidida), ranking/top de experiência e bosses
boostados. Evolução 2: hunt finder.

## Stack

- **Next.js** (App Router) + **TypeScript** — app full-stack em repositório único.
- **Vitest** — testes unitários das regras de domínio.
- **Playwright** — testes E2E (com rede interceptada).

## Arquitetura em camadas

O domínio é o centro e não depende de detalhes técnicos (ver `.specify/memory/constitution.md`, Princípio II):

```text
src/
├── domain/            # PURO: entidades, regras (services) e ports (interfaces)
├── application/       # casos de uso (orquestram domínio + ports)
├── infrastructure/    # adapters externos (client do /api/worlds, http, mappers)
└── app/               # Next.js: UI (React) + Route Handlers (BFF)
```

O cliente **nunca** chama o Rubinot diretamente — sempre via BFF (`/api/server-snapshot`), o que preserva a
rastreabilidade de origem dos dados e centraliza o tratamento de erro/staleness.

## Como rodar

```bash
npm install
npm run dev          # http://localhost:3000
```

### Testes

```bash
npm run test:unit    # Vitest — regras de domínio (sem rede)
npm run test:e2e     # Playwright — home (rede interceptada; instala o browser na 1ª vez)
```

### Build

```bash
npm run build && npm start
```

## Fontes de dados

Todas as fontes externas são rastreadas em [`docs/data-sources.md`](docs/data-sources.md).

- ✅ **Online + mundos**: `GET https://rubinot.com.br/api/worlds` (JSON). O total online é a soma de
  `playersOnline` de todos os mundos.
- 🟡 **Personagem** (busca): endpoint com URL previsível e 404 estável; falta confirmar o path exato e o
  campo de status online (ver C1/C2 em `docs/data-sources.md`).

## CI/CD

- **CI** (GitHub Actions, `.github/workflows/ci.yml`): em cada PR e push para a `main` roda lint, testes
  unitários, build e E2E. Merge na `main` só com o check **CI** verde.
- **CD** (Vercel, integração Git): preview a cada PR, produção a cada merge na `main`.
- Fluxo: feature branch → PR → CI verde → merge → deploy. Detalhes e passos de setup em
  [`docs/ci-cd.md`](docs/ci-cd.md).

## Evolução 1 (modo demonstração)

Novas páginas, hoje populadas com **dados de exemplo** (rotulados como "dados de exemplo") para demonstrar a
experiência completa antes da liberação das APIs do Rubinot:

- `/ranking` — Top Experiência (filtro por mundo).
- `/power-gamers` — quem mais ganhou XP por dia/semana/mês (com sparkline).
- `/bosses` — boss e criatura boostados do dia.
- `/guilds` — lista e detalhe de guilds.
- `/news` — novidades do servidor.
- `/streamers` — streamers patrocinados ao vivo (Twitch) + canais de YouTube.

Cada capacidade fica atrás de um *port*; hoje um adapter **mock** (`src/infrastructure/mock/`) fornece os
dados de exemplo. Quando os endpoints reais forem liberados, troca-se o adapter (via `infrastructure/config`)
sem reescrever a UI. Detalhes em `specs/003-evolution-1/`.

## Estado atual

- **US1 (vitais do servidor)**: ✅ implementada e testada (unit + E2E).
- **US2 (busca de personagem)**: ✅ implementada (endpoint `/api/characters/search`); status online fica `unknown` até a fonte expor (C2).
- ⚠️ **Dados reais em produção** dependem do allowlist do Rubinot (bloqueio Cloudflare). Até lá, o site degrada graciosamente. Ver `docs/ci-cd.md` e `docs/data-sources.md`.

## Documentação para contribuir

Veja [`CONTRIBUTING.md`](CONTRIBUTING.md) para as convenções (Conventional Commits, nomes de branch, fluxo de
PR) e [`CLAUDE.md`](CLAUDE.md) para orientações de desenvolvimento com Claude Code (comandos, camadas). O fluxo
de evolução segue o Spec Kit: `constitution → specify → clarify → plan → tasks → implement`.
