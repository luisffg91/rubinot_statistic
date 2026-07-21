import type { BoostedDto } from '@/app/_lib/boss-dto';

function BoostedCard({
  label,
  name,
  imageUrl,
  testId,
}: {
  label: string;
  name: string;
  imageUrl: string | null;
  testId: string;
}) {
  return (
    <div className="data-block boosted-card">
      <h3 className="boosted-card__label">{label}</h3>
      <div className="boosted-card__body">
        {imageUrl && (
          // Sprite hotlinkado da API pública (GIF animado); não é otimizado pelo next/image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="boosted-card__img"
            src={imageUrl}
            alt={name}
            width={64}
            height={64}
            loading="lazy"
          />
        )}
        <span className="boosted-card__name" data-testid={testId}>
          {name}
        </span>
      </div>
    </div>
  );
}

/** Cards do boosted do dia (boss + criatura) com imagem quando disponível. */
export function BoostedCards({ boosted }: { boosted: BoostedDto }) {
  return (
    <div className="grid boosted-grid">
      <BoostedCard
        label="Boss do dia"
        name={boosted.boss.name}
        imageUrl={boosted.boss.imageUrl}
        testId="boss"
      />
      <BoostedCard
        label="Criatura do dia"
        name={boosted.creature.name}
        imageUrl={boosted.creature.imageUrl}
        testId="creature"
      />
    </div>
  );
}
