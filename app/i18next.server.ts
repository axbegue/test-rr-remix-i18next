import { RemixI18Next } from 'remix-i18next/server';
import i18nOptions from '~/i18n'; // your i18n configuration file
import { resolve } from 'node:path';
// import FsBackend from 'i18next-fs-backend';

let i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18nOptions.supportedLngs,
    fallbackLanguage: i18nOptions.fallbackLng,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18nOptions,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  // The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin for loading translations from the file system
  // Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
  plugins: [(await import('i18next-fs-backend')).default],
  // plugins: [FsBackend],
});

export default i18next;
