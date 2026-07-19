import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CaretDown, Check } from "@phosphor-icons/react";
import "./LanguageSwitcher.css";

// `flag` is the flag-icons country code (fi fi-xx). English uses the GB flag.
const LANGUAGES = [
  { code: "en", label: "EN", name: "English", flag: "gb" },
  { code: "fr", label: "FR", name: "Français", flag: "fr" },
  { code: "es", label: "ES", name: "Español", flag: "es" },
  { code: "de", label: "DE", name: "Deutsch", flag: "de" },
  { code: "it", label: "IT", name: "Italiano", flag: "it" },
  { code: "pt", label: "PT", name: "Português", flag: "pt" },
];

function resolveLanguage(lng) {
  const base = (lng || "en").split("-")[0].toLowerCase();
  return LANGUAGES.find((l) => l.code === base) || LANGUAGES[0];
}

export function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const current = resolveLanguage(i18n.language);

  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const selectLanguage = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className={`lang-switcher ${className}`} ref={rootRef}>
      <button
        type="button"
        className="lang-switcher__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <span className={`fi fi-${current.flag} lang-switcher__flag`} aria-hidden="true" />
        <span className="lang-switcher__code">{current.label}</span>
        <CaretDown size={12} weight="bold" className="lang-switcher__caret" aria-hidden="true" />
      </button>

      {open && (
        <ul className="lang-switcher__menu" role="listbox" aria-label="Language">
          {LANGUAGES.map((lang) => {
            const active = lang.code === current.code;
            return (
              <li key={lang.code} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`lang-switcher__item${active ? " is-active" : ""}`}
                  onClick={() => selectLanguage(lang.code)}
                >
                  <span className={`fi fi-${lang.flag} lang-switcher__flag`} aria-hidden="true" />
                  <span className="lang-switcher__name">{lang.name}</span>
                  {active && <Check size={14} weight="bold" className="lang-switcher__check" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
