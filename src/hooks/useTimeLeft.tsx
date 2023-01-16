import { useState, useEffect } from 'react';

import type { DurationObjectUnits } from 'luxon';
import { getDuration } from '@/utils';

const defaultState = {
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function useTimeLeft(eventDate: Date | string): DurationObjectUnits {
  const [date, setDate] = useState<DurationObjectUnits>(defaultState);

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = getDuration(eventDate);
      setDate(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return date;
}
