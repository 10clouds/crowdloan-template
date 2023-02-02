import type { AstroI18nextConfig } from 'astro-i18next';

// https://github.com/yassinedoghri/astro-i18next#readme - docs
const config: AstroI18nextConfig = {
  defaultLocale: 'en',
  locales: ['en'],
  load: ['server', 'client'],
  i18nextServer: {
    debug: false,
  },
  i18nextClient: {
    debug: false,
  },
  i18nextServerPlugins: {
    '{initReactI18next}': 'react-i18next',
  },
  i18nextClientPlugins: {
    '{initReactI18next}': 'react-i18next',
  },
};

export default config;
