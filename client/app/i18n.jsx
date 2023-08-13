import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

import en from 'assets/languages/en.json';
import vi from 'assets/languages/vi.json';
import moment from 'moment';
import 'moment/locale/vi';

// const currentLocale = Intl.DateTimeFormat().resolvedOptions().locale;
// console.log({ currentLocale });

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(RNLanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(
    {
      debug: false,
      compatibilityJSON: 'v3',
      supportedLngs: ['en', 'vi'],
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      // lng: 'cimode',
      // lng: 'vi',
      fallbackLng: 'vi',
      resources: {
        en: { translation: en },
        vi: { translation: vi },
      },
      react: {
        useSuspense: false,
      },
      returnObjects: true,
    },
    () => {
      //   if (i18n && i18n.isInitialized) {
      //     moment.locale(i18n.language ?? 'vi');
      //   }
    },
  );

export default i18n;
