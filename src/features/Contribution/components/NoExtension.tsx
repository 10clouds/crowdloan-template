import { useTranslation } from 'react-i18next';
import { useIsModalVisible } from '@/store';

const NoExtension = () => {
  const { t } = useTranslation('translation');
  const { setIsModalOpen } = useIsModalVisible();

  return (
    <div className="flex w-full min-w-[30vw] flex-col px-6 py-12">
      <div className="mx-auto flex-1 justify-center text-center">
        {t('extension.error.pleaseInstall')}&nbsp;
        <a
          href="https://polkadot.js.org/extension/"
          className="text-center text-primary hover:underline"
        >
          {t('extension.polkaDot')}&nbsp;
        </a>
        {t('extension.error.toMakeTransactions')}
      </div>
      <button
        className="base-button button-variant-default mx-auto mt-4"
        onClick={() => setIsModalOpen(false)}
      >
        {t('buttons.okGotIt')}
      </button>
    </div>
  );
};

export default NoExtension;
