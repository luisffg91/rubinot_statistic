# Contrato — Rubinot Worlds API (D1 + D2)

**Status**: ✅ Confirmado (docs/data-sources.md, exemplo em docs/worlds-response.json)

## Request

```
GET https://rubinot.com.br/api/worlds
```

- **Auth**: nenhuma.
- **Rate limit**: nenhum confirmado (data-sources.md Q4). Ainda assim, o polling do cliente deve usar intervalo ~30s.
- **Parâmetros**: nenhum.

## Response 200 (application/json)

```jsonc
{
  "worlds": [
    {
      "name": "Auroria",           // string
      "pvpType": "pvp",            // string: "pvp" | "no-pvp" | "pvp-enforced"
      "pvpTypeLabel": "Open PvP",  // string (legível)
      "worldType": "yellow",       // string: "green" | "yellow" (observado)
      "locked": false,             // boolean — travado p/ novos chars (≠ offline)
      "creationDate": 1731297600,  // number — UNIX EM SEGUNDOS
      "playersOnline": 972         // number ≥ 0
    }
    // ... (18 mundos na amostra)
  ]
}
```

### Invariантes observadas (amostra)

- `worlds` é um array não-vazio (18 itens na amostra).
- `totalOnline` = Σ `playersOnline` = **14167** na amostra (usar como fixture de teste do domínio — RG-1).
- Distribuição amostral: pvpType {no-pvp:8, pvp:7, pvp-enforced:3}; worldType {green:14, yellow:4}; locked:11.

## Erros / degradação

- Timeout, 5xx, JSON malformado ou `worlds` ausente ⇒ o Route Handler responde estado de indisponibilidade; o cliente mantém último valor e sinaliza staleness (FR-009/FR-010). Não derrubar a página.

## Mapeamento p/ domínio

- `creationDate` (unix s) → `Date`.
- `status` de mundo é **derivado** (RG-2), não vem no payload.
- Campos extras futuros devem ser ignorados com segurança (tolerância a evolução da fonte).
