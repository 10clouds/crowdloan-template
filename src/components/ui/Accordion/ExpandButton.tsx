import type { FC, DOMAttributes } from 'react';

interface Props {
  isExpanded: boolean;
  onClick: DOMAttributes<HTMLButtonElement>['onClick'];
  className?: string;
}

const animation = 'transition-all duration-200 ease-in-out';

const ExpandButton: FC<Props> = ({ isExpanded, onClick, className }) => {
  return (
    <button
      className={`${className} relative flex h-0.5 w-4 self-center p-4`}
      onClick={onClick}
    >
      <div className="absolute inset-auto h-0.5 w-4 bg-base"></div>
      <div
        className={`${animation} absolute inset-auto h-0.5 w-4 ${
          isExpanded ? 'rotate-0' : 'rotate-90'
        } bg-base`}
      ></div>
    </button>
  );
};

export default ExpandButton;
