import { DateTime, DurationObjectUnits, DurationUnits } from 'luxon';

export function getDuration(
  date: string | Date,
  unit: DurationUnits = ['months', 'days', 'hours', 'minutes', 'seconds']
): DurationObjectUnits {
  const end = DateTime.fromISO(new Date(date).toISOString());
  const start = DateTime.fromISO(new Date().toISOString());
  const duration = end.diff(start, unit).toObject();
  return duration;
}
