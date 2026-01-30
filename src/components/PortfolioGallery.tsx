import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import type { PortfolioLocation } from "../types/photoPortfolio";

type PortfolioGalleryProps = {
  item: PortfolioLocation;
  onBack: () => void;
};

export const PortfolioGallery = ({ item, onBack }: PortfolioGalleryProps): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const photos = item.photos;
  const hasMultiple = photos.length > 1;
  const currentPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const goPrev = (): void => {
    if (selectedIndex === null || !hasMultiple) return;
    setSelectedIndex(selectedIndex <= 0 ? photos.length - 1 : selectedIndex - 1);
  };

  const goNext = (): void => {
    if (selectedIndex === null || !hasMultiple) return;
    setSelectedIndex(selectedIndex >= photos.length - 1 ? 0 : selectedIndex + 1);
  };

  const close = (): void => {
    (document.activeElement as HTMLElement | null)?.blur();
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        (document.activeElement as HTMLElement | null)?.blur();
        setSelectedIndex(null);
      } else if (e.key === "ArrowLeft" && photos.length > 1) {
        setSelectedIndex((i) =>
          i === null ? null : i <= 0 ? photos.length - 1 : i - 1
        );
      } else if (e.key === "ArrowRight" && photos.length > 1) {
        setSelectedIndex((i) =>
          i === null ? null : i >= photos.length - 1 ? 0 : i + 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, photos.length]);

  return (
    <div className="portfolio-gallery">
      <div className="portfolio-gallery__header">
        <button type="button" className="portfolio-gallery__back" onClick={onBack}>
          Back
        </button>
        <h2 className="portfolio-gallery__title">{item.location}</h2>
      </div>
      <div className="portfolio-gallery__grid">
        {photos.map((src, i) => (
          <button
            key={`${item.id}-${i}`}
            type="button"
            className="portfolio-gallery__photo-wrap"
            onClick={() => setSelectedIndex(i)}
            aria-label={`View ${item.location} photo ${i + 1} full size`}
          >
            <img
              className="portfolio-gallery__photo"
              src={src}
              alt={`${item.location} photo ${i + 1}`}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {currentPhoto !== null && (
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Full size image"
          onClick={close}
        >
          <button
            type="button"
            className="portfolio-lightbox__close"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                className="portfolio-lightbox__prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                className="portfolio-lightbox__next"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          <img
            className="portfolio-lightbox__img"
            src={currentPhoto}
            alt="Full size"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};