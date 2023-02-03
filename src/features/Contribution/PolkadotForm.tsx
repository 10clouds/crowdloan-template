import { useEffect, useState } from 'react';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useForm } from 'react-hook-form';
import {
  BalanceExtracted,
  getBalance,
  getChainInfo,
} from '@features/Contribution/api';

import type { GenericChainProperties } from '@polkadot/types';
import type { ISubmittableResult } from '@polkadot/types/types';
import type { RuntimeDispatchInfo } from '@polkadot/types/interfaces';

import { useIsModalVisible } from '@/store';

import Loading from '@/components/Icons/Loading';
import Select from '@features/Contribution/components/Form/Select';
import Input from '@/features/Contribution/components/Form/Input';
import FinalState from '@features/Contribution/components/FinalState';
import LoadingWithProgress from '@/features/Contribution/components/LoadingWithProgress';
import NoExtension from '@features/Contribution/components/NoExtension';
import MobileInfo from '@features/Contribution/components/MobileInfo';
import ContributionMinInfo from '@features/Contribution/components/ContributionMinInfo';
import TransactionInfo from '@features/Contribution/components/TransactionInfo';
import Close from '@features/Contribution/components/icons/Close';

import { useSetupPolkadot } from '@features/Contribution/hooks';
import { SITE } from '@/config';
import {
  convertUnit,
  getErrorMessage,
  getRemaining,
  isMobileDevice,
} from '@/features/Contribution/utils';
import type { FormData, SignAndSubmit } from '@features/Contribution/types';
import { useTranslation } from 'react-i18next';

const formDefaultState = {
  transferAmount: 0,
  transferFrom: '',
};

const inputOptions = {
  account: {
    required: { value: true, message: 'This Field is required' },
  },
  amount: {
    required: {
      value: true,
      message: 'This Field is required',
    },
    min: {
      value: SITE.polkadotConfig.minAmount,
      message: `Value has to be higher or equal to ${SITE.polkadotConfig.minAmount}`,
    },
    valueAsNumber: true,
  },
};

