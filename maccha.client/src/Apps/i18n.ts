import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
        },
        ja: {
            translation: {
                "Lazy Page routing": "遅延ロードページです"
            }
        },
    },
    lng: "ja",
    fallbackLng: "ja",
    interpolation: { escapeValue: false },
});