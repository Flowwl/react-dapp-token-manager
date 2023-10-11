export const computeFloatToBigInt = (value: number, decimals: bigint) => {
  return BigInt(value * Number(10n ** BigInt(decimals)));
}
