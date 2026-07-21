# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota
[Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

## [0.1.0] - 2026-07-21

Primeira versão (MVP): página inicial com vitais do servidor e busca de personagem.

### Adicionado

- Página inicial com **total de jogadores online** (atualização automática a cada 30s) e **lista de mundos** com status (US1).
- **Busca de personagem** por nome, exibindo os dados principais (nível, vocação, mundo, guild) (US2).
- **BFF** (`/api/server-snapshot`, `/api/character`) — o cliente nunca chama o Rubinot diretamente.
- Degradação graciosa por bloco, indicação de dado desatualizado (staleness) e rastreabilidade de origem.
- **Identidade visual** própria: logo (escudo + espada), fontes Cinzel/Inter, paleta dourado/azul.
- **Banner** para o site oficial do Rubinot e **footer** profissional.
- **CI** (GitHub Actions: lint + testes unitários + build + E2E) e **CD** (Vercel, integração Git).
- Testes: 23 unitários (Vitest) + 7 E2E (Playwright).

### Notas

- Os **dados reais em produção** dependem do allowlist do Rubinot (a API está atrás do Cloudflare e bloqueia
  requisições server-side). Enquanto não liberado, o site degrada de forma graciosa. Ver `docs/data-sources.md`.

[Não lançado]: https://github.com/luisffg91/rubinot_statistic/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/luisffg91/rubinot_statistic/releases/tag/v0.1.0
