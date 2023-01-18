import { FC, useState } from 'react';

interface Props {
  answer: string;
  question: string;
}

const AccordionItem: FC<Props> = ({ answer, question }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="w-fit max-w-fit border-b px-8 py-6">
      <span
        className={`text-3xl font-medium ${
          isExpanded && 'text-primary'
        } transition-all duration-300 ease-in-out`}
      >
        {question}
      </span>
      <button onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? '-' : '+'}
      </button>
      <div className={`${isExpanded ? 'h-auto' : 'h-0 overflow-hidden'}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
