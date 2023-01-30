import Loading from '@/components/Icons/Loading';
import type { ISubmittableResult } from '@polkadot/types/types';

interface Props {
  transactionStatus: ISubmittableResult;
}

const LoadingWithProgress = ({ transactionStatus }: Props) => {
  return (
    <div className="flex h-full w-full min-w-[30vw] flex-col items-center justify-center p-10">
      <Loading />
      <div className="mt-2 text-3xl font-medium tracking-tight">
        Processing...
      </div>
      <div className="mt-4">
        {Object.keys(transactionStatus.status.toHuman() ?? {}).map((status) => (
          <div key={status} className="flex ">
            Current Status - {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingWithProgress;
