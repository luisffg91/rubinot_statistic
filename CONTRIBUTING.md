# Contribuindo — Rubibot Statistics

Guia de convenções do projeto. Vale para humanos e para o Claude Code.

## Fluxo de trabalho

1. Crie uma **feature branch** a partir da `main` (ver convenção de nomes abaixo).
2. Desenvolva; antes de abrir o PR, rode localmente o que o CI roda:
   ```bash
   npm run lint && npm run test:unit && npm run build && npm run test:e2e
   ```
3. Abra um **Pull Request** para a `main`.
4. O **CI** (GitHub Actions) roda automaticamente; o **Vercel** publica um **preview**.
5. **Merge só com o check `CI` verde** (branch protection). O merge na `main` dispara o deploy de produção.

> Exceção: o commit de bootstrap inicial foi direto na `main`. A partir dele, tudo passa por PR.

## Conventional Commits (obrigatório)

Toda mensagem de commit segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[escopo opcional]: <descrição no imperativo>

[corpo opcional]

[rodapé opcional]
```

**Tipos aceitos:**

| Tipo | Uso |
|------|-----|
| `feat` | nova funcionalidade (user-facing) |
| `fix` | correção de bug |
| `docs` | documentação apenas |
| `test` | adição/ajuste de testes |
| `refactor` | mudança de código sem alterar comportamento |
| `perf` | melhoria de performance |
| `style` | formatação/estilo (sem lógica) |
| `build` | build/dependências |
| `ci` | pipeline/CI |
| `chore` | tarefas de manutenção (organização, configs) |
| `revert` | reversão de um commit |

- **Escopo** (opcional): área afetada, ex.: `feat(home): ...`, `fix(worlds-mapper): ...`.
- **Breaking change**: use `!` após o tipo/escopo (`feat!: ...`) e/ou um rodapé `BREAKING CHANGE: ...`.
- Descrição no **imperativo** e em minúsculas (`adiciona`, não `Adicionado`).

**Exemplos:**

```
feat(character): adiciona busca de personagem na home
fix(online-counter): mantém último valor quando o refresh falha
docs: adiciona guia de CI/CD
test(worlds-mapper): cobre payload inválido
chore: organiza imagens de referência em docs/references
ci: adiciona workflow de testes no GitHub Actions
```

## Nomes de branch

Padrão: **`<tipo>/<descrição-curta-kebab>`**, usando os mesmos tipos do Conventional Commits.
Para trabalho ligado a uma feature do Spec Kit, inclua o número: **`<tipo>/<NNN>-<slug>`**.

**Exemplos:**

```
feat/003-character-search
fix/online-counter-stale
docs/repo-organization
ci/pipeline
chore/repo-organization
```

- `main`: branch protegida, sempre implantável.
- Nada de commits diretos na `main` (exceto o bootstrap inicial).

## Pull Requests

- Título do PR também no formato Conventional Commits (facilita squash-merge).
- Recomenda-se **Squash and merge** para manter a `main` com um histórico limpo de mensagens convencionais.
- O PR só mescla com o check **CI** verde.

## Spec Kit

Cada evolução é especificada antes de ser planejada e implementada:
`/speckit-specify → /speckit-clarify → /speckit-plan → /speckit-tasks → /speckit-analyze → /speckit-implement`.
Artefatos em `specs/<NNN-feature>/`. Ver `CLAUDE.md` e `.specify/memory/constitution.md`.
