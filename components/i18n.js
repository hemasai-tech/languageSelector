import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import te from './locales/te.json';
import kn from './locales/kn.json';
import { findBestLanguageTag } from 'react-native-localize';

const resources = {
  en: {
    translation: en,
  },
  te: {
    translation: te,
  },
  kn: {
    translation: kn,
  },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const bestLanguage = findBestLanguageTag(Object.keys(resources));
    callback(bestLanguage?.languageTag || 'en');
  },
  init: () => { },
  cacheUserLanguage: () => { },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
