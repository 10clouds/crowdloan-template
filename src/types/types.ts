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

export type AboutCard = {
  title: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};
