# Contrato — Endpoints reais do Rubinot (Evolução 1) — PENDENTE

**Status**: 🔴 a confirmar. Endpoints/formatos desconhecidos e sujeitos ao mesmo bloqueio Cloudflare do MVP
(o allowlist solicitado na proposta cobre todos). Rastrear em `docs/data-sources.md`.

| ID | Dado | Endpoint (a confirmar) | Observações |
|----|------|------------------------|-------------|
| E1 | Ranking de experiência (top exp) | `?` | Base do Top Experiência e do histórico de Power Gamers. |
| E2 | Bosses boostados do dia | `?` | Boss + criatura do dia. |
| D3 | Guilds | `?` | Contagem/lista/detalhe. |
| D4 | News | `https://rubinot.com.br/news` (formato a confirmar) | JSON ou HTML. |

## NEEDS CLARIFICATION

- Caminho, método, parâmetros e formato de cada endpoint.
- Se há um endpoint de ranking com XP por mundo e paginação (para o top 100).
- Frequência recomendada de coleta (para o snapshot do Power Gamers real) e eventual rate limit.

## Estratégia enquanto pendente

Onda 1 usa os adapters mock (`origin: "exemplo"`). Ao confirmar cada endpoint, implementa-se o client real +
mapper atrás do mesmo port e liga-se via env — sem tocar na UI.
