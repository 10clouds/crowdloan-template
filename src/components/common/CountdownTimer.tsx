import type { FC } from 'react';
import { useCountdown } from '@/hooks';

interface Props {
  date: string | Date;
}

const CountdownTimer: FC<Props> = ({ date }) => {
  // this date should be imported from config file
  const timeLeft = useCountdown(date);

  return (
    <div className="mx-auto flex w-[524px] justify-center gap-4 rounded-t-xl bg-timer-gradient px-20 py-12">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div
          key={key}
          className="flex flex-col items-center justify-center text-white"
        >
          <div className="text-6xl font-medium">
            {Math.floor(Number(value))}
          </div>
          <span className="text-sm"></span>
          {key}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
