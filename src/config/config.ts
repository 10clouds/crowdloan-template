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

const footerLinks = {
  links: [
    { label: 'Link1', href: '#' },
    { label: 'Link2', href: '#' },
    { label: 'link3', href: '#' },
    { label: 'Link4', href: '#' },
    { label: 'Link5', href: '#' },
  ],

  socials: [
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Github', href: '#' },
  ],
};

export const SITE = { ...CONFIG, footerLinks };
