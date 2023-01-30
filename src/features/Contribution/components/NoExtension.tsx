import { useIsModalVisible } from '@/store';

const NoExtension = () => {
  const { setIsModalOpen } = useIsModalVisible();

  return (
    <div className="flex w-full min-w-[30vw] flex-col px-6 py-12">
      <div className="mx-auto flex-1 justify-center text-center">
        Please install extension from&nbsp;
        <a
          href="https://polkadot.js.org/extension/"
          className="text-center text-primary hover:underline"
        >
          Polkadot extension&nbsp;
        </a>
        to make transactions
      </div>
      <button
        className="base-button button-variant-default mx-auto mt-4"
        onClick={() => setIsModalOpen(false)}
      >
        OK got it
      </button>
    </div>
  );
};

export default NoExtension;
