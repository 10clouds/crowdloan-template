import { useEffect, useState } from 'react';
import { SITE } from '@/config';
import {
  getBalance,
  BalanceExtracted,
  getChainInfo,
} from '@/features/Contribution/api';
import { useSetupPolkadot } from '@/features/Contribution/hooks';
import type { GenericChainProperties } from '@polkadot/types';

const defaultChainDecimals = 12 as const;

const ContributedInfo = () => {
  const { api, isExtensionError } = useSetupPolkadot();

  const [balance, setBalance] = useState<BalanceExtracted>();
  const [chainInfo, setChainInfo] = useState<GenericChainProperties>();

  useEffect(() => {
    if (!api) return;

    getBalance({
      api,
      targetAddress: SITE.polkadotConfig.targetAccountAddress,
    }).then((_balance) => setBalance(_balance));

    getChainInfo(api).then((_chainInfo) => setChainInfo(_chainInfo));
  }, [api]);

  const contributed = chainInfo
    ? balance?.balance.free / 10 ** chainInfo?.registry?.chainDecimals?.[0] ??
      defaultChainDecimals
    : 0;

  const progressValue = contributed - SITE.polkadotConfig.targetAmount * -1;

  return (
    <div className="mb-px flex flex-col rounded-b-lg bg-white px-4 py-6 md:px-8">
      <div className="flex">
        <div className="flex flex-col">
          <div className="pb-2 text-xs opacity-50 md:text-sm">Contributed</div>
          <span className="text-xl font-medium leading-[90%] text-primary md:text-[2rem]">
            {api && !isNaN(contributed)
              ? contributed.toFixed(4)
              : isExtensionError
              ? 'XX.XXXX'
              : 'Loading...'}
            <span className="px-1 opacity-50">/</span>
          </span>
        </div>
        <div className="flex flex-col">
          <div className="pb-2 text-xs opacity-50 md:text-sm">CAP</div>
          <span className="text-xl font-medium leading-[90%] md:text-[2rem]">
            {SITE.polkadotConfig.targetAmount.toFixed(4)} DOT
          </span>
        </div>
      </div>
      <div className="mt-4 h-2.5 w-full rounded-full bg-zinc-300 transition duration-150 ease-in-out">
        <div
          className="h-2.5 rounded-full bg-timer-gradient"
          style={{ width: `${progressValue | 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ContributedInfo;
