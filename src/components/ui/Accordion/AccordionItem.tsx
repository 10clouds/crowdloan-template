import { FC, useState } from 'react';
import ExpandButton from './ExpandButton';

interface Props {
  answer: string;
  question: string;
}

const animation = 'transition-all duration-200 ease-in-out';

const AccordionItem: FC<Props> = ({ answer, question }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="w-fit max-w-fit border-b px-8 py-4 lg:py-6">
      <div className="flex justify-between">
        <label
          htmlFor={question}
          className={`text-2xl font-medium tracking-tight hover:cursor-pointer ${animation} lg:text-3xl ${
            isExpanded && 'text-primary'
          }`}
        >
          {question}
        </label>
        <ExpandButton
          id={question}
          className="ml-8 lg:ml-6"
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div
        className={`${animation} ${
          isExpanded ? 'h-auto pt-6' : 'h-0 overflow-hidden'
        }`}
      >
        <p className="text-lg opacity-70">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
