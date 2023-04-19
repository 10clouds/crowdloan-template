![image](https://user-images.githubusercontent.com/34003/216074063-d84fa812-5ceb-44dc-96d9-161976cda631.png)

# Welcome to the Crowdloan Template

This template enables you to quickly create a front-end landing page to easily showcase your project and encourage your future contributors to donate.

## Tech stack

Core technologies Crowdloan Template is based on are:

- [Astro](https://astro.build/) - a web framework for building static websites.
- [React](https://reactjs.org/) - a JavaScript library for building user interfaces.
- [TailwindCSS](https://tailwindcss.com/) - a CSS framework of utility classes.
- [Polkadot.js](https://polkadot.js.org/docs/) - a collection of tools for interacting with the Polkadot network.
- [Astro-i18next](https://astro-i18next.yassinedoghri.com/) - An Astro integration of i18next + some utility components to help you translate website

## Project structure

Astros architecture enables you to use a framework of your choice for writing components. We've opted for React but it can as easily be Svelte, Vue, Solid and more. Please refer to [Astro's documentation](https://docs.astro.build/en/concepts/why-astro/#easy-to-use) to learn more.

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

You can adjust styles for your template any way you want but we recommend sticking with TailwindCSS and customizing either through modifying the defaults in `./tailwind.config.cjs`, or by simply changing utility classes used on the elements.

To configure the address for contributions go to `src/config/config.ts` and fill `targetAccountAddress`. There you can also change the minimum and target amount for contributions and the end date of your auction.

## Polkadotjs API

The project is set up to work with the test network connected using [Polkadot.js](https://polkadot.js.org/docs/). By default, the `westend` test network on the development server is used. After building on production mode, the live network is used. If you would like to change the connection address please refer to `src/features/Contribution/api/api.ts`.

## External API

We are also displaying the latest contributors information using [subscan - transfers endpoint](https://support.subscan.io/#transfers) - on the test network it's free to use, to get live network data get a free API key that includes higher quotas or start your trial with other available plans at [plans info](https://pro.subscan.io/). To adjust endpoint please refer to `apiScanUrl` located in `src/config/config.ts`

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

## Troubleshooting

In case of unexpected errors during the payment process, the first step should always be updating the polkadot browser extension and libraries included in the `package.json` file.

## License

Project is [MIT](./LICENSE)
