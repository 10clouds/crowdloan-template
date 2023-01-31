import { SITE } from '@/config';
import type { Balance } from '@polkadot/types/interfaces/runtime';

import { convertUnit } from './convertUnit';

interface Props {
  chainDecimals: number;
  balance?: Balance;
}

export function getRemaining({ chainDecimals, balance }: Props) {
  const leftTillCap =
    convertUnit({ amount: SITE.polkadotConfig.targetAmount, chainDecimals }) -
    Number(balance);

  return leftTillCap / 10 ** chainDecimals;
}
