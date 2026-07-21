import { Link } from "react-router-dom";
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

const STEPS = [
  {
    n: "01",
    title: "Share your space",
    body: "Upload photos of the room and tell us your budget, your style, and how you actually use the space. It takes a few minutes.",
    img: stepShare,
  },
  {
    n: "02",
    title: "Get an AI-assisted plan",
    body: "Our platform and designers turn your space into a costed, visual plan — layout, materials, and furniture, all in one place.",
    img: stepAssess,
  },
  {
    n: "03",
    title: "Approve, and we deliver",
    body: "Approve the direction and we manage the project through to install, coordinating your contractor so nothing gets lost.",
    img: stepDeliver,
  },
];

const FEATURES = [
  {
    tag: "Interior design",
    title: "The room you want — before you commit a franc",
    body: "Renovating is expensive to get wrong. Test layouts, palettes, and furniture on your actual room and see the finished result before any work begins.",
    img: featInterior,
  },
  {
    tag: "Exterior & outdoor",
    title: "Your exterior, reimagined",
    body: "Facades, gardens, and outdoor living spaces designed and visualised first — so you invest in the version you already know you love.",
    img: featExterior,
  },
  {
    tag: "Furniture & styling",
    title: "Swap what isn't working",
    body: "That sofa you regret? Gone. Replace a single piece — a rug, a fixture, a table — and see how the whole room changes around it.",
    img: featFurniture,
  },
  {
    tag: "Materials & finishes",
    title: "Test finishes before you buy",
    body: "Floors, tiles, and surfaces are the most expensive mistakes in any home. Preview every finish in your space so you only buy once.",
    img: featFinishes,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I showed the plan to my contractor and he built it exactly like that. No revisions, no surprises, no arguments about what I meant.",
    name: "Eric M.",
    role: "Homeowner, Kigali",
    img: client1,
  },
  {
    quote:
      "We were about to hire a designer for a fortune. Space Design Group gave us the whole layout costed up front — we knew what we were paying for.",
    name: "Aline U.",
    role: "Apartment renovation",
    img: client2,
  },
  {
    quote:
      "Seeing the room finished before we spent anything is what sold us. We changed the palette twice on screen instead of in real life.",
    name: "Patrick H.",
    role: "Single room refresh",
    img: client3,
  },
  {
    quote:
      "They fit out our office end to end — layout, lighting, furniture. One team, one plan, and it actually came in on schedule.",
    name: "Diane K.",
    role: "Commercial fit-out",
    img: client4,
  },
];

const PACKAGES = [
  {
    name: "Single Room Refresh",
    tagline: "One room, resolved in weeks.",
    features: [
      "Focused redesign of one room",
      "Layout, palette & furniture plan",
      "Visual concept before you buy",
      "Sourcing list you can act on",
    ],
    cta: "Request this",
    highlight: false,
  },
  {
    name: "Full Home Design",
    tagline: "Every room, one accountable team.",
    features: [
      "End-to-end design, all rooms",
      "Space planning & materials",
      "Furniture & styling managed",
      "Project managed to install",
      "One team, first sketch to final",
    ],
    cta: "Request this",
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Commercial Fit-Out",
    tagline: "Workplaces and hospitality spaces.",
    features: [
      "Layout, lighting & materials",
      "Furniture procurement",
      "Contractor coordination",
      "Built for offices, studios, retail",
    ],
    cta: "Request this",
    highlight: false,
  },
];

const FAQS = [
  {
    q: "What does Space Design Group actually do?",
    a: "We design interiors and exteriors and manage the project through to install. You share your space, we return a costed visual plan, and — if you approve — we deliver it.",
  },
  {
    q: "How does the process work?",
    a: "Submit your space with photos and preferences, receive an AI-assisted design assessment, then approve the plan. From there we coordinate the work to completion.",
  },
  {
    q: "What styles do you cover?",
    a: "From warm minimalism to classic and contemporary — the plan is built around your taste, your space, and your budget, not a fixed template.",
  },
  {
    q: "Can you redesign just one room?",
    a: "Yes. A Single Room Refresh focuses on one space — a living room, bedroom, or office — without the scope of a full-home project.",
  },
  {
    q: "Do you work with businesses?",
    a: "Yes. Our Commercial Fit-Out covers offices, studios, hospitality, and retail — layout, lighting, materials, and furniture procurement, coordinated with your contractor.",
  },
  {
    q: "What happens to my photos?",
    a: "Your photos are used only to prepare your design and assessment. They are tied to your account and are not sold or shared for anything else.",
  },
];

