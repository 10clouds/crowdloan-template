import { SITE } from '@/config';
import { convertUnit } from './convertUnit';

interface Props {
  chainDecimals: number;
  balance: number;
}

export function getRemaining({ chainDecimals, balance }: Props) {
  const leftTillCap =
    convertUnit({ amount: SITE.polkadotConfig.targetAmount, chainDecimals }) -
    balance;

  return leftTillCap / 10 ** chainDecimals;
}
