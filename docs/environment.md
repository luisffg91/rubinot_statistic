# Variáveis de ambiente

Todas são opcionais em desenvolvimento; o app degrada de forma graciosa quando ausentes.
Em produção, configure no painel do Vercel (Project → Settings → Environment Variables).

| Variável | Usada por | Descrição |
|----------|-----------|-----------|
| `RUBINOT_WORLDS_URL` | infra/worlds | Sobrescreve a URL do `/api/worlds` (usada nos testes E2E para apontar para host inalcançável). Default: API pública do Rubinot. |
| `RUBINOT_CHARACTER_URL` | infra/character | Sobrescreve a base de `/api/characters/search`. Default: API pública do Rubinot. |
| `RUBINOT_USER_AGENT` | infra | User-Agent enviado ao Rubinot (alvo de allowlist). Default: `RubibotStatistics/1.0 (+URL)`. |
| `WEB3FORMS_ACCESS_KEY` | infra/contact | Chave do [Web3Forms](https://web3forms.com) para o formulário de contato. **Sem ela, o contato responde "indisponível".** |

## Ativar o formulário de contato

1. Criar o e-mail da equipe (destino das mensagens).
2. Criar uma conta gratuita no Web3Forms e apontar o destino para esse e-mail.
3. Copiar a **Access Key** e definir `WEB3FORMS_ACCESS_KEY` no Vercel (e localmente em `.env.local`).

> O provedor está isolado atrás do port `ContactSender` — trocar para outro (ex.: Resend) exige apenas um
> novo adaptador na infraestrutura, sem mexer no domínio/UI.
