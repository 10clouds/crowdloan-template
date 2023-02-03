import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import astroI18next from 'astro-i18next';
import { SITE } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    astroI18next(),
  ],
});
