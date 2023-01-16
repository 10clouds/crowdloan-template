import type { FC } from 'react';
import { Fragment } from 'react';
import { useTimeLeft } from '@/hooks';

export interface Props {
  date: string | Date;
  variant?: TimerVariants;
}

type TimerVariants = keyof typeof mapVariants;

const mapVariants = {
  default: {
    timer: 'text-[40px] md:text-6xl',
    wrapper: 'w-16',
    colon:
      'text-[40px] leading-[14px] text-white md:text-6xl md:leading-[48px]',
    gap: 'gap-2',
  },
  big: {
    timer: 'text-[40px] md:text-[100px]',
    wrapper: 'w-8 md:w-20',
    colon:
      'text-[40px] leading-[14px] text-white md:text-[100px] md:leading-[68px]',
    gap: 'gap-2 md:gap-4',
  },
} as const;

const TimeLeftTimer: FC<Props> = ({ date, variant = 'default' }) => {
  const timeLeft = useTimeLeft(date);

  return (
    <div className={`flex h-fit ${mapVariants[variant].gap}`}>
      {Object.entries(timeLeft).map(([key, value], idx, arr) => (
        <Fragment key={key}>
          <div
            className={`flex ${mapVariants[variant].wrapper} flex-col items-center justify-center text-white`}
          >
            <div
              className={`text-[40px] font-medium md:text-6xl ${mapVariants[variant].timer}`}
            >
              {Math.floor(Number(value))}
            </div>
            <p className="text-sm">{key}</p>
          </div>
          {idx !== arr.length - 1 && (
            <p
              className={`font-medium  text-white ${mapVariants[variant].colon}`}
            >
              :
            </p>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default TimeLeftTimer;
