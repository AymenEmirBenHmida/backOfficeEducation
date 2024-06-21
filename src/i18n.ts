import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "fr",
  debug: true,
  backend: {
    loadPath: "/locales/{{lng}}/translation.json",
  },
  supportedLngs: ["en", "fr", "ar"],
  react: {
    useSuspense: false,
  },
});