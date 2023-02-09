import { useState, useEffect } from 'react';

import type { DurationObjectUnits } from 'luxon';
import { getDuration } from '@/utils';

const defaultState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function useTimeLeft(eventDate: Date | string): DurationObjectUnits {
  const [timeLeft, setTimeLeft] = useState<DurationObjectUnits>(defaultState);

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = getDuration(eventDate);
      setTimeLeft(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return timeLeft;
}
