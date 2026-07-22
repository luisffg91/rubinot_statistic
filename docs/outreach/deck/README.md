# Deck da proposta (anexo)

Apresentação para anexar ao e-mail da proposta ao Rubinot.

- **Fonte:** [`deck.html`](deck.html) — 9 slides 16:9, com a identidade visual do site (paleta, fontes
  Cinzel/Inter e o logo). É o "código" do deck; edite aqui.
- **Entregável:** `../rubinot-statistics-proposta.pdf` — gerado **localmente** a partir do `deck.html`
  (não versionado; está no `.gitignore`). Regenere quando editar o deck (ver abaixo).
- **Assets:** `assets/` — screenshots reais do site (capturados da versão em produção) e o QR code
  (`qr.svg`, gerado com `npx qrcode -t svg -o assets/qr.svg "https://rubinot-statistic.vercel.app/"`).
  Para atualizar as telas, recapture com o site rodando (`next start`).

## Como regenerar o PDF após editar o `deck.html`

**Opção A — navegador (sem ferramentas):**

1. Abra `deck.html` no Chrome.
2. `Imprimir` → Destino **Salvar como PDF**, layout **Paisagem**, margens **Nenhuma**,
   marque **Gráficos de plano de fundo**.
3. Salve como `rubinot-statistics-proposta.pdf`.

**Opção B — Playwright (reproduz o export automático):**

```js
// node deck-build.mjs  (Playwright já é devDependency do projeto)
import { chromium } from '@playwright/test';
import { pathToFileURL } from 'url';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(process.cwd() + '/docs/outreach/deck/deck.html').href, {
  waitUntil: 'networkidle',
});
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
await page.emulateMedia({ media: 'screen' });
await page.pdf({
  path: 'docs/outreach/rubinot-statistics-proposta.pdf',
  width: '1280px',
  height: '720px',
  printBackground: true,
});
await browser.close();
```

> As fontes (Cinzel/Inter) são carregadas do Google Fonts no momento do render — precisa de internet.
