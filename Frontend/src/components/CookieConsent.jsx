import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./CookieConsent.css";

const STORAGE_KEY = "sdg_cookie_consent";

export function CookieConsent() {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function persist(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore storage errors */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label={t("cookies.title")}>
      <div className="cookie-consent__inner">
        <div className="cookie-consent__text">
          <span className="cookie-consent__title">{t("cookies.title")}</span>
          <p className="cookie-consent__desc">{t("cookies.description")}</p>
        </div>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--ghost"
            onClick={() => persist("declined")}
          >
            {t("cookies.decline")}
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--solid"
            onClick={() => persist("accepted")}
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
