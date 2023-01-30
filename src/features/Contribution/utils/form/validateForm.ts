import { transferAmountValidator, transferFromValidator } from './validators';

export function validateForm(
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
