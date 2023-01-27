interface ConvertUnit {
  amount: number;
  chainDecimals: number;
}

export function convertUnit({ amount, chainDecimals }: ConvertUnit) {
  return amount * 10 ** chainDecimals;
}
