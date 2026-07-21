# Variáveis de ambiente

Todas são opcionais em desenvolvimento; o app degrada de forma graciosa quando ausentes.
Em produção, configure no painel do Vercel (Project → Settings → Environment Variables).

| Variável | Usada por | Descrição |
|----------|-----------|-----------|
| `RUBINOT_WORLDS_URL` | infra/worlds | Sobrescreve a URL do `/api/worlds` (usada nos testes E2E para apontar para host inalcançável). Default: API pública do Rubinot. |
| `RUBINOT_CHARACTER_URL` | infra/character | Sobrescreve a base de `/api/characters/search`. Default: API pública do Rubinot. |
| `RUBINOT_USER_AGENT` | infra | User-Agent enviado ao Rubinot (alvo de allowlist). Default: `RubibotStatistics/1.0 (+URL)`. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | UI/contato | Access key do [Web3Forms](https://web3forms.com) para o formulário de contato. **Client-side** (prefixo `NEXT_PUBLIC_`), pois o plano gratuito do Web3Forms só aceita envio pelo navegador. **Sem ela, o contato responde "indisponível".** |

## Ativar o formulário de contato

1. Criar o e-mail da equipe (destino das mensagens).
2. Criar uma conta gratuita no Web3Forms e apontar o destino para esse e-mail.
3. Copiar a **Access Key** e definir `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` no Vercel (e localmente em `.env.local`).

> **Por que client-side?** O plano gratuito do Web3Forms **bloqueia envio server-side** (responde `403`
> "Use our API in client side ... Pro plan is required"). Por isso o formulário envia direto do navegador
> ao Web3Forms, e a key usa `NEXT_PUBLIC_` (é **pública por design** nesse serviço). Para reduzir spam,
> ative no painel do Web3Forms a **allowlist de domínio** (`rubinot-statistic.vercel.app`) e/ou **hCaptcha**.
> Um envio server-side (com a key secreta) exigiria o plano Pro ou trocar para um provedor como o Resend.
