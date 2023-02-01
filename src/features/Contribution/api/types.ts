import type { Codec } from '@polkadot/types/types';
import type { AccountData } from '@polkadot/types/interfaces/balances';
import type { Index } from '@polkadot/types/interfaces/runtime';

// ts has problems regarding this polkadot types and this is how they are defined in source code
export type BalanceExtracted =
  | {
      now: Codec;
      nonce: Index;
      balance: AccountData;
    }
  | undefined;
