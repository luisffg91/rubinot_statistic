# Contrato — BFF interno (Evolução 1)

Endpoints internos consumidos pela UI. Cliente nunca chama o Rubinot direto. Todo payload carrega
`origin` (`oficial|derivado|exemplo`) e `fetchedAt` (FR-011). No modo demonstração, `origin = "exemplo"`.

## GET /api/ranking?world={mundo?}

```jsonc
{
  "origin": "exemplo",
  "fetchedAt": "2026-07-21T12:00:00.000Z",
  "world": "Auroria",            // ou null (global)
  "entries": [
    { "rank": 1, "name": "…", "level": 1200, "experience": 999999999, "world": "Auroria" }
    // … top 100
  ]
}
```

## GET /api/power-gamers?period={day|week|month}&world={mundo?}

```jsonc
{
  "origin": "exemplo",
  "fetchedAt": "…",
  "period": "day",
  "entries": [
    { "rank": 1, "name": "…", "world": "Auroria", "gained": 42000000, "spark": [/* pontos p/ sparkline */] }
    // … top 100
  ],
  "collecting": false            // true = histórico insuficiente (FR-006)
}
```

## GET /api/bosses

```jsonc
{ "origin": "exemplo", "fetchedAt": "…", "boss": "…", "creature": "…", "date": "2026-07-21" }
```

## GET /api/guilds  ·  GET /api/guilds/{name}

```jsonc
{ "origin": "exemplo", "fetchedAt": "…", "count": 2999, "guilds": [ { "name": "…", "world": "…", "memberCount": 120 } ] }
```

## GET /api/news

```jsonc
{ "origin": "exemplo", "fetchedAt": "…", "items": [ { "title": "…", "date": "…", "url": "https://rubinot.com.br/news/…" } ] }
```

## Regras transversais

- Falha de um endpoint → estado de indisponibilidade só daquele bloco (FR-010).
- `origin: "exemplo"` MUST ser refletido na UI com um selo "dados de exemplo" (FR-011/FR-013).
