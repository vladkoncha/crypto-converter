export const convertCurrency = (
  fromValue: number,
  fromRate: number,
  toRate: number
) => {
  return Math.round((fromValue / toRate) * fromRate * 1e8) / 1e8;
};
