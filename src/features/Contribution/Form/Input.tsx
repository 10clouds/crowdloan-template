import type { InputHTMLAttributes } from 'react';
import { memo } from 'react';

interface Props {
  label: string;
  value: string | number;
  handleInputChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  required?: boolean;
  currency?: string;
}

const Input = ({
  label,
  value,
  handleInputChange,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  currency = 'DOT',
}: Props) => {
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
          id={name}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={handleInputChange}
          className="inline-flex w-full min-w-full rounded-2xl border border-gray bg-white px-4 py-3 focus-within:border-blue-500"
        />
        <div className="absolute top-0 bottom-0 right-4 flex items-center text-gray-dark">
          {currency}
        </div>
      </div>
    </div>
  );
};

export default memo(Input);
