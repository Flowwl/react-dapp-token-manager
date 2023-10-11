export const computeBigIntToFloat = (value: bigint, decimals: bigint | number) => {
  return Number(BigInt(value) * 100n / (BigInt(10) ** BigInt(decimals))) / 100
}
