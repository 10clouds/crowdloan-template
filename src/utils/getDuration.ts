import { DateTime, DurationObjectUnits } from 'luxon';

export function getDuration(date: string | Date): DurationObjectUnits {
  const end = DateTime.fromISO(new Date(date).toISOString());
  const start = DateTime.fromISO(new Date().toISOString());
  const duration = end
    .diff(start, ['months', 'days', 'hours', 'minutes', 'seconds'])
    .toObject();
  return duration;
}
