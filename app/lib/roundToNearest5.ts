export const roundToNearest5 = (num: number) => {
  const newNum = Math.round(num / 5) * 5;
  return newNum;
};
