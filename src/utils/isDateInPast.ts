export const isDateInPast = (date: Date | string): boolean => {
  const currentTimestamp = new Date().getTime();
  const dateTimestamp = new Date(date).getTime();

  return currentTimestamp > dateTimestamp;
};
