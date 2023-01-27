export function transferAmountValidator(value: number, min: number) {
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

export function transferFromValidator(accountInfo: {
  name: string;
  address: string;
}) {
  const { name, address } = accountInfo;
  if (!name && !address) {
    return 'This field is required';
  }
  return '';
}
