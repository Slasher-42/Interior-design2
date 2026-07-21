import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./InteriorDesignFeatures.css";

import heroImg from "../assets/images/showcase-1.jpg";
import stepShare from "../assets/images/room-living.jpg";
import stepAssess from "../assets/images/room-kitchen.jpg";
import stepDeliver from "../assets/images/room-bedroom.jpg";
import featInterior from "../assets/images/showcase-2.jpg";
import featExterior from "../assets/images/exterior-house.jpg";
import featFurniture from "../assets/images/showcase-3.jpg";
import featFinishes from "../assets/images/room-bath.jpg";
import client1 from "../assets/images/team-1.jpg";
import client2 from "../assets/images/team-2.jpg";
import client3 from "../assets/images/team-3.jpg";
import client4 from "../assets/images/team-4.jpg";

const STEP_IMAGES = [stepShare, stepAssess, stepDeliver];
const FEATURE_IMAGES = [featInterior, featExterior, featFurniture, featFinishes];
const TESTIMONIAL_IMAGES = [client1, client2, client3, client4];
const TESTIMONIAL_NAMES = ["Eric M.", "Aline U.", "Patrick H.", "Diane K."];

function Stars() {
  return (
    <div className="idf-stars" aria-label="5 / 5">
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export function InteriorDesignFeatures() {
  const { t } = useTranslation("marketing");

  const steps = t("featuresPage.steps.items", { returnObjects: true });
  const features = t("featuresPage.features.items", { returnObjects: true });
  const testimonials = t("featuresPage.testimonials.items", { returnObjects: true });
  const packages = t("featuresPage.packages.items", { returnObjects: true });
  const faqs = t("featuresPage.faq.items", { returnObjects: true });

  return (
    <main className="idf">
      {/* HERO */}
      <section className="idf-hero">
        <div className="idf-hero__text">
          <p className="idf-eyebrow">{t("featuresPage.hero.eyebrow")}</p>
          <h1 className="idf-hero__title">{t("featuresPage.hero.title")}</h1>
          <p className="idf-hero__lead">{t("featuresPage.hero.lead")}</p>
          <div className="idf-hero__actions">
            <Link to="/request" className="idf-btn idf-btn--solid">
              {t("featuresPage.hero.ctaPrimary")}
            </Link>
            <Link to="/portfolio" className="idf-btn">
              {t("featuresPage.hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="idf-hero__cluster" aria-hidden="true">
          <figure className="idf-hero__card idf-hero__card--main">
            <img src={heroImg} alt="" />
            <figcaption>{t("featuresPage.hero.cardMain")}</figcaption>
          </figure>
          <figure className="idf-hero__card idf-hero__card--left">
            <img src={stepShare} alt="" />
            <figcaption>{t("featuresPage.hero.cardLeft")}</figcaption>
          </figure>
          <figure className="idf-hero__card idf-hero__card--right">
            <img src={featExterior} alt="" />
            <figcaption>{t("featuresPage.hero.cardRight")}</figcaption>
          </figure>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="idf-proof">
        <p>{t("featuresPage.proof")}</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="idf-steps">
        <header className="idf-section-head">
          <span className="idf-kicker">{t("featuresPage.steps.kicker")}</span>
          <h2>{t("featuresPage.steps.title")}</h2>
          <p>{t("featuresPage.steps.sub")}</p>
        </header>
        <div className="idf-steps__grid">
          {steps.map((step, i) => (
            <article key={i} className="idf-step">
              <div className="idf-step__media">
                <img src={STEP_IMAGES[i]} alt="" />
                <span className="idf-step__n">{`0${i + 1}`}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <div className="idf-center">
          <Link to="/request" className="idf-btn idf-btn--solid">
            {t("featuresPage.steps.cta")}
          </Link>
        </div>
      </section>

      {/* FEATURE ROWS */}
      <section className="idf-features">
        <header className="idf-section-head">
          <span className="idf-kicker">{t("featuresPage.features.kicker")}</span>
          <h2>{t("featuresPage.features.title")}</h2>
        </header>
        {features.map((f, i) => (
          <article
            key={i}
            className={"idf-feature" + (i % 2 === 1 ? " idf-feature--reverse" : "")}
          >
            <div className="idf-feature__media">
              <img src={FEATURE_IMAGES[i]} alt={f.tag} />
            </div>
            <div className="idf-feature__text">
              <p className="idf-eyebrow">{f.tag}</p>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <Link to="/request" className="idf-link">
                {t("featuresPage.features.link")} →
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="idf-testimonials">
        <header className="idf-section-head">
          <span className="idf-kicker">{t("featuresPage.testimonials.kicker")}</span>
          <h2>{t("featuresPage.testimonials.title")}</h2>
        </header>
        <div className="idf-testimonials__grid">
          {testimonials.map((tst, i) => (
            <figure key={i} className="idf-tcard">
              <Stars />
              <blockquote>{tst.quote}</blockquote>
              <figcaption>
                <img src={TESTIMONIAL_IMAGES[i]} alt="" />
                <span>
                  <strong>{TESTIMONIAL_NAMES[i]}</strong>
                  <em>{tst.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="idf-packages">
        <header className="idf-section-head">
          <span className="idf-kicker">{t("featuresPage.packages.kicker")}</span>
          <h2>{t("featuresPage.packages.title")}</h2>
          <p>{t("featuresPage.packages.sub")}</p>
        </header>
        <div className="idf-packages__grid">
          {packages.map((p, i) => {
            const highlight = i === 1;
            return (
              <article
                key={i}
                className={"idf-package" + (highlight ? " idf-package--highlight" : "")}
              >
                {highlight && (
                  <span className="idf-package__badge">{t("featuresPage.packages.badge")}</span>
                )}
                <h3>{p.name}</h3>
                <p className="idf-package__tagline">{p.tagline}</p>
                <p className="idf-package__price">{t("featuresPage.packages.price")}</p>
                <ul>
                  {p.features.map((feat, j) => (
                    <li key={j}>{feat}</li>
                  ))}
                </ul>
                <Link
                  to="/request"
                  className={"idf-btn " + (highlight ? "idf-btn--solid" : "")}
                >
                  {t("featuresPage.packages.cta")}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="idf-faq">
        <header className="idf-section-head">
          <h2>{t("featuresPage.faq.title")}</h2>
        </header>
        <div className="idf-faq__list">
          {faqs.map((item, i) => (
            <details key={i} className="idf-faq__item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <div className="idf-center">
          <Link to="/contact" className="idf-btn idf-btn--solid">
            {t("featuresPage.faq.cta")}
          </Link>
        </div>
      </section>
    </main>
  );
}
