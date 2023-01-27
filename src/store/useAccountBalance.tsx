import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import {
  BalanceExtracted,
  apiSetup,
  getBalance,
} from '@/features/Contribution/api';
import { SITE } from '@/config';
import type { ApiPromise } from '@polkadot/api';

export const accountBalance = atom<BalanceExtracted>();

export const useIsModalVisible = () => {
  const [api, setApi] = useState<ApiPromise>();

  const balance = useStore(accountBalance);

  useEffect(() => {
    apiSetup()
      .then((_api) => setApi(_api))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!api) return;

    getBalance({
      api,
      targetAddress: SITE.polkadotConfig.targetAccountAddress,
    })
      .then((_balance) => accountBalance.set(_balance))
      .catch((err) => console.error(err));
  }, [api]);

  return { balance, setBalance: accountBalance.set } as const;
};
