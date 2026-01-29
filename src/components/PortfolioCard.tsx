import type { ReactElement } from "react";
import type { PortfolioLocation } from "../types/photoPortfolio";

type PortfolioCardProps = {
  item: PortfolioLocation;
  onSelect: (id: string) => void;
};

export const PortfolioCard = ({ item, onSelect }: PortfolioCardProps): ReactElement => (
  <button
    type="button"
    className="portfolio-card"
    onClick={() => onSelect(item.id)}
    aria-label={`View photos from ${item.location}`}
  >
    <div className="portfolio-card__image">
      <img
        src={item.coverImage}
        alt=""
        loading="lazy"
        decoding="async"
        className="portfolio-card__img"
      />
    </div>
    <span className="portfolio-card__location">{item.location}</span>
  </button>
);