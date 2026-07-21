/**
 * Banner/CTA que leva ao site oficial do Rubinot (abre em nova aba).
 * Reforça que este é um fansite que valoriza o servidor — e convida o visitante a jogar.
 */
export function RubinotBanner() {
  return (
    <a
      className="rubinot-banner"
      href="https://rubinot.com.br"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="rubinot-banner__logo">
        {/* Logo oficial do Rubinot num chip claro (link promocional ao site oficial). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rubinot-logo.png" alt="Rubinot" />
      </span>
      <span className="rubinot-banner__text">
        <strong>Jogue no Rubinot</strong>
        <span>18 mundos · economia ativa · conteúdo sempre atualizado</span>
      </span>
      <span className="rubinot-banner__cta">Acessar o site oficial →</span>
    </a>
  );
}
