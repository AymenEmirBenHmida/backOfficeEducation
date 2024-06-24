import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

const savedLanguage = localStorage.getItem("language") || "fr";
i18n
  .use(HttpApi) // Use HTTP backend for loading translations
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    supportedLngs: ["en", "fr", "ar"],
    lng: savedLanguage,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
