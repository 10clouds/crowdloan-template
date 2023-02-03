import { useTranslation } from 'react-i18next';

interface Props {
  min: number | string;
  tokenSymbol: string;
  max: number | string;
}

const ContributionMinInfo = ({ min, max, tokenSymbol }: Props) => {
  const { t } = useTranslation('translation');
  return (
    <div className="flex rounded-2xl bg-secondary px-8 py-6">
      <div className="w-1/2 ">
        <div className="text-xs text-gray-dark">
          {t('contribution.minimumAllowed')}
        </div>
        <div>
          {min}&nbsp;
          {tokenSymbol}
        </div>
      </div>
      <div className="w-1/2">
        <div className="text-xs text-gray-dark">
          {t('contribution.remainingTillCap')}
        </div>
        <div>
          {max}&nbsp;
          {tokenSymbol}
        </div>
      </div>
    </div>
  );
};

export default ContributionMinInfo;
