import {
  web3Accounts,
  web3Enable,
  web3FromSource,
  web3FromAddress,
} from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useEffect, useState, FormEvent } from 'react';
import Select from './Form/Select';
import Input from './Form/Input';

const targetAddress = '5CVT9Q7HrnpMCFRts82EWuTvZD66KHUjCxkDwAPn7HauZ2L5';

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
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [api, setApi] = useState<ApiPromise>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputParam, setInputParam] = useState({
    transferAmount: 0,
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

  function handleFormInputChange(e) {
    setInputParam({
      ...inputParam,
      [e.target.name]: e.target.value,
    });
  }

  async function handleTransfer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      console.log(inputParam.transferAmount, ':amt');
      console.log('add:', targetAddress);
      setIsLoading(true);
      const fromAcc = accounts.find(
        (a) => a.address === inputParam.transferFrom.address
      );
      console.log('CO TO JEST', fromAcc);

      if (!fromAcc) return;

      const injector = await web3FromSource(fromAcc.meta.source);

      if (!api) return;

      api.tx.balances
        .transfer(targetAddress, inputParam.transferAmount)
        .signAndSend(
          inputParam.transferFrom.address,
          { signer: injector.signer },
          (status, ...rest) => {
            console.log('TRX', status, rest);
          }
        );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setupExtension();
    apiSetup().then((_api) => setApi(_api));
    getAccounts().then((allAccounts) => setAccounts(allAccounts));
  }, []);

  return (
    <div className="w-full">
      {JSON.stringify(inputParam, null, 2)}
      {JSON.stringify(accounts, null, 2)}

      <div className="text-3xl font-medium tracking-tight">
        Contribute to fund
      </div>
      <p className="text-gray-dark">
        Select the account and the amount to contribute.
      </p>
      <form onSubmit={handleTransfer}>
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

        <Input
          handleInputChange={handleFormInputChange}
          name="transferAmount"
          label="Contribution"
          value={inputParam.transferAmount}
        />

        <button type="submit">Contribute</button>
      </form>
    </div>
  );
};

export default PolkadotForm;
