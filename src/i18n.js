import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from 'translations';

const resources = {
  en: {
    translation: translations.en
  },
  vi: {
    translation: translations.vi
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
