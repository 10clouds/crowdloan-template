import { ApiPromise, WsProvider } from '@polkadot/api';

export async function apiSetup() {
  try {
    const provider = new WsProvider('wss://westend-rpc.polkadot.io'); // test network
    // const provider = new WsProvider('wss://rpc.polkadot.io');

    const _api = await ApiPromise.create({ provider });

    if (_api) {
      console.log('Connection Success', _api);
      return _api;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getChainInfo(api: ApiPromise) {
  try {
    const chainInfo = await api.registry.getChainProperties();

    const chainName = await api.rpc.system.chain();

    return { chainInfo, chainName };
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
}) {
  try {
    const now = await api.query.timestamp.now();
    const { nonce, data: balance } = await api.query.system.account(
      targetAddress
    );

    console.log(
      'object :>> ',
      await api.rpc.chain.subscribeFinalizedHeads((item) => {
        console.log('first', JSON.stringify(item));
      })
    );

    const [{ nonce: accountNonce }, validators] = await Promise.all([
      api.query.system.account(targetAddress),
      api.query.session.validators(),
    ]);

    console.log(`accountNonce(${targetAddress}) ${accountNonce}`);
    console.log(`last block timestamp ${now.toNumber()}`);

    if (validators && validators.length > 0) {
      // Retrieve the balances for all validators
      const validatorBalances = await Promise.all(
        validators.map((authorityId) => api.query.system.account(authorityId))
      );

      // Print out the authorityIds and balances of all validators
      console.log(
        'validators',
        validators.map((authorityId, index) => ({
          address: authorityId.toString(),
          balance: validatorBalances[index].data.free.toHuman(),
          nonce: validatorBalances[index].nonce.toHuman(),
        }))
      );
    }

    // console.log('object :>> ', JSON.stringify(await api.query.balances.));

    console.log(
      `${now}: balance of ${balance.free.toHuman()} and a nonce of ${nonce}`
    );
    return { now, nonce, balance };
  } catch (err) {
    console.error(err);
  }
}
