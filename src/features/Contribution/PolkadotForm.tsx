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
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import type { RuntimeDispatchInfo } from '@polkadot/types/interfaces';

import { useIsModalVisible } from '@/store';

import Loading from '@/components/Icons/Loading';
import Select from '@features/Contribution/components/Form/Select';
import Input from '@/features/Contribution/components/Form/Input';
import FinalState from '@features/Contribution/components/FinalState';
import LoadingWithProgress from '@/features/Contribution/components/LoadingWithProgress';

import { useSetupPolkadot } from '@features/Contribution/hooks';
import { SITE } from '@/config';
import { convertUnit } from '@/features/Contribution/utils';
import type { FormData } from './types';
import NoExtension from './components/NoExtension';

const PolkadotForm = () => {
  const { setIsModalOpen } = useIsModalVisible();
  const { accounts, api, isExtensionError } = useSetupPolkadot();

  const [chainInfo, setChainInfo] = useState<{
    chainInfo?: GenericChainProperties;
    chainName?: Text;
  }>();
  const [balance, setBalance] = useState<BalanceExtracted>();

  // transaction
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] =
    useState<ISubmittableResult>();
  const [transactionInfo, setTransactionInfo] = useState<RuntimeDispatchInfo>();
  const [transactionError, setTransactionError] = useState<string>('');
  const [signAndSendData, setSignAndSendData] = useState<{
    transfer?: SubmittableExtrinsic<'promise', ISubmittableResult>;
    injector?: InjectedExtension;
  }>({
    transfer: undefined,
    injector: undefined,
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      transferAmount: 0,
      transferFrom: '',
    },
  });

  const transferFrom = watch('transferFrom');

  register('transferFrom', {
    required: { value: true, message: 'This Field is required' },
  });

  async function signAndSend({
    transfer,
    injector,
  }: {
    transfer: SubmittableExtrinsic<'promise', ISubmittableResult>;
    injector: InjectedExtension;
  }) {
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
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleFormSubmit = handleSubmit(async (formData) => {
    console.log('formData :>> ', formData);

    // return;

    try {
      setIsLoading(true);

      const fromAcc = accounts.find((a) => a.address === formData.transferFrom);
      if (!fromAcc) throw new Error('There is no available account');

      const injector = await web3FromSource(fromAcc.meta.source);

      if (!api) throw new Error('There is no connection to api');
      if (!chainInfo) throw new Error('There is no Chain info');

      const chainDecimals = chainInfo?.chainInfo.registry.chainDecimals?.[0];

      const transfer = api.tx.balances.transfer(
        SITE.polkadotConfig.targetAccountAddress,
        convertUnit({ amount: formData.transferAmount, chainDecimals })
      );

      const info = await transfer.paymentInfo(fromAcc.address);
      console.log('info', JSON.stringify(info, null, 2));
      setTransactionInfo(info);

      setSignAndSendData({ transfer, injector });
    } catch (error) {
      console.log(error);
      setTransactionError(error?.message ?? '');
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

  if (isExtensionError) {
    return <NoExtension />;
  }

  if (!api) {
    return (
      <div className="mb-2 flex h-full w-full min-w-[30vw] flex-col items-center justify-center p-10">
        <Loading />
        Connecting to extension...
      </div>
    );
  }

  if (transactionError)
    return <FinalState description={transactionError} title="Error" isError />;

  if (transactionStatus && !transactionStatus.isFinalized)
    return <LoadingWithProgress transactionStatus={transactionStatus} />;

  if (transactionStatus && transactionStatus.isFinalized)
    return (
      <FinalState
        description="Thank you for your contribution."
        title="Success"
      />
    );

  function getSelectValue(accAddress: string) {
    if (!accAddress) return '';

    const fromAcc = accounts.find((a) => a.address === accAddress);

    return `${fromAcc?.meta.name} - ${transferFrom.slice(0, 15) + '...'}`;
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex h-full max-h-[90vh] max-w-xl flex-col justify-between p-10"
    >
      <div className="mb-8 flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-medium tracking-tight">
            Contribute to fund
          </div>
          <p className="text-gray-dark">
            Select the account and the amount to contribute.
          </p>
        </div>
        <button onClick={closeModal}>X</button>
      </div>
      <div className="h-full w-full overflow-y-auto">
        {transactionInfo?.partialFee && (
          <div className="text-primary">
            Partial Fee {transactionInfo?.partialFee?.toHuman()}
          </div>
        )}
        <Select
          label="Contribute from"
          placeholder="Select account"
          disabled={!!transactionInfo}
          value={() => getSelectValue(transferFrom)}
        >
          {accounts.map(({ address = '', meta: { name = '' } }) => (
            <div
              key={address}
              className="flex justify-between"
              onClick={() => {
                setValue('transferFrom', address);
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
          This account will contribute to the crowdloan
        </p>
        {!!errors.transferFrom && (
          <span className="ml-2  text-error">
            {errors.transferFrom.message}
          </span>
        )}
        <div>
          <Input
            label="Contribution"
            placeholder="0"
            type="number"
            {...register('transferAmount', {
              required: {
                value: true,
                message: 'This Field is required',
              },
              min: {
                value: SITE.polkadotConfig.minAmount,
                message: `Value have to be higher or equal to ${SITE.polkadotConfig.minAmount}`,
              },
              valueAsNumber: true,
            })}
            disabled={!!transactionInfo}
            currency={
              (chainInfo?.chainInfo?.tokenSymbol?.toHuman() as string) ?? ''
            }
          />
        </div>
        <p className="px-4 text-end text-xs text-gray-dark">
          The amount to contribute
        </p>
        {!!errors.transferAmount && (
          <span className="ml-2 text-error">
            {errors.transferAmount.message}
          </span>
        )}
        <p className="mt-6 text-gray-dark">
          The above contribution should amount to more than minimum contribution
          and less than the remaining value.
        </p>
        <div className="flex rounded-2xl bg-secondary px-8 py-6">
          <div className="w-1/2 ">
            <div className="text-xs text-gray-dark">minimum allowed</div>
            <div>
              {SITE.polkadotConfig.minAmount}&nbsp;
              {chainInfo?.chainInfo?.tokenSymbol?.toHuman()}
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-xs text-gray-dark">Remaining till cap</div>
            <div>
              {balance?.balance?.free
                ?.toHuman()
                .slice(
                  0,
                  Number(chainInfo?.chainInfo.registry.chainDecimals?.[0]) - 4
                )}{' '}
              {chainInfo?.chainInfo?.tokenSymbol?.toHuman()}
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-gray-200 dark:bg-gray-700 my-8 -ml-10 h-px w-[120%] border" />
      <div className="flex flex-1  pt-4">
        <button
          className="button-variant-primary base-button mr-auto"
          disabled={isLoading}
          onClick={closeModal}
        >
          Cancel
        </button>

        {!transactionInfo ? (
          <button
            className="button-variant-default base-button ml-auto w-full"
            type="submit"
            disabled={isLoading}
          >
            Contribute
          </button>
        ) : (
          <button
            className="button-variant-default base-button ml-auto w-full"
            onClick={() => signAndSend(signAndSendData)}
          >
            Sign and Send
          </button>
        )}
      </div>
    </form>
  );
};

export default PolkadotForm;
