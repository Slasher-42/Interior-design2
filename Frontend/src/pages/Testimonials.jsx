import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import "./Testimonials.css";

const TESTIMONIAL_KEYS = ["0", "1", "2", "3"];
// Number of placeholder "trusted by" logo slots. Replace these with real
// client logo images in src/assets/ when available — the markup is ready.
const LOGO_SLOTS = Array.from({ length: 8 });

function initialsOf(text) {
  if (!text) return "SD";
  return text
    .replace(/^[—-]\s*/, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const { t } = useTranslation("marketing");
  const [index, setIndex] = useState(0);
  const total = TESTIMONIAL_KEYS.length;

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  const key = TESTIMONIAL_KEYS[index];
  const quote = t(`testimonialsPage.items.${key}.quote`);
  const attribution = t(`testimonialsPage.items.${key}.attribution`);

  return (
    <section className="testimonials-page">
      <div className="container">
        <header className="testimonials-page__head reveal">
          <span className="testimonials-page__bar" aria-hidden="true" />
          <p className="eyebrow">{t("testimonialsPage.eyebrow")}</p>
          <h1 className="testimonials-page__heading">
            {t("testimonialsPage.heading")}
          </h1>
        </header>

        <div className="testimonials-page__stage reveal">
          <figure className="testimonials-page__card" key={key}>
            <div className="testimonials-page__avatar" aria-hidden="true">
              {initialsOf(attribution)}
            </div>
            <div className="testimonials-page__body">
              <span className="testimonials-page__mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="testimonials-page__quote">
                {quote}
              </blockquote>
              <span className="testimonials-page__rule" aria-hidden="true" />
              <figcaption className="testimonials-page__attribution">
                {attribution}
              </figcaption>
            </div>
          </figure>

          <div className="testimonials-page__controls">
            <button
              type="button"
              className="testimonials-page__nav"
              onClick={() => go(-1)}
              aria-label={t("testimonialsPage.previous")}
            >
              <CaretLeft weight="bold" />
            </button>
            <span className="testimonials-page__counter">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              className="testimonials-page__nav"
              onClick={() => go(1)}
              aria-label={t("testimonialsPage.next")}
            >
              <CaretRight weight="bold" />
            </button>
          </div>
        </div>

        <div className="testimonials-page__trusted reveal">
          <p className="testimonials-page__trusted-title">
            {t("testimonialsPage.trustedBy")}
          </p>
          <div className="testimonials-page__logos">
            {LOGO_SLOTS.map((_, i) => (
              <div key={i} className="testimonials-page__logo" aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
