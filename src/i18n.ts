import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

const savedLanguage = localStorage.getItem("language") || "fr";

const initializeI18n = async () => {
  try {
    await i18n
      .use(HttpApi)
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
    console.log("i18n initialized:", i18n.isInitialized); // Should now show true
    console.log("Current language:", i18n.language); // Check current language
  } catch (error) {
    console.error("i18n initialization failed:", error);
  }
};

initializeI18n();

export default i18n;
