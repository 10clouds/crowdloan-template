import Check from '@/components/Icons/Check';
import Close from '@/components/Icons/Close';
import { useIsModalVisible } from '@/store';

interface Props {
  title: string;
  description: string;
  isError?: boolean;
}

const FinalState = ({ title, description, isError = false }: Props) => {
  const { setIsModalOpen } = useIsModalVisible();

  return (
    <div className="flex h-full w-full min-w-[30vw] flex-col items-center justify-center gap-2 p-10">
      <div>{isError ? <Close /> : <Check />}</div>
      <div className="text-4xl font-medium tracking-tight">{title}</div>
      <div className={`text-center text-lg ${isError ? 'text-error' : ''}`}>
        {description}
      </div>
      <button
        className="base-button button-variant-default mt-4"
        onClick={() => setIsModalOpen(false)}
      >
        OK got it
      </button>
    </div>
  );
};

export default FinalState;
