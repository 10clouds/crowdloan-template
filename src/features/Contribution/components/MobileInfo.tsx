import { SITE } from '@/config';
import { useIsModalVisible } from '@/store';
import ContributionMinInfo from './ContributionMinInfo';
import Copy from '@/components/Icons/Copy';

interface Props {
  tokenSymbol: string;
  max: number | string;
}

const MobileInfo = ({ tokenSymbol, max }: Props) => {
  const { setIsModalOpen } = useIsModalVisible();

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="w-full max-w-2xl p-6">
      Contribute to fund
      <p className="mb-6 text-gray-dark">
        In order to contribute to fund, copy the individual transaction ID and
        open your dedicated Polkadot wallet app on your device and use this
        address to process transaction.
      </p>
      <div className="ml-4 text-xs opacity-50">Account address</div>
      <div
        className="flex rounded-2xl border text-sm"
        onClick={() =>
          copyToClipboard(SITE.polkadotConfig.targetAccountAddress)
        }
      >
        <div className="p-4 ">
          {SITE.polkadotConfig.targetAccountAddress.slice(0, 20) + '...'}
        </div>
        <button
          onClick={() =>
            copyToClipboard(SITE.polkadotConfig.targetAccountAddress)
          }
          className="flex w-full items-center justify-center rounded-2xl bg-base px-4"
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
      <div className="mt-6 text-gray-dark">
        Thank you for your contribution!
      </div>
      <button
        className="base-button button-variant-default mt-auto"
        onClick={() => setIsModalOpen(false)}
      >
        Done
      </button>
    </div>
  );
};

export default MobileInfo;
