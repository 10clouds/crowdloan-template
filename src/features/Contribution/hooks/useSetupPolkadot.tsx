import { useEffect, useState } from 'react';
import {
  apiSetup,
  getAccounts,
  setupExtension,
} from '@features/Contribution/api';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import type { ApiPromise } from '@polkadot/api';

export const useSetupPolkadot = () => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [api, setApi] = useState<ApiPromise>();
  const [isExtensionError, setIsExtensionError] = useState<boolean>(false);

  useEffect(() => {
    setupExtension().then((isError) => setIsExtensionError(isError));
    apiSetup().then((_api) => setApi(_api));
    getAccounts().then((allAccounts) => setAccounts(allAccounts));
  }, []);
  return { accounts, api, isExtensionError };
};
