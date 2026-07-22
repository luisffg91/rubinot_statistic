# Proposta ao Rubinot — Rubinot Statistics

Documento de apoio ao contato com a equipe do Rubinot. Objetivo: apresentar o fansite, solicitar a
liberação (allowlist) das APIs e propor uma parceria de divulgação. Enviar **após o MVP estar ajustado**
(feito) — com o link já no ar.

- **MVP no ar:** https://rubinot-statistic.vercel.app/
- **Pedido técnico principal:** allowlist do User-Agent `RubibotStatistics/1.0 (+https://rubinot-statistic.vercel.app)` nas rotas `GET /api/worlds` e `GET /api/characters/search` (hoje bloqueadas pelo Cloudflare no acesso server-side).
- **Deck para anexar:** gere o PDF a partir de [`deck/`](deck/) (`deck.html` → PDF; ver `deck/README.md`). O PDF fica **local, fora do git**.

---

## E-mail (curto e objetivo — detalhe vai no deck em anexo)

**Assunto:** Rubinot Statistics — fansite de estatísticas (parceria + allowlist de API)

Olá, equipe do Rubinot!

Sou fã do servidor e criei o **Rubinot Statistics**, o primeiro fansite de estatísticas dedicado ao Rubinot
(inspirado no GuildStats). Já está no ar: **https://rubinot-statistic.vercel.app/** — e deixa explícito que é
um fansite **não-oficial**, respeitando a identidade visual de vocês.

Para os dados aparecerem em produção, preciso de uma ajuda pequena: **liberar (allowlist) o acesso do meu
servidor** às rotas `GET /api/worlds` e `GET /api/characters/search`, hoje bloqueadas pelo Cloudflare
(funcionam no navegador, mas não no acesso server-side). Basta liberar o User-Agent `RubibotStatistics/1.0`
— ou me orientar sobre uma API oficial para fansites.

Em troca, o projeto trabalha a favor do servidor (banner para o site oficial + divulgação com
streamers/criadores). **Anexei um material de apresentação** com a visão completa, o roadmap e o plano de
parceria.

Fico à disposição para alinhar o que for necessário. Obrigado pelo trabalho de vocês no servidor!

Abraço,
[Seu nome] — Rubinot Statistics
rubinotstatistics@gmail.com · https://rubinot-statistic.vercel.app/

<!-- Versão pronta para envio, com nome e telefone reais, em docs/outreach/rubinot-proposal.local.md
     (arquivo NÃO versionado — o repositório é público). O detalhamento abaixo alimenta o deck em anexo. -->


---

## Detalhamento (anexo à conversa)

### Objetivo da plataforma

Facilitar a vida do jogador com **bons dados e dicas**: entender o pulso do servidor, acompanhar mundos,
consultar personagens e — nas evoluções — ranking de experiência, bosses boostados e ferramentas de caça.
Tudo de forma didática e acessível.

### O que já existe (MVP)

- Total de jogadores online com atualização automática (a cada 30s).
- Lista de mundos com status e informações.
- Busca de personagem por nome (dados principais).
- Degradação graciosa e transparência de origem dos dados (nada de números "mágicos").

### Roadmap (evoluções previstas)

1. **Evolução 1:** guilds, News (da fonte oficial), ranking/top de experiência, bosses boostados do dia,
   ranking de power gamers (quem mais ganha XP por período) e vitrine de streamers/criadores parceiros.
2. **Evolução 2 — Ferramentas para o jogador (`/ferramentas`):** central de calculadoras calculadas no
   próprio navegador (não dependem das suas APIs): **velocidade**, **level** (XP), **treino** (skill/magic
   level), **stamina** e **simulador de roda de habilidade** (Wheel of Destiny). Hunt finder em fase posterior.
- Cada evolução é especificada e testada antes de ir ao ar (qualidade como prioridade).

### O que o Rubinot ganha

- **Vitrine e retenção:** um fansite ativo mantém a comunidade engajada e dá mais motivos para jogar.
- **Tráfego direcionado:** banner e CTAs levando ao site oficial e ao download.
- **Ferramentas que fixam o jogador:** calculadoras (velocidade, level, treino, stamina e roda de
  habilidade) transformam o fansite em rotina diária — mais tempo na comunidade do Rubinot.
- **Pioneirismo:** ser o primeiro servidor alternativo com um fansite de estatísticas dedicado.
- **Zero custo/risco:** hospedagem e manutenção por nossa conta; consumo de dados responsável (sem abuso,
  respeitando eventuais limites que vocês definirem).

### Pedido técnico (resumo)

- Allowlist do User-Agent `RubibotStatistics/1.0 (+https://rubinot-statistic.vercel.app)` para
  `GET /api/worlds` e `GET /api/characters/search`; ou orientação sobre uma API oficial para fansites.
- Feliz em ajustar o User-Agent, adotar cache/limites de frequência ou qualquer requisito de vocês.

---

## Plano de divulgação

Objetivo: levar jogadores ao Rubinot e usuários ao fansite, de forma orgânica e de baixo custo.

### Streamers e criadores de conteúdo

- Mapear **streamers de Tibia/OTs** (Twitch/YouTube) que já jogam ou já citaram o Rubinot; oferecer o
  fansite como ferramenta de apoio ao vivo (mostrar online/mundos/rankings na tela).
- **Parcerias de conteúdo**: vídeos "melhores mundos para começar", "top experiência da semana",
  "bosses boostados hoje" — usando os dados do fansite como base.
- **Overlays/widgets** para stream (ex.: contador de online, top exp) — atrai o streamer e divulga a marca.

### YouTube e comunidades

- Vídeos curtos/Shorts com rankings e curiosidades semanais.
- Presença em **Discord** (do Rubinot e de comunidades de OT) e grupos, sempre agregando valor (dados úteis),
  não spam.
- Posts em fóruns/redes com recortes de dados (ex.: "servidor bateu X online no fim de semana").

### Cadência e métricas

- Conteúdo recorrente (semanal) atrelado aos dados do servidor.
- Acompanhar cliques do banner → site oficial e retorno de usuários ao fansite para medir o impacto.

> Toda divulgação reforça a marca do Rubinot e credita o servidor como origem oficial dos dados.
