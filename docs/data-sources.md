# Fontes de Dados & Endpoints — Rubibot Statistics

> **Documento vivo.** Este é o lugar canônico onde listamos todo dado externo que o produto
> precisa consumir, conforme o Princípio VII da constituição (Transparência de Dados).
> À medida que as features evoluem, novas linhas são adicionadas aqui **antes** do `/speckit-plan`
> daquela fase, para que a origem do dado seja providenciada em paralelo ao desenvolvimento.
>
> Referência: `TODO(ENDPOINTS_RUBINOT)` na constituição. Fonte base: [https://rubinot.com.br](https://rubinot.com.br)

## Legenda de status

- 🔴 **A confirmar** — não sabemos ainda se há endpoint/API; usuário precisa investigar.
- 🟡 **Parcial** — origem conhecida, mas faltam detalhes (parâmetros, formato, auth).
- 🟢 **Confirmado** — endpoint validado, com contrato conhecido.

## Como preencher

Ao descobrir uma fonte, preencha: **URL exata**, **método**, **parâmetros**, **formato de resposta**
(JSON? HTML a scrapear?), **necessidade de autenticação** e **rate limit**, e mude o status.

---

## MVP — Página inicial


| #   | Dado necessário                              | Usado em (MVP)               | Origem sugerida                                            | Endpoint / URL (a confirmar)                                           | Parâmetros           | Formato esperado                                           | Auth | Status         |
| --- | -------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------- | ---- | -------------- |
| D1  | Total de jogadores online (com auto-refresh) | Contador na home             | Rubinot                                                    | [https://rubinot.com.br/api/worlds](https://rubinot.com.br/api/worlds) | —                    | Exemplo da response no arquivo worlds-response.json        | -    | OK             |
| D2  | Lista de mundos e status (online/offline)    | Bloco "mundos online"        | Rubinot                                                    | `Mesmo do acima`                                                       | —                    | Mesmo do acima                                             | -    | OK             |
| D3  | Guilds criadas (contagem e/ou lista)         | Bloco "guilds criadas"       | Rubinot                                                    | `Pode ficar para próxima evolução.`                                    | por mundo?           | JSON lista/contagem                                        | ?    | 🔴 A confirmar |
| D4  | News / atualizações                          | Conteúdo principal da home   | [https://rubinot.com.br/news](https://rubinot.com.br/news) | [https://rubinot.com.br/news](https://rubinot.com.br/news)             | paginação?           | JSON ou HTML                                               | ?    | OK             |
| D5  | Dados de personagem (busca)                  | Campo "busca por personagem" | Rubinot                                                    | `?` (ex.: `/character/{nome}`)                                         | `nome` do personagem | JSON exemplo da response no arquivo character-details.json | ?    | 🔴 A confirmar |


### Perguntas-chave para o MVP (para você investigar)

1. O Rubinot expõe **API pública** (JSON) ou os dados só existem como **HTML** nas páginas do site? Isso decide entre client de API vs. scraping — impacto direto em confiabilidade e observabilidade.
  1. Expoe API
2. Existe uma página tipo *"Who is online"* / *"Server info"* de onde D1, D2 e D3 possam sair de uma vez?
  1. Sim
3. A busca por personagem (D5) tem URL previsível por nome? Retorna 404/estrutura estável quando o personagem não existe?
  1. Sim
4. Há **rate limit** ou bloqueio a requisições automatizadas? (afeta o auto-refresh do D1)
  1. Nao

---

## Evoluções previstas (ainda não no MVP — listadas para pré-mapeamento)


| #   | Dado necessário                                         | Fase alvo  | Origem sugerida                      | Status         |
| --- | ------------------------------------------------------- | ---------- | ------------------------------------ | -------------- |
| E1  | Ranking de experiência / top experiência (ganho de exp) | Evolução 1 | Ranking oficial do Rubinot (via API) | 🔴 A confirmar |
| E2  | Bosses boostados do dia                                 | Evolução 1 | Rubinot (a confirmar origem)         | 🔴 A confirmar |
| E3  | Hunt finder (dados de spawns/áreas)                     | Evolução 2 | A definir                            | 🔴 A confirmar |


---

## Registro de decisões sobre dados

*(Adicione aqui, com data, qualquer decisão relevante: "descobrimos que X só existe como HTML", "API tem rate limit de N/min", etc.)*

- *2026-07-20 — Documento criado. Todos os endpoints do MVP pendentes de confirmação.*
- *2026-07-20 — D1/D2 confirmados: `GET /api/worlds` (JSON). Rubinot expõe API pública (Q1=sim); sem rate limit (Q4=não). Total online = soma de `playersOnline`.*
- *2026-07-21 — US1 implementada e validada (unit + E2E). D5 (personagem) segue 🟡: URL previsível e 404 estável confirmados (Q3), mas falta o path exato (C1) e o campo de status online (C2). D3 (guilds) e D4 (News) movidos para a Evolução 1.*

