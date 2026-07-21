# Contrato — Rubinot Character (D5)

**Status**: 🟡 Parcial — exemplo de response conhecido (docs/character-details.json), mas **endpoint exato e
status online a confirmar**. Não bloqueia US1.

## Request (a confirmar — C1)

```
GET https://rubinot.com.br/character/{nome}   // caminho SUGERIDO; confirmar em data-sources.md (D5)
```

- **Auth**: presumivelmente nenhuma (a confirmar).
- **Parâmetro**: `nome` do personagem (path). Nome com espaços deve ser codificado.
- **Not found**: retorna 404 / estrutura estável (data-sources.md Q3 = "Sim") ⇒ mapear para `SearchResult{found:false}`.

## Response 200 (application/json) — subconjunto usado no MVP

```jsonc
{
  "player": {
    "name": "Minlek Tanker",       // ✅ MVP
    "level": 1000,                  // ✅ MVP
    "vocation": "Elite Knight",     // ✅ MVP
    "world": "Lunarian",            // ✅ MVP
    "guild": null,                  // ✅ MVP (pode ser null ou objeto/string — confirmar forma quando != null)
    // --- fora do escopo do MVP (ignorar no mapper): ---
    "sex": "Male", "residence": "Roshamuul", "lastlogin": "1784592722",
    "created": 1718379720, "comment": "…", "isHidden": true, "formerNames": ["…"],
    "looktype": 152, "achievementPoints": 218 /* … */
  },
  "deaths": [ /* fora do MVP */ ],
  "otherCharacters": [ /* fora do MVP */ ],
  "banInfo": null
}
```

## NEEDS CLARIFICATION

- **C1**: caminho/método exatos do endpoint.
- **C2 (status online/offline)**: **não há** campo de online no exemplo (personagem `isHidden:true`), e o
  `/api/worlds` fornece apenas contagem, não nomes online. Definir a fonte do status:
  - opção (a) campo no próprio endpoint de personagem para não-ocultos;
  - opção (b) endpoint/lista "who is online" por mundo para cruzar com o nome.
  Até resolver, `Character.status` fica **opcional/`unknown`** e a UI omite o selo de status.
- **guild != null**: confirmar formato (string com nome vs. objeto) quando o personagem tiver guild.

## Estratégia enquanto pendente

`CharacterRepository` é um *port* do domínio. Implementação real (`RubinotCharacterClient`) entra quando C1
for confirmado; até lá, `NotConfiguredCharacterRepository` responde "indisponível" e a US2 exibe mensagem de
indisponibilidade (exercita FR-009) sem bloquear a US1.
