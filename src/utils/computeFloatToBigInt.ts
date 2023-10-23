export const computeFloatToBigInt = (value: number, decimals: bigint) => {
  return BigInt(Math.trunc(value * (10 ** Number(decimals))));
}
