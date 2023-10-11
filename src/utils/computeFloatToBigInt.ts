export const computeFloatToBigInt = (value: number, decimals: bigint) => {
  return BigInt(value * (10 ** Number(decimals)));
}
