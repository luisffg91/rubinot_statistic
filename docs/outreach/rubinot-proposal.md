# Proposta ao Rubinot — Rubinot Statistics

Documento de apoio ao contato com a equipe do Rubinot. Objetivo: apresentar o fansite, solicitar a
liberação (allowlist) das APIs e propor uma parceria de divulgação. Enviar **após o MVP estar ajustado**
(feito) — com o link já no ar.

- **MVP no ar:** https://rubinot-statistic.vercel.app/
- **Pedido técnico principal:** allowlist do User-Agent `RubibotStatistics/1.0 (+https://rubinot-statistic.vercel.app)` nas rotas `GET /api/worlds` e `GET /api/characters/search` (hoje bloqueadas pelo Cloudflare no acesso server-side).

---

## E-mail (pronto para envio)

**Assunto:** Parceria — Rubinot Statistics, um fansite de estatísticas para o servidor

Olá, equipe do Rubinot!

Sou fã do servidor e desenvolvi o **Rubinot Statistics**, um fansite dedicado a reunir e apresentar, de
forma clara, as estatísticas do Rubinot — inspirado em sites como o GuildStats (referência no Tibia global).
Seria, até onde sei, **o primeiro fansite de estatísticas dedicado ao Rubinot**.

Já há um MVP funcional no ar: **https://rubinot-statistic.vercel.app/**. Ele mostra o total de jogadores
online (com atualização automática), os mundos e uma busca de personagem. Toda a experiência foi construída
com cuidado, respeitando a identidade visual de vocês e deixando explícito que é um **fansite não-oficial**.

Para os dados aparecerem em produção, preciso de uma pequena ajuda de vocês: o acesso às rotas
`/api/worlds` e `/api/characters/search` funciona no navegador, mas é bloqueado pelo Cloudflare quando o
nosso servidor tenta consultá-las. **Seria possível liberar (allowlist) as requisições identificadas pelo
User-Agent `RubibotStatistics/1.0`?** (Alternativamente, um endpoint/token oficial para fansites também
funcionaria — o que for mais confortável para vocês.)

Em troca, o projeto trabalha **a favor do servidor**: já há um banner que leva ao site oficial, e tenho um
plano de divulgação com streamers e criadores de conteúdo para atrair e reter jogadores (detalhes abaixo).

Fico à disposição para conversar, ajustar o que for necessário e alinhar expectativas. Obrigado pela
atenção e pelo trabalho de vocês no servidor!

Abraço,
[Seu nome] — Rubinot Statistics
[e-mail de contato] · https://rubinot-statistic.vercel.app/

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

1. **Evolução 1:** guilds, News (da fonte oficial), ranking/top de experiência, bosses boostados do dia.
2. **Evolução 2:** hunt finder e ferramentas de apoio à caça.
- Cada evolução é especificada e testada antes de ir ao ar (qualidade como prioridade).

### O que o Rubinot ganha

- **Vitrine e retenção:** um fansite ativo mantém a comunidade engajada e dá mais motivos para jogar.
- **Tráfego direcionado:** banner e CTAs levando ao site oficial e ao download.
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
