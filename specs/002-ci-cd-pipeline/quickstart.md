# Quickstart — Validar o CI/CD (002)

## Pré-requisitos

- Workflow `.github/workflows/ci.yml` presente na `main` (baseline/bootstrap).
- M1 (Vercel conectado) e M2 (branch protection) concluídos — ver `contracts/manual-setup.md`.

## Validar o CI (US1)

1. Criar uma feature branch e abrir um PR para a `main`.
2. Observar o check **CI** rodar no PR: install → lint → unit → build → e2e.
3. **Caso verde**: o merge é liberado.
4. **Teste negativo**: introduzir de propósito um teste que falha, dar push e confirmar que o check fica
   vermelho e o merge é **bloqueado** (SC-002). Reverter em seguida.

## Validar o CD (US2)

5. No PR aberto, abrir o **link de preview** gerado pelo Vercel e conferir a mudança (SC-003).
6. Mergear o PR (com CI verde) e confirmar que a **URL de produção** reflete o último commit (SC-004).

## Localmente (antes do PR)

Rodar o mesmo que o CI roda, para evitar surpresas:

```bash
npm ci
npm run lint
npm run test:unit
npm run build
npm run test:e2e
```

## Definition of Done (002)

- [ ] `ci.yml` na main, rodando em PRs e pushes.
- [ ] PR de teste: CI verde libera merge; CI vermelho bloqueia (SC-001/SC-002).
- [ ] Preview por PR e produção ao merge funcionando (SC-003/SC-004) — depende de M1.
- [ ] Branch protection ativa (M2).
- [ ] `docs/ci-cd.md` documenta fluxo + passos manuais (FR-010).
