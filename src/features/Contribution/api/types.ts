import type { Codec } from '@polkadot/types/types';

// ts have problem regarding this polkadot types and this is how they are defined in source code
export type BalanceExtracted =
  | {
      now: Codec;
      nonce: any;
      balance: any;
    }
  | undefined;
