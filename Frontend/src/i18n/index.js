import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import enMarketing from "./locales/en/marketing.json";
import enAuth from "./locales/en/auth.json";
import enPortal from "./locales/en/portal.json";
import enStaff from "./locales/en/staff.json";

import frCommon from "./locales/fr/common.json";
import frMarketing from "./locales/fr/marketing.json";
import frAuth from "./locales/fr/auth.json";
import frPortal from "./locales/fr/portal.json";
import frStaff from "./locales/fr/staff.json";

import esCommon from "./locales/es/common.json";
import esMarketing from "./locales/es/marketing.json";
import esAuth from "./locales/es/auth.json";
import esPortal from "./locales/es/portal.json";
import esStaff from "./locales/es/staff.json";

import deCommon from "./locales/de/common.json";
import deMarketing from "./locales/de/marketing.json";
import deAuth from "./locales/de/auth.json";
import dePortal from "./locales/de/portal.json";
import deStaff from "./locales/de/staff.json";

import itCommon from "./locales/it/common.json";
import itMarketing from "./locales/it/marketing.json";
import itAuth from "./locales/it/auth.json";
import itPortal from "./locales/it/portal.json";
import itStaff from "./locales/it/staff.json";

import ptCommon from "./locales/pt/common.json";
import ptMarketing from "./locales/pt/marketing.json";
import ptAuth from "./locales/pt/auth.json";
import ptPortal from "./locales/pt/portal.json";
import ptStaff from "./locales/pt/staff.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        marketing: enMarketing,
        auth: enAuth,
        portal: enPortal,
        staff: enStaff,
      },
      fr: {
        common: frCommon,
        marketing: frMarketing,
        auth: frAuth,
        portal: frPortal,
        staff: frStaff,
      },
      es: {
        common: esCommon,
        marketing: esMarketing,
        auth: esAuth,
        portal: esPortal,
        staff: esStaff,
      },
      de: {
        common: deCommon,
        marketing: deMarketing,
        auth: deAuth,
        portal: dePortal,
        staff: deStaff,
      },
      it: {
        common: itCommon,
        marketing: itMarketing,
        auth: itAuth,
        portal: itPortal,
        staff: itStaff,
      },
      pt: {
        common: ptCommon,
        marketing: ptMarketing,
        auth: ptAuth,
        portal: ptPortal,
        staff: ptStaff,
      },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "fr", "es", "de", "it", "pt"],
    ns: ["common", "marketing", "auth", "portal", "staff"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "sdg_language",
    },
  });

export default i18n;
