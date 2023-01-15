import type { FC } from 'react';
import { Fragment } from 'react';
import { useCountdown } from '@/hooks';

interface Props {
  date: string | Date;
}

const CountdownTimer: FC<Props> = ({ date }) => {
  const timeLeft = useCountdown(date);

  return (
    <div className="mx-auto flex w-fit justify-center gap-4 rounded-t-xl bg-timer-gradient px-20 py-12 md:w-fit">
      {Object.entries(timeLeft).map(([key, value], idx, arr) => (
        <Fragment key={key}>
          <div className="flex w-16 flex-col items-center justify-center text-white">
            <div className="text-[40px] font-medium md:text-6xl">
              {Math.floor(Number(value))}
            </div>
            <span className="text-sm">{key}</span>
          </div>
          {idx !== arr.length - 1 && (
            <span className="text-[40px] font-medium leading-[14px] text-white md:text-6xl md:leading-[48px]">
              :
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;
