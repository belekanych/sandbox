import i18next from "i18next";
import i18nextBrowserLanguagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  .use(initReactI18next)
  .use(i18nextBrowserLanguagedetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          actions: {
            login: "Login",
          },
        },
      },
      uk: {
        translation: {
          actions: {
            login: "Увійти",
          },
        },
      },
    },
  });
