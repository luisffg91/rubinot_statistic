# Contrato — Configuração manual (passos do usuário)

Estes passos dependem de painéis externos e **não são automatizáveis** nesta máquina (sem `gh` CLI).
Rastreados como M1/M2 no research.

## M1 — Conectar o repositório ao Vercel (habilita CD)

1. Acessar https://vercel.com → **Add New… → Project**.
2. Importar o repositório `luisffg91/rubinot_statistic` (autorizar o app do Vercel no GitHub, se pedido).
3. Framework detectado: **Next.js** (deixar defaults; build `next build`).
4. Confirmar. A partir daí:
   - cada **pull request** gera um **Preview Deployment** (link postado no PR pelo bot do Vercel);
   - cada **push/merge na main** gera um **Production Deployment**.
5. Não é necessário configurar segredos no GitHub (o Vercel usa a própria integração Git).

**Critério de aceite**: abrir um PR e ver o comentário/So check do Vercel com a URL de preview (SC-003);
mergear e ver a produção atualizada (SC-004).

## M2 — Proteção de branch na main (exige CI verde)

1. GitHub → repo → **Settings → Branches → Add branch ruleset (ou Branch protection rule)**.
2. Branch name pattern: `main`.
3. Marcar **Require a pull request before merging**.
4. Marcar **Require status checks to pass before merging** e selecionar o check **CI**
   (aparece após a primeira execução do workflow).
5. (Opcional) **Require branches to be up to date before merging**.
6. Salvar.

**Critério de aceite**: um PR com CI vermelho não permite merge; com CI verde, permite (FR-004 / SC-002).

> Alternativa automatizável no futuro: instalar o `gh` CLI (`brew install gh`) e aplicar a proteção via
> `gh api` — fora do escopo desta fase.
