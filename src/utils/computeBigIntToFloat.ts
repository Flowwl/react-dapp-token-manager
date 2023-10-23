export const computeBigIntToFloat = (value: bigint | number, decimals: bigint | number) => {
  return Number(value) / 10 ** Number(decimals);
}
