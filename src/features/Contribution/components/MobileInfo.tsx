import { SITE } from '@/config';
import { useIsModalVisible } from '@/store';
import ContributionMinInfo from './ContributionMinInfo';
import Copy from '@/components/Icons/Copy';
import { copyToClipboard } from '../utils';
import { useTranslation } from 'react-i18next';

interface Props {
  tokenSymbol: string;
  max: number | string;
}

const MobileInfo = ({ tokenSymbol, max }: Props) => {
  const { t } = useTranslation('translation');
  const { setIsModalOpen } = useIsModalVisible();

  function copyToCb() {
    copyToClipboard(SITE.polkadotConfig.targetAccountAddress);
    alert('You have successfully copied Address to clipboard');
  }

  return (
    <div className="flex w-full max-w-2xl flex-col justify-between overflow-y-auto px-6 py-10">
      <div>
        <span className="mb-2 text-3xl font-medium tracking-tight">
          {t('contribution.mobileInfo.contributeToFund')}
        </span>
        <p className="mb-6 text-gray-dark">
          {t('contribution.mobileInfo.inOrderToContribute')}
        </p>
        <div className="ml-4 text-xs opacity-50">
          {t('contribution.mobileInfo.inOrderToContribute')}
        </div>
        <div className="flex rounded-2xl border text-sm" onClick={copyToCb}>
          <div className="flex-1 p-4">
            {SITE.polkadotConfig.targetAccountAddress.slice(0, 20) + '...'}
          </div>
          <button
            onClick={copyToCb}
            className="flex  items-center justify-center rounded-2xl bg-base px-4"
          >
            <Copy />
          </button>
        </div>
        <p className="mt-6 mb-4 text-gray-dark">
          {t('contribution.mobileInfo.contributionDescription')}
        </p>
        <ContributionMinInfo
          min={SITE.polkadotConfig.minAmount}
          max={max}
          tokenSymbol={tokenSymbol}
        />
        <div className="my-6 text-gray-dark">
          {t('contribution.thankYouForContribution')}
        </div>
      </div>

      <button
        className="base-button button-variant-default mx-auto mt-auto "
        onClick={() => setIsModalOpen(false)}
      >
        {t('buttons.done')}
      </button>
    </div>
  );
};

export default MobileInfo;
