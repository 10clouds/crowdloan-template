const CONFIG = {
  // SEO
  name: 'example',
  origin: 'https://example.com',
  basePathname: '/',
  trailingSlash: false,

  title: 'Please add here a title',
  description: '🚀  Please add here a description',

  // Navbar links
  navLinks: [
    { title: 'About', url: '#about' },
    { title: 'Rewards', url: '#rewards' },
    { title: 'Contributors', url: '#contributors' },
    { title: 'Additional', url: '#additional' },
    { title: 'Tokenomics', url: '#' },
    { title: 'FAQ', url: '#faq' },
  ],

  // project
  crowdLoadEndDate: '2023-03-13',
};

export const SITE = { ...CONFIG };
