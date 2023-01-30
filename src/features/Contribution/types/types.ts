import type { ISubmittableResult } from '@polkadot/types/types';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { InjectedExtension } from '@polkadot/extension-inject/types';

export type FormData = {
  transferAmount: number;
  transferFrom: string;
};

export type SignAndSubmit = {
  transfer?: SubmittableExtrinsic<'promise', ISubmittableResult>;
  injector?: InjectedExtension;
};
