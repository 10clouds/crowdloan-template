import { useIsModalVisible } from '@/store';

interface Props {
  title: string;
  description: string;
  isError?: boolean;
}

const FinalState = ({ title, description, isError = false }: Props) => {
  const { setIsModalOpen } = useIsModalVisible();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="text-4xl font-medium tracking-tight">{title}</div>
      <div className={`text-center text-lg ${isError ? 'text-error' : ''}`}>
        {description}
      </div>
      <button
        className="base-button button-variant-default"
        onClick={() => setIsModalOpen(false)}
      >
        OK got it
      </button>
    </div>
  );
};

export default FinalState;
