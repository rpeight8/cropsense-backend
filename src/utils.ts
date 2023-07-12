export const isValidUTCDateString = (value: string) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && value === date.toISOString();
};
