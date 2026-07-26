import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import en from './en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // react already escapes values
    },
  });

export default i18n;
