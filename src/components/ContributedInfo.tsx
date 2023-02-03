import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('translation');
  const { api } = useSetupPolkadot();

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

  const contributed = useMemo(
    () =>
      chainInfo
        ? Number(balance?.balance.free) /
            10 ** chainInfo?.registry?.chainDecimals?.[0] ??
          defaultChainDecimals
        : 0,
    [balance?.balance.free, chainInfo]
  );

  const progressValue =
    contributed - SITE.polkadotConfig.targetAmount * -1 ?? 20;

  const loadingSkeleton = (
    <div className="flex gap-2">
      <div className="flex w-1/3 flex-col">
        <div className="mb-2 h-4 w-40 max-w-xs animate-pulse rounded-full bg-gray"></div>
        <div className="h-7 w-full max-w-xs animate-pulse rounded-full bg-gray"></div>
      </div>
      <div className="flex w-2/3 flex-col">
        <div className="mb-2 h-4 w-40 max-w-xs animate-pulse rounded-full bg-gray "></div>
        <div className=" h-7 w-full max-w-xs animate-pulse rounded-full bg-gray"></div>
      </div>
    </div>
  );

  return (
    <div className="mb-px flex flex-col rounded-b-lg bg-white px-4 py-6 md:px-8">
      {api && !isNaN(contributed) ? (
        <div className="flex">
          <div className="flex flex-col">
            <div className="pb-2 text-xs opacity-50 md:text-sm">
              {t('hero.contributed')}
            </div>
            <span className="text-xl font-medium leading-[90%] text-primary md:text-[2rem]">
              <div className="flex">
                {contributed.toFixed(4)}
                <span className="px-1 opacity-50">/</span>
              </div>
            </span>
          </div>
          <div className="flex flex-col">
            <div className="pb-2 text-xs opacity-50 md:text-sm">
              {t('hero.cap')}
            </div>
            <span className="text-xl font-medium leading-[90%] md:text-[2rem]">
              {SITE.polkadotConfig.targetAmount.toFixed(4)}{' '}
              {chainInfo && String(chainInfo?.tokenSymbol?.toHuman())}
            </span>
          </div>
        </div>
      ) : (
        loadingSkeleton
      )}
      <div className="mt-4 h-2.5 w-full rounded-full bg-zinc-300 transition duration-150 ease-in-out">
        <div
          className="h-2.5 rounded-full bg-timer-gradient"
          style={{ width: `${progressValue > 100 ? 100 : progressValue | 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ContributedInfo;
