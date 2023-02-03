const CONFIG = {
  // SEO
  name: 'example',
  origin: 'https://example.com',
  basePathname: '/',
  trailingSlash: false,

  title: 'Please add here a title',
  description: '🚀  Please add here a description',

  navLinks: [
    // each title is translation key that is located in public/locales/en/translation.json
    { title: 'navigation.about', url: '#about' },
    { title: 'navigation.rewards', url: '#rewards' },
    { title: 'navigation.contributors', url: '#contributors' },
    { title: 'navigation.additional', url: '#additional' },
    { title: 'navigation.tokenomics', url: '#tokenomics' },
    { title: 'navigation.faq', url: '#faq' },
  ],

  // this can be any date format that is accepted by new Date()
  crowdLoadEndDate: '2023-03-13',
};

const footerLinks = {
  links: [
    { label: 'Link1', href: '#' },
    { label: 'Link2', href: '#' },
    { label: 'link3', href: '#' },
    { label: 'Link4', href: '#' },
    { label: 'Link5', href: '#' },
    { label: 'Link6', href: '#' },
  ],

  socials: [
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Github', href: '#' },
  ],
};

const polkadotConfig = {
  // address for people to transfer coins
  targetAccountAddress: '5CVT9Q7HrnpMCFRts82EWuTvZD66KHUjCxkDwAPn7HauZ2L5',

  // minimal amount to contribute - this is used in form validation
  minAmount: 1,

  // amount that you want to reach in full DOT
  targetAmount: 35,
};

export const SITE = { ...CONFIG, footerLinks, polkadotConfig };
