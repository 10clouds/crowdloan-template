import type { DOMAttributes } from 'react';

interface Props {
  onClick?: DOMAttributes<HTMLButtonElement>['onClick'];
}

const Close = ({ onClick }: Props) => {
  return (
    <button onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.34326 17.6567L17.657 6.34303"
          stroke="#131115"
          strokeWidth="2"
        />
        <path
          d="M17.6567 17.6567L6.34303 6.34303"
          stroke="#131115"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
};

export default Close;
