import { SITE } from '@/config';
import { useIsModalVisible } from '@/store';
import ContributionMinInfo from './ContributionMinInfo';
import Copy from '@/components/Icons/Copy';
import { copyToClipboard } from '../utils';

interface Props {
  tokenSymbol: string;
  max: number | string;
}

const MobileInfo = ({ tokenSymbol, max }: Props) => {
  const { setIsModalOpen } = useIsModalVisible();

  function copyToCb() {
    copyToClipboard(SITE.polkadotConfig.targetAccountAddress);
    alert('You have successfully copied Address to clipboard');
  }

  return (
    <div className="flex w-full max-w-2xl flex-col justify-between overflow-y-auto px-6 py-10">
      <div>
        <span className="mb-2 text-3xl font-medium tracking-tight">
          Contribute to fund
        </span>
        <p className="mb-6 text-gray-dark">
          In order to contribute to fund, copy the account address ID and open
          your dedicated Polkadot wallet app on your device and use this address
          to process transaction.
        </p>
        <div className="ml-4 text-xs opacity-50">Account address</div>
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
          The above contribution should amount to more than minimum contribution
          and less than the remaining value.
        </p>
        <ContributionMinInfo
          min={SITE.polkadotConfig.minAmount}
          max={max}
          tokenSymbol={tokenSymbol}
        />
        <div className="my-6 text-gray-dark">
          Thank you for your contribution!
        </div>
      </div>

      <button
        className="base-button button-variant-default mx-auto mt-auto "
        onClick={() => setIsModalOpen(false)}
      >
        Done
      </button>
    </div>
  );
};

export default MobileInfo;
