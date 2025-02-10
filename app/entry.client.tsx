import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

import i18nOptions from './i18n';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { getInitialNamespaces } from 'remix-i18next/client';

// i18next
//   .use(initReactI18next) // Tell i18next to use the react-i18next plugin
//   .use(LanguageDetector) // Setup a client-side language detector
//   .use(HttpBackend) // Setup your backend
//   .init({
//     ...i18n, // spread the configuration
//     // This function detects the namespaces your routes rendered while SSR use
//     ns: getInitialNamespaces(),
//     backend: { loadPath: '/locales/{{lng}}.json' },
//     detection: {
//       // Here only enable htmlTag detection, we'll detect the language only
//       // server-side with remix-i18next, by using the `<html lang>` attribute
//       // we can communicate to the client the language detected server-side
//       order: ['htmlTag'],
//       // Because we only use htmlTag, there's no reason to cache the language
//       // on the browser, so we disable it
//       caches: [],
//     },
//   });

// startTransition(() => {
//   hydrateRoot(
//     document,
//     <I18nextProvider i18n={i18next}>
//       <StrictMode>
//         <HydratedRouter />
//       </StrictMode>
//     </I18nextProvider>,
//   );
// });

async function hydrate() {
  await i18next
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .use(LanguageDetector) // Setup a client-side language detector
    .use(HttpBackend) // Setup your backend
    .init({
      ...i18nOptions, // spread the configuration
      // This function detects the namespaces your routes rendered while SSR use
      ns: getInitialNamespaces(),
      backend: { loadPath: '/locales/{{lng}}.json' },
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ['htmlTag'],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: [],
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

if (window.requestIdleCallback) {
  console.log('==== 111 ====');
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  console.log('==== 222 ====');
  window.setTimeout(hydrate, 1);
}

// // initialize i18next using initReactI18next and configuring it
// if (!i18next.isInitialized) {
//   // prevent i18next to be initialized multiple times
//   i18next
//     .use(initReactI18next) // Tell i18next to use the react-i18next plugin
//     .use(LanguageDetector) // Setup a client-side language detector
//     .use(HttpBackend) // Setup your backend
//     .init({
//       ...i18nOptions,
//       backend: { loadPath: '/locales/{{lng}}.json' },
//       // This function detects the namespaces your routes rendered while SSR use
//       // and pass them here to load the translations
//       ns: getInitialNamespaces(),
//       detection: {
//         // Here only enable htmlTag detection, we'll detect the language only
//         // server-side with remix-i18next, by using the `<html lang>` attribute
//         // we can communicate to the client the language detected server-side
//         order: ['htmlTag'],
//         // Because we only use htmlTag, there's no reason to cache the language
//         // on the browser, so we disable it
//         caches: [],
//       },
//     })
//     .then(() => {
//       // then hydrate your app wrapped in the I18nextProvider
//       console.log('==== 111 pp ====');

//       return startTransition(() => {
//         hydrateRoot(
//           document,
//           <I18nextProvider i18n={i18next}>
//             <StrictMode>
//               <HydratedRouter />
//             </StrictMode>
//           </I18nextProvider>,
//         );
//       });
//     });
// }
