# Versionamento e Releases

## Política

- **SemVer** (`MAJOR.MINOR.PATCH`). Enquanto pré-1.0 (`0.x`), tratamos: **MINOR** = novas features,
  **PATCH** = correções/ajustes. O 1.0.0 marca o primeiro release "estável" (ex.: com dados reais liberados).
- **Conventional Commits** alimentam o CHANGELOG: `feat` → *Adicionado*, `fix` → *Corrigido*,
  `perf`/`refactor` conforme impacto. Mudanças notáveis entram primeiro em "Não lançado".
- A versão fica em `package.json` e o histórico em `CHANGELOG.md`.

## Como cortar um release

1. Mover as entradas de **"Não lançado"** para uma nova seção `[X.Y.Z] - AAAA-MM-DD` no `CHANGELOG.md`.
2. Atualizar a versão do pacote (sem criar tag automática):
   ```bash
   npm version X.Y.Z --no-git-tag-version
   ```
3. Abrir PR `chore(release): vX.Y.Z` → **CI verde** → merge na `main`.
4. Criar a tag e a release na `main` (após o merge):
   ```bash
   git switch main && git pull --ff-only
   git tag -a vX.Y.Z -m "vX.Y.Z"
   git push origin vX.Y.Z
   gh release create vX.Y.Z --title "vX.Y.Z" --notes "Ver CHANGELOG.md"
   ```

O deploy de produção (Vercel) acontece no merge para a `main`; a tag/release serve de marco versionado.
