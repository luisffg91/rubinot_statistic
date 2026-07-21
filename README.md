# Rubibot Statistics

Plataforma didática de **dados e estatísticas do servidor Rubinot** (servidor alternativo de Tibia),
inspirada no fansite [GuildStats](https://guildstats.eu/). O objetivo é demonstrar, de forma clara, como
bons dados ajudam os jogadores.

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

## Estado atual

- **US1 (vitais do servidor)**: implementada e testada (unit + E2E). É o MVP entregável.
- **US2 (busca de personagem)**: planejada; aguarda confirmação do endpoint de personagem (C1) e do print de
  referência da UI. Enquanto isso, a busca degrada de forma graciosa.

## Documentação para contribuir

Veja [`CLAUDE.md`](CLAUDE.md) para orientações de desenvolvimento com Claude Code (comandos, convenções e
estrutura). O fluxo de evolução segue o Spec Kit: `constitution → specify → clarify → plan → tasks → implement`.
