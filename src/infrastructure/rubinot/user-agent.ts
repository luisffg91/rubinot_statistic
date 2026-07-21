// User-Agent identificável enviado a todas as chamadas ao Rubinot.
// A API fica atrás do Cloudflare e bloqueia fetch server-side anônimo; este UA dá à staff do
// Rubinot um alvo claro para allowlist (ver docs/data-sources.md). Sobrescrevível por env.
export const RUBINOT_USER_AGENT =
  process.env.RUBINOT_USER_AGENT ?? 'RubibotStatistics/1.0 (+https://rubinot-statistic.vercel.app)';
