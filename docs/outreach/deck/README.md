# Deck da proposta (anexo)

Apresentação para anexar ao e-mail da proposta ao Rubinot.

- **Fonte:** [`deck.html`](deck.html) — 9 slides 16:9, com a identidade visual do site (paleta, fontes
  Cinzel/Inter e o logo). É o "código" do deck; edite aqui.
- **Entregável:** `../rubinot-statistics-proposta.pdf` — gerado **localmente** a partir do `deck.html`
  (não versionado; está no `.gitignore`). Regenere quando editar o deck (ver abaixo).
- **Assets:** `assets/` — screenshots reais do site (capturados da versão em produção) e o QR code
  (`qr.svg`, gerado com `npx qrcode -t svg -o assets/qr.svg "https://rubinot-statistic.vercel.app/"`).
  Para atualizar as telas, recapture com o site rodando (`next start`).

> **WhatsApp (privacidade):** o `deck.html` **público** mostra `WhatsApp: sob consulta`. O número real fica
> em `.env.local` (`WHATSAPP=...`, gitignored) e é injetado **apenas no PDF local** durante o render (substitui
> `sob consulta`). Assim o telefone não vai para o repositório público. No fluxo do navegador (Opção A), edite
> o número localmente antes de imprimir, se quiser exibi-lo.

## Como regenerar o PDF após editar o `deck.html`

**Opção A — navegador (sem ferramentas):**

1. Abra `deck.html` no Chrome.
2. `Imprimir` → Destino **Salvar como PDF**, layout **Paisagem**, margens **Nenhuma**,
   marque **Gráficos de plano de fundo**.
3. Salve como `rubinot-statistics-proposta.pdf`.

**Opção B — Playwright (reproduz o export automático):**

```js
// node deck-build.mjs  (rode da raiz do projeto; Playwright já é devDependency)
import { chromium } from '@playwright/test';
import { pathToFileURL } from 'url';
import { readFileSync, writeFileSync, rmSync } from 'fs';

// injeta o WhatsApp real (do .env.local) só no PDF local
const wa = (readFileSync('.env.local', 'utf8').match(/^WHATSAPP=(.+)$/m) || [])[1]?.trim();
const dir = process.cwd() + '/docs/outreach/deck';
let html = readFileSync(dir + '/deck.html', 'utf8');
if (wa) html = html.replace('<span class="wa">sob consulta</span>', `<span class="wa">${wa}</span>`);
const tmp = dir + '/.render.tmp.html';
writeFileSync(tmp, html);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1300);
await page.emulateMedia({ media: 'screen' });
await page.pdf({
  path: 'docs/outreach/rubinot-statistics-proposta.pdf',
  width: '1280px',
  height: '720px',
  printBackground: true,
});
await browser.close();
rmSync(tmp);
```

> As fontes (Cinzel/Inter) são carregadas do Google Fonts no momento do render — precisa de internet.
