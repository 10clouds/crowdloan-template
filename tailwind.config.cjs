const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#F9FAFF',
        secondary: '#3B5EEA',
        hover: '#506FEC',
        disabled: '#8D9ACD',
        red: '#EA3B65',
        gray: {
          light: '#F1F1F1',
          DEFAULT: '#DBDBDB',
          dark: '#89888A',
        },
      },
      textColor: {
        base: { DEFAULT: '#131115;', light: '#CFCFCF' },
        primary: { DEFAULT: '#3B5EEA', light: '#8D9ACD' },
      },
      backgroundImage: {
        primary: '#F9FAFF',
        'timer-gradient':
          'linear-gradient(251.25deg, #436EE7 37.33%, #5043E7 87.85%);',
      },
      dropShadow: {
        primary: '0px 24px 70px rgba(59, 107, 181, 0.15)',
      },
    },
    fontFamily: {
      sans: ['Outfit', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
