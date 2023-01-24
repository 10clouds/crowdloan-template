import type { InputHTMLAttributes } from 'react';

interface Props {
  errorMessage?: string;
  label: string;
  value: string | number;
  handleInputChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
}

const Input = ({
  errorMessage,
  label,
  value,
  handleInputChange,
  name,
  type = 'text',
  placeholder = '',
}: Props) => {
  return (
    <div>
      <label
        className="rounded-l-md py-3 px-4 text-xs opacity-50"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="">
        <input
          id={name}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          className="inline-flex w-full min-w-full rounded-2xl border border-gray bg-white px-4 py-3 focus-within:border-blue-500"
        />
        <div className="error">{errorMessage && errorMessage[0]}</div>
      </div>
    </div>
  );
};

export default Input;
