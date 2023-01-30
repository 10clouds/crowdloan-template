import { useState, useRef, Children, ReactNode } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface Props {
  label: string;
  placeholder?: string;
  value: () => string | ReactNode;
  children: ReactNode[];
  disabled?: boolean;
}

const Select = ({
  label = '',
  placeholder = '',
  value = () => '',
  children = [],
  disabled = false,
}: Props) => {
  const selectListRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const options = Children.toArray(children);

  useOnClickOutside(selectListRef, () => {
    setIsVisible(false);
  });
  return (
    <div>
      <label
        className="rounded-l-md py-3 px-4 text-xs text-gray-dark"
        htmlFor={label}
      >
        {label}
      </label>
      <div
        className={`relative inline-flex min-w-full justify-between rounded-2xl border border-gray bg-white focus-within:border-blue-500 ${
          isVisible && 'border-blue-500'
        }`}
        onClick={() => !disabled && setIsVisible((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-label="select"
        ref={selectListRef}
        id={label}
      >
        <label className="hover:bg-gray-50 rounded-l-md px-4 py-3 text-gray-600 hover:text-gray-700">
          {value() || placeholder}
        </label>

        <div>
          <button
            type="button"
            className={`hover:bg-gray-50 inline-flex h-full items-center justify-center rounded-r-md px-2  ${
              isVisible && 'rotate-180'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isVisible && (
            <ul className="absolute left-0 z-10 mt-1 max-h-60 w-full origin-top-right overflow-hidden overflow-y-auto rounded-2xl border border-gray bg-white">
              {options.map((optionNode, idx) => (
                <div
                  key={idx}
                  className="hover:bg-gray-50 block border-b-[1px] border-gray px-4 py-3 last-of-type:border-0 hover:cursor-pointer hover:bg-secondary first-of-type:hover:rounded-t-2xl  last-of-type:hover:rounded-b-2xl"
                >
                  {optionNode}
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
