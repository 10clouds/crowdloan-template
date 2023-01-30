import { InputHTMLAttributes, memo, forwardRef } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { FormData } from '../../types';

interface Props {
  label: string;
  name?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  currency?: string;
  disabled?: boolean;
  onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
  onBlur: InputHTMLAttributes<HTMLInputElement>['onBlur'];
}

const Input = forwardRef<
  HTMLInputElement,
  Props & ReturnType<UseFormRegister<FormData>>
>(
  (
    {
      label,
      name = '',
      type = 'text',
      placeholder = '',
      currency = 'DOT',
      disabled = false,
      onChange,
      onBlur,
    }: Props,
    ref
  ) => {
    return (
      <div>
        <label
          className="rounded-l-md py-3 px-4 text-xs opacity-50"
          htmlFor={label}
        >
          {label}
        </label>
        <div className="relative">
          <input
            placeholder={placeholder}
            type={type}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className="inline-flex w-full min-w-full rounded-2xl border border-gray bg-white px-4 py-3 focus-within:border-blue-500"
          />
          <div className="absolute top-0 bottom-0 right-4 flex items-center text-gray-dark">
            {currency}
          </div>
        </div>
      </div>
    );
  }
);

export default memo(Input);