const PolkadotForm = () => {
  const { t } = useTranslation('translation');
  const { setIsModalOpen } = useIsModalVisible();
  const { accounts, api, isExtensionError } = useSetupPolkadot();

  const [chainInfo, setChainInfo] = useState<GenericChainProperties>();
  const [balance, setBalance] = useState<BalanceExtracted>();

  // transaction
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] =
    useState<ISubmittableResult>();
  const [transactionInfo, setTransactionInfo] = useState<RuntimeDispatchInfo>();
  const [transactionError, setTransactionError] = useState<string>('');
  const [signAndSendData, setSignAndSendData] = useState<SignAndSubmit>();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: formDefaultState,
  });

  const transferFrom = watch('transferFrom');

  register('transferFrom', inputOptions.account);

  const remaining = getRemaining({
    chainDecimals: chainInfo?.registry.chainDecimals?.[0] ?? 0,
    balance: balance?.balance.free,
  })
    .toString()
    .slice(0, 6);

  function getSelectedValue(accAddress: string) {
    if (!accAddress) return '';

    const fromAcc = accounts.find((a) => a.address === accAddress);

    return `${fromAcc?.meta.name} - ${transferFrom.slice(0, 15) + '...'}`;
  }

  async function signAndSend({ transfer, injector }: SignAndSubmit) {
    try {
      const fromAddress = getValues('transferFrom');
      await transfer.signAndSend(
        fromAddress,
        { signer: injector.signer },
        (status) => {
          setTransactionStatus(status);
        }
      );
    } catch (err) {
      console.error(err);
      setTransactionError(getErrorMessage(err));
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleFormSubmit = handleSubmit(async (formData) => {
    try {
      setIsLoading(true);

      const fromAcc = accounts.find((a) => a.address === formData.transferFrom);
      if (!fromAcc) throw new Error('There is no available account');
      if (!api) throw new Error('There is no connection to api');
      if (!chainInfo) throw new Error('There is no Chain info');

      const injector = await web3FromSource(fromAcc.meta.source);

      const chainDecimals = chainInfo.registry.chainDecimals?.[0];

      const transfer = api.tx.balances.transfer(
        SITE.polkadotConfig.targetAccountAddress,
        convertUnit({ amount: formData.transferAmount, chainDecimals })
      );

      const info = await transfer.paymentInfo(fromAcc.address);
      setTransactionInfo(info);

      setSignAndSendData({ transfer, injector });
    } catch (err) {
      console.log(err);
      setTransactionError(getErrorMessage(err));
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (!api) return;

    getChainInfo(api).then((chainInfo) => setChainInfo(chainInfo));

    getBalance({
      api,
      targetAddress: SITE.polkadotConfig.targetAccountAddress,
    }).then((balance) => setBalance(balance));
  }, [api]);

  if (isMobileDevice())
    return (
      <MobileInfo
        max={remaining}
        tokenSymbol={chainInfo?.tokenSymbol.toHuman() as string}
      />
    );

  if (isExtensionError) return <NoExtension />;

  if (!api)
    return (
      <div className="mb-2 flex h-full w-full min-w-[30vw] flex-col items-center justify-center p-10">
        <Loading />
        {t('extension.connecting')}
      </div>
    );

  if (transactionError)
    return (
      <FinalState
        description={transactionError}
        title={t('contribution.error')}
        isError
      />
    );

  if (transactionStatus && !transactionStatus.isFinalized)
    return <LoadingWithProgress transactionStatus={transactionStatus} />;

  if (transactionStatus && transactionStatus.isFinalized)
    return (
      <FinalState
        description={t('contribution.thankYouForContribution')}
        title={t('contribution.success')}
      />
    );

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex h-full max-h-[90vh] max-w-xl flex-col justify-between p-10"
    >
      <div className="mb-8 flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-medium tracking-tight">
            {t('contribution.contributeToFund')}
          </div>
          <p className="text-gray-dark">{t('contribution.form.description')}</p>
        </div>
        <Close onClick={closeModal} />
      </div>
      <div className="h-full w-full overflow-y-auto">
        {transactionInfo?.partialFee && (
          <TransactionInfo
            tokenSymbol={chainInfo?.tokenSymbol.toHuman() as string}
            amount={() => getValues('transferAmount')}
            fee={transactionInfo?.partialFee?.toHuman()}
          />
        )}
        <Select
          label={t('contribution.form.selectLabel')}
          placeholder={t('contribution.form.selectPlaceholder')}
          disabled={!!transactionInfo}
          value={() => getSelectedValue(transferFrom)}
        >
          {accounts.map(({ address = '', meta: { name = '' } }) => (
            <div
              key={address}
              className="flex justify-between"
              onClick={() => {
                setValue('transferFrom', address);
                trigger('transferFrom');
              }}
            >
              <div className="uppercase">{name}</div>
              <div className="text-sm font-light text-gray-dark">
                {address.slice(0, 15) + '...'}
              </div>
            </div>
          ))}
        </Select>
        <p className="px-4 text-end text-xs text-gray-dark">
          {t('contribution.form.selectAccInfo')}
        </p>
        {!!errors.transferFrom && (
          <span className="ml-2  text-error">
            {errors.transferFrom.message}
          </span>
        )}
        <div>
          <Input
            label={t('contribution.form.inputAmountLabel')}
            placeholder="0"
            type="number"
            {...register('transferAmount', inputOptions.amount)}
            disabled={!!transactionInfo}
            currency={(chainInfo?.tokenSymbol?.toHuman() as string) ?? ''}
          />
        </div>
        <p className="px-4 text-end text-xs text-gray-dark">
          {t('contribution.form.inputAmountInfo')}
        </p>
        {!!errors.transferAmount && (
          <span className="ml-2 text-error">
            {errors.transferAmount.message}
          </span>
        )}
        <p className="mt-6 mb-4 text-gray-dark">
          {t('contribution.theAboveContribution')}
        </p>
        <ContributionMinInfo
          min={SITE.polkadotConfig.minAmount}
          max={remaining}
          tokenSymbol={chainInfo?.tokenSymbol.toHuman() as string}
        />
      </div>
      <hr className="bg-gray-200 dark:bg-gray-700 my-8 -ml-10 h-px w-[120%] border" />
      <div className="flex flex-1  pt-4">
        <button
          className="button-variant-primary base-button mr-auto"
          disabled={isLoading}
          onClick={closeModal}
        >
          {t('buttons.cancel')}
        </button>

        {!transactionInfo ? (
          <button
            className="button-variant-default base-button ml-auto w-full"
            type="submit"
            disabled={isLoading}
          >
            {t('buttons.contribute')}
          </button>
        ) : (
          <button
            className="button-variant-default base-button ml-auto w-full"
            onClick={() => signAndSend(signAndSendData as SignAndSubmit)}
          >
            {t('buttons.signAndSend')}
          </button>
        )}
      </div>
    </form>
  );
};

export default PolkadotForm;
