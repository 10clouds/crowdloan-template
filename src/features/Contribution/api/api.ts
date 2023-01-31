import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import type { BalanceExtracted } from './types';
import type { AccountInfoWithDualRefCount } from '@polkadot/types/interfaces';

export async function apiSetup() {
  try {
    const provider = new WsProvider(
      import.meta.env.MODE === 'development'
        ? 'wss://westend-rpc.polkadot.io'
        : 'wss://rpc.polkadot.io'
    );

    const _api = await ApiPromise.create({ provider });

    if (_api) {
      return _api;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getChainInfo(api: ApiPromise) {
  try {
    const chainInfo = await api.registry.getChainProperties();

    return chainInfo;
  } catch (err) {
    console.error(err);
  }
}

export async function getBalance({
  api,
  targetAddress,
}: {
  api: ApiPromise;
  targetAddress: string;
}): Promise<BalanceExtracted> {
  try {
    const now = await api.query.timestamp.now();
    const { nonce, data: balance } = (await api.query.system.account(
      targetAddress
    )) as AccountInfoWithDualRefCount;

    return { now, nonce, balance };
  } catch (err) {
    console.error(err);
  }
}

export async function getAccounts() {
  let allAccounts = [] as InjectedAccountWithMeta[];
  try {
    allAccounts = await web3Accounts();

    return allAccounts;
  } catch (error) {
    console.error(error);
    return allAccounts;
  }
}

export async function setupExtension() {
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
