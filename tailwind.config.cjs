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
        error: '#EA3B65',
      },
      textColor: {
        base: { DEFAULT: '#131115;', light: '#CFCFCF' },
        primary: { DEFAULT: '#3B5EEA', light: '#8D9ACD' },
      },
      backgroundImage: {
        primary: '#F9FAFF',
        'timer-gradient':
          'linear-gradient(251.25deg, #436EE7 37.33%, #5043E7 87.85%);',
        'vector-1': 'url(/src/assets/backgrounds/Vector_1.svg)',
        'vector-2':
          'url(/src/assets/backgrounds/Topology-1.svg), linear-gradient(211deg, #436ee7, #5043e7)',
      },
      backgroundColor: {
        base: { DEFAULT: '#3B5EEA', light: '#506FEC' },
        gray: '#F5F5F5',
        cream: '#F9FAFF',
        secondary: '#F6F7FE',
      },
      dropShadow: {
        primary: '0px 24px 70px rgba(59, 107, 181, 0.15)',
        'primary-hover': '0px 24px 70px rgba(59, 107, 181, 0.35)',
        'primary-small': '0px 3px 20px rgba(88, 102, 234, 0.4)',
        'primary-small-light': '0px 3px 40px rgba(88, 102, 234, 0.2)',
      },
    },
  },
  plugins: [],
};
