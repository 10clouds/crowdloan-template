![image](https://user-images.githubusercontent.com/34003/216074063-d84fa812-5ceb-44dc-96d9-161976cda631.png)

# Welcome to Parity template

This template enables you to quickly create a front-end landing page to easily showcase your project and make it encouraging for your future contributors.

## Tech stack

Core technologies Parity Template is based on are:

- [Astro](https://astro.build/) - a web framework for building static websites.
- [React](https://reactjs.org/) - a JavaScript library for building user interfaces.
- [TailwindCSS](https://tailwindcss.com/) - a CSS framework of utility classes.
- [Polkadot.js](https://polkadot.js.org/docs/) - a collection of tools for interacting with the Polkadot network.
- [Astro-i18next](https://astro-i18next.yassinedoghri.com/) - An astro integration of i18next + some utility components to help you translate website

## Project structure

Astrtos archtecture enables you to use a framework of your choice for writing components. We've opted for React but it can as easily be Svelte, Vue, Solid and more. Please refer to [Astro's documentation](https://docs.astro.build/en/concepts/why-astro/#easy-to-use) to learn more.

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│ └── favicon.svg
├── src/
│ ├── components/
│ │ └── Card.astro
│ ├── layouts/
│ │ └── Layout.astro
│ └── pages/
│ └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

All Astro/React/Vue/Svelte/Preact components are kept in `src/components/`.

Static assets, like images, can be placed in the `public/` directory.

## Template theming, customization and internationalization

You can adjust styles for your template any way you want but we recommend sticking with TailwindCSS and customizing eiter through modification of defauts in `./tailwind.config.cjs`, or simily changing utility classes used on the elements.

To configure the address for contributions go to `src/config/config.ts` and fill `targetAccountAddress`. There you can also change the minimum and target amount for contributions and the end date of your auction.

## Getting started

Clone this repository and then install dependencies with:

```
npm install
```

To run the development server and see the default template use:

```
npm run dev
```

## Build and deployment

To run the local build command use:

```
npm run build
```

This will locally build your site to the `./dist` folder.

Preview your build before deploying with:

```
npm run preview
```

As with any static website you can deploy your built site to a number of hosts like Netlify, GitHub Pages, Vercel and more. For a detailed instruction regarding deployment process, please refer to [the Astro docs](https://docs.astro.build/en/guides/deploy/).
