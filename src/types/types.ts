export type NavLink = {
  title: string;
  url: string;
};

export type Logo = {
  src: string;
  alt: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type Card = {
  title: string;
  bulletList?: string[];
  description?: string;
  href: string;
};