function Stars() {
  return (
    <div className="idf-stars" aria-label="5 out of 5 stars">
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export function InteriorDesignFeatures() {
  return (
    <main className="idf">
      {/* HERO */}
      <section className="idf-hero">
        <p className="idf-eyebrow">Interior &amp; exterior design</p>
        <h1 className="idf-hero__title">
          Your space, redesigned —<br />before you spend a franc.
        </h1>
        <p className="idf-hero__lead">
          Renovating is expensive to get wrong. Space Design Group shows you exactly how your
          room will look and what it will cost — before a single piece of furniture moves.
        </p>
        <div className="idf-hero__actions">
          <Link to="/request" className="idf-btn idf-btn--solid">Request a design</Link>
          <Link to="/portfolio" className="idf-btn">See our work</Link>
        </div>
        <div className="idf-hero__media">
          <img src={heroImg} alt="A finished interior designed by Space Design Group" />
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="idf-proof">
        <p>For homeowners and businesses who would rather see it than guess.</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="idf-steps">
        <header className="idf-section-head">
          <h2>How it works</h2>
          <p>Three steps from a photo of your room to a plan you can build.</p>
        </header>
        <div className="idf-steps__grid">
          {STEPS.map((step) => (
            <article key={step.n} className="idf-step">
              <div className="idf-step__media">
                <img src={step.img} alt="" />
                <span className="idf-step__n">{step.n}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <div className="idf-center">
          <Link to="/request" className="idf-btn idf-btn--solid">Start your request</Link>
        </div>
      </section>

      {/* FEATURE ROWS */}
      <section className="idf-features">
        <header className="idf-section-head">
          <h2>Every space. One team.</h2>
          <p>Whatever you are changing, you see it finished first.</p>
        </header>
        {FEATURES.map((f, i) => (
          <article
            key={f.tag}
            className={"idf-feature" + (i % 2 === 1 ? " idf-feature--reverse" : "")}
          >
            <div className="idf-feature__media">
              <img src={f.img} alt={f.tag} />
            </div>
            <div className="idf-feature__text">
              <p className="idf-eyebrow">{f.tag}</p>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <Link to="/request" className="idf-link">Design mine →</Link>
            </div>
          </article>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="idf-testimonials">
        <header className="idf-section-head">
          <h2>Real people. Real rooms.</h2>
          <p>They almost hired someone to guess for them.</p>
        </header>
        <div className="idf-testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="idf-tcard">
              <Stars />
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <img src={t.img} alt="" />
                <span>
                  <strong>{t.name}</strong>
                  <em>{t.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PACKAGES (was pricing) */}
      <section className="idf-packages">
        <header className="idf-section-head">
          <h2>Pick your package</h2>
          <p>Every project is quoted to your space and scope — no fixed menu, no surprises.</p>
        </header>
        <div className="idf-packages__grid">
          {PACKAGES.map((p) => (
            <article
              key={p.name}
              className={"idf-package" + (p.highlight ? " idf-package--highlight" : "")}
            >
              {p.badge && <span className="idf-package__badge">{p.badge}</span>}
              <h3>{p.name}</h3>
              <p className="idf-package__tagline">{p.tagline}</p>
              <p className="idf-package__price">Custom quote</p>
              <ul>
                {p.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
              <Link
                to="/request"
                className={"idf-btn " + (p.highlight ? "idf-btn--solid" : "")}
              >
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="idf-faq">
        <header className="idf-section-head">
          <h2>Frequently asked questions</h2>
        </header>
        <div className="idf-faq__list">
          {FAQS.map((item) => (
            <details key={item.q} className="idf-faq__item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <div className="idf-center">
          <Link to="/contact" className="idf-btn idf-btn--solid">Talk to us</Link>
        </div>
      </section>
    </main>
  );
}
