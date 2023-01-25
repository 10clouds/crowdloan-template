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

function transferAmountValidator(value: number, min: number) {
  if (!value) {
    return 'This field is required';
  } else if (value <= 0) {
    return 'Value cannot be negative';
  } else if (isNaN(value)) {
    return 'Value is not a number';
  } else if (value > min) {
    return `Value must be between 0 and ${min}`;
  }

  return '';
}

function transferFromValidator(accountInfo: { name: string; address: string }) {
  const { name, address } = accountInfo;
  if (!name && !address) {
    return 'This field is required';
  }
  return '';
}

function validateForm(
  formData: {
    transferAmount: number;
    transferFrom: {
      name: string;
      address: string;
    };
  },
  options: { minAmount?: number } = {}
) {
  const { transferAmount, transferFrom } = formData;
  const { minAmount = 1 } = options;

  const transferAmountErrMessage = transferAmountValidator(
    transferAmount,
    minAmount
  );
  const transferFromErrMessage = transferFromValidator(transferFrom);

  const errors = {
    transferAmount: transferAmountErrMessage,
    transferFrom: transferFromErrMessage,
  };

  const isValid = !Object.values(errors).some(Boolean);
  return { isValid, errors };
}

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
  const [formErrors, setFormErrors] = useState({
    transferAmount: '',
    transferFrom: '',
  });
  const [form, setForm] = useState({
    transferAmount: 0,
    transferFrom: {
      name: '',
      address: '',
    },
  });

  function clearErr(formName: keyof typeof formErrors) {
    setFormErrors({ ...formErrors, [formName]: '' });
  }

  function handleChange({
    inputName,
    value,
  }: {
    inputName: string;
    value: unknown;
  }) {
    setForm({
      ...form,
      [inputName]: value,
    });

    clearErr('transferFrom');
  }

  function handleFormInputChange(e: any) {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newForm);

    const { errors } = validateForm(newForm, { minAmount: 5000 });

    setFormErrors(errors);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { isValid, errors } = validateForm(form, { minAmount: 5000 });

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    console.log('PASSED');

    try {
      setIsLoading(true);
      const fromAcc = accounts.find(
        (a) => a.address === form.transferFrom.address
      );
      if (!fromAcc) throw new Error('There is no available account');

      const injector = await web3FromSource(fromAcc.meta.source);

      if (!api) throw new Error('There is no connection to api');
      if (!chainInfo) throw new Error('There is no Chain info');

      console.log('first', chainInfo.registry.chainDecimals?.[0]);

      const transfer = api.tx.balances.transfer(
        targetAddress,
        form.transferAmount * 10 * chainInfo.registry.chainDecimals?.[0]
      );

      const info = await transfer.paymentInfo(fromAcc.address);
      setTransactionInfo(info.partialFee);

      const hash = await transfer.signAndSend(
        form.transferFrom.address,
        { signer: injector.signer },
        (status, ...rest) => {
          console.log('TRX', JSON.stringify(status, null, 2));

          console.log('REST -> ', JSON.stringify(rest, null, 2));
          setTransactionStatus(status);
        }
      );

      console.log('hash', hash);
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
    <div className="flex h-full flex-col justify-between ">
      <div className="h-full w-full overflow-y-auto">
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
        {JSON.stringify(transactionStatus?.status, null, 2)}
        {JSON.stringify(transactionInfo, null, 2)}
        {JSON.stringify(chainInfo, null, 2)}
        {form.transferAmount}
        {JSON.stringify(formErrors, null, 2)}
        {typeof form.transferAmount}
        <form onSubmit={handleFormSubmit}>
          <Select
            label="Contribute from"
            placeholder="Select account"
            value={
              form.transferFrom.name &&
              `${form.transferFrom.name} - ${
                form.transferFrom.address.slice(0, 15) + '...'
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
          <p className="px-4 text-end text-xs text-gray-dark">
            This account will contribute to the crowdloan
          </p>

          {!!formErrors.transferFrom && (
            <span className="ml-2  text-error">{formErrors.transferFrom}</span>
          )}

          <div>
            <Input
              handleInputChange={handleFormInputChange}
              name="transferAmount"
              label="Contribution"
              placeholder="0"
              required
              type="number"
              value={form.transferAmount}
            />
          </div>
          <p className="px-4 text-end text-xs text-gray-dark">
            The amount to contribute from this account
          </p>
          {!!formErrors.transferAmount && (
            <span className="ml-2 text-error">{formErrors.transferAmount}</span>
          )}
        </form>
        <p className="mt-6 text-gray-dark">
          The above contribution should amount to more than minimum contribution
          and less than the remaining value.
        </p>
        <div className="flex rounded-2xl bg-secondary px-8 py-6">
          <div className="w-1/2 ">
            <div className="text-xs text-gray-dark">minimum allowed</div>
            <div>5.0000 DOT</div>
          </div>
          <div className="w-1/2">
            <div className="text-xs text-gray-dark">Remaining till cap</div>
            <div>50,568.6681 DOT</div>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <button
          className="ml-auto flex w-full justify-center rounded-2xl bg-base px-[24px] py-[12px] text-lg text-white transition duration-150 ease-in-out hover:bg-base-light md:w-fit"
          type="submit"
          onClick={(e) => handleFormSubmit(e)}
        >
          Contribute
        </button>
      </div>
    </div>
  );
};

export default PolkadotForm;
