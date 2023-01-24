import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useEffect, useState, FormEvent } from 'react';
import Select from './Form/Select';
import Input from './Form/Input';
import useIsModalVisible from './store/useIsModalVisible';
import type { GenericChainProperties } from '@polkadot/types';
import type { Balance } from '@polkadot/types/interfaces/runtime';
import type { ISubmittableResult } from '@polkadot/types/types';

const targetAddress = '5CVT9Q7HrnpMCFRts82EWuTvZD66KHUjCxkDwAPn7HauZ2L5';

async function getChainInfo(api: ApiPromise) {
  try {
    const chainInfo = await api.registry.getChainProperties();

    return chainInfo;
  } catch (err) {
    console.error(err);
  }
}

const getAccounts = async () => {
  let allAccounts = [] as InjectedAccountWithMeta[];
  try {
    allAccounts = await web3Accounts();

    return allAccounts;
  } catch (error) {
    console.error(error);
    return allAccounts;
  }
};

async function setupExtension() {
  let isError = false;
  try {
    const extension = await web3Enable('parity-crowdloan');

    if (extension.length === 0) {
      console.error(
        'No extension Found, please install from https://polkadot.js.org/extension/'
      );
      isError = true;
      return isError;
    }
  } catch (error) {
    console.error(error);
    isError = true;
    return isError;
  }

  return isError;
}

async function apiSetup() {
  try {
    const provider = new WsProvider('wss://westend-rpc.polkadot.io');

    const _api = await ApiPromise.create({ provider });

    if (_api) {
      console.log('Connection Success', _api);
      return _api;
    }
  } catch (error) {
    console.log(error);
  }
}

const gasLimit = 20000n * 1000000n;

const PolkadotForm = () => {
  const { setIsModalOpen } = useIsModalVisible();

  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [api, setApi] = useState<ApiPromise>();
  const [isExtensionError, setIsExtensionError] = useState<boolean>(false);
  const [chainInfo, setChainInfo] = useState<GenericChainProperties>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] =
    useState<ISubmittableResult>();
  const [transactionInfo, setTransactionInfo] = useState<Balance>();
  const [inputParam, setInputParam] = useState({
    transferAmount: '',
    transferFrom: {
      name: '',
      address: '',
    },
  });

  function handleChange({
    inputName,
    value,
  }: {
    inputName: string;
    value: unknown;
  }) {
    setInputParam({
      ...inputParam,
      [inputName]: value,
    });
  }

  function handleFormInputChange(e: any) {
    setInputParam({
      ...inputParam,
      [e.target.name]: e.target.value,
    });
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const fromAcc = accounts.find(
        (a) => a.address === inputParam.transferFrom.address
      );
      if (!fromAcc) throw new Error('There is no available account');

      const injector = await web3FromSource(fromAcc.meta.source);

      if (!api) throw new Error('There is no connection to api');
      if (!chainInfo) throw new Error('There is no Chain info');

      console.log('first', chainInfo.registry.chainDecimals?.[0]);

      const transfer = api.tx.balances.transfer(
        targetAddress,
        parseInt(inputParam.transferAmount) *
          10 *
          chainInfo.registry.chainDecimals?.[0]
      );

      const info = await transfer.paymentInfo(fromAcc.address);
      setTransactionInfo(info.partialFee);

      await transfer.signAndSend(
        inputParam.transferFrom.address,
        { signer: injector.signer },
        (status, ...rest) => {
          console.log('TRX', JSON.stringify(status, null, 2));

          console.log('REST -> ', JSON.stringify(rest, null, 2));
          setTransactionStatus(status);
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setupExtension().then((isError) => setIsExtensionError(isError));
    apiSetup().then((_api) => setApi(_api));
    getAccounts().then((allAccounts) => setAccounts(allAccounts));
  }, []);

  useEffect(() => {
    if (!api) return;

    getChainInfo(api).then((chainInfo) => setChainInfo(chainInfo));
  }, [api]);

  if (isExtensionError) {
    return (
      <div>
        Please install extension from{' '}
        <a
          href="https://polkadot.js.org/extension/"
          className="text-primary hover:underline"
        >
          Polkadot extension
        </a>
        to make transactions
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-medium tracking-tight">
            Contribute to fund
          </div>
          <p className="text-gray-dark">
            Select the account and the amount to contribute.
          </p>
        </div>
        <button onClick={() => setIsModalOpen(false)}>X</button>
      </div>
      STATUS
      {JSON.stringify(transactionStatus, null, 2)}
      {JSON.stringify(transactionInfo, null, 2)}
      {JSON.stringify(chainInfo, null, 2)}
      {inputParam.transferAmount}
      {typeof inputParam.transferAmount}
      <form onSubmit={handleFormSubmit}>
        <Select
          label="Contribute from"
          placeholder="Select account"
          value={
            inputParam.transferFrom.name &&
            `${inputParam.transferFrom.name} - ${
              inputParam.transferFrom.address.slice(0, 15) + '...'
            }`
          }
        >
          {accounts.map(({ address = '', meta: { name = '' } }) => (
            <div
              key={address}
              className="flex justify-between"
              onClick={() => {
                handleChange({
                  inputName: 'transferFrom',
                  value: { name, address },
                });
              }}
            >
              <div className="uppercase">{name}</div>
              <div className="text-sm font-light text-gray-dark">
                {address.slice(0, 15) + '...'}
              </div>
            </div>
          ))}
        </Select>
        <p className="px-4 text-end text-xs opacity-50">
          This account will contribute to the crowdloan
        </p>

        <div>
          <Input
            handleInputChange={handleFormInputChange}
            name="transferAmount"
            label="Contribution"
            placeholder="0"
            value={inputParam.transferAmount}
          />
        </div>
        <p className="px-4 text-end text-xs opacity-50 ">
          The amount to contribute from this account
        </p>

        <button
          className="flex w-full justify-center rounded-2xl bg-base px-[24px] py-[12px] text-lg text-white transition duration-150 ease-in-out hover:bg-base-light md:w-fit"
          type="submit"
          disabled={
            !(inputParam.transferAmount && inputParam.transferFrom.address)
          }
        >
          Contribute
        </button>
      </form>
    </div>
  );
};

export default PolkadotForm;
