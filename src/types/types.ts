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
  href?: string;
  topLabel?: string;
};

export type AboutCard = {
  title: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type TransferData = {
  from: string;
  to: string;
  extrinsic_index: string;
  success: boolean;
  hash: string;
  block_num: number;
  block_timestamp: number;
  module: string;
  amount: string;
  amount_v2: string;
  usd_amount: string;
  fee: string;
  nonce: number;
  asset_symbol: string;
  asset_type: string;
  from_account_display: {
    address: string;
  };
  to_account_display: {
    address: string;
  };
  event_idx: number;
};

export type Transfers = {
  code: number;
  message: string;
  generated_at: number;
  data: {
    count: number;
    transfers: TransferData[];
  };
};
