# Data Model — CI/CD (002)

Não há modelo de dados de aplicação. Abaixo, as **entidades de processo** que o fluxo manipula.

## Entidades de processo

### Pipeline de CI

| Campo | Descrição |
|---|---|
| gatilho | `pull_request` (base main) ou `push` (main) |
| etapas | install → lint → test:unit → build → e2e |
| resultado | `success` \| `failure` (agregado) |
| check | status reportado no PR (nome: `CI`) |

### Deploy de Preview

| Campo | Descrição |
|---|---|
| origem | um pull request |
| ciclo de vida | efêmero (por PR/commit) |
| url | link de preview navegável |

### Deploy de Produção

| Campo | Descrição |
|---|---|
| origem | commit na main (após merge) |
| ciclo de vida | estável (última main) |
| url | URL de produção fixa |

### Regra de Proteção de Branch

| Campo | Descrição |
|---|---|
| alvo | branch `main` |
| condição | check `CI` aprovado (verde) |
| efeito | bloqueia merge sem CI verde (FR-004) |

## Transições de estado (fluxo)

```text
feature branch → PR aberto
   → CI roda (install/lint/unit/build/e2e)
   → Vercel cria preview
   → CI verde + revisão → merge na main (bloqueado se CI vermelho)
   → Vercel publica produção
```

## Regras

- **RG-CI-1**: uma etapa que falha reprova o pipeline inteiro (sem "continue-on-error").
- **RG-CI-2**: o E2E não depende de rede externa (FR-005).
- **RG-CI-3**: o CI não usa segredos de deploy (FR-008).
