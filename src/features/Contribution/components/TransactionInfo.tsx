import { useTranslation } from 'react-i18next';

interface Props {
  amount: () => number;
  tokenSymbol: string;
  fee: number | string;
}

const TransactionInfo = ({ amount, fee, tokenSymbol }: Props) => {
  const { t } = useTranslation('translation');
  return (
    <div className="flex rounded-2xl bg-secondary px-8 py-6">
      <div className="w-1/2 ">
        <div className="text-xs text-gray-dark">
          {t('contribution.contributions')}
        </div>
        <div>
          {amount()}&nbsp;
          {tokenSymbol}
        </div>
      </div>
      <div className="w-1/2">
        <div className="text-xs text-gray-dark">
          {t('contribution.submissionFee')}
        </div>
        <div>{fee}</div>
      </div>
    </div>
  );
};

export default TransactionInfo;
