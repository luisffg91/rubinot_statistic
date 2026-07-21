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
      <span className="rubinot-banner__mark" aria-hidden="true">
        R
      </span>
      <span className="rubinot-banner__text">
        <strong>Jogue no Rubinot</strong>
        <span>18 mundos · economia ativa · conteúdo sempre atualizado</span>
      </span>
      <span className="rubinot-banner__cta">Acessar o site oficial →</span>
    </a>
  );
}
