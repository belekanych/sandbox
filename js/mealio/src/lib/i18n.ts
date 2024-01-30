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
          errors: {
            auth: {
              failed: "The provided email or password are incorrect.",
            },
          },
          labels: {
            amountLabel: "{{amount, number}} {{unit}}",
            units: {
              g: "g",
              kg: "kg",
              ml: "ml",
              l: "l",
              pcs: "piece",
              pack: "pack",
            },
          },
        },
      },
      uk: {
        translation: {
          actions: {
            login: "Увійти",
          },
          errors: {
            auth: {
              failed: "Ел. пошта або пароль невірні.",
            },
          },
          labels: {
            amountLabel: "{{amount, number}} {{unit}}",
            units: {
              g: "г",
              kg: "кг",
              ml: "мл",
              l: "л",
              pcs: "шт",
              pack: "уп",
            },
          },
        },
      },
    },
  });
