export const computeBigIntToFloat = (value: bigint | number, decimals: bigint | number) => {
  const res = Number(BigInt(value) * 100n / (BigInt(10) ** BigInt(decimals))) / 100;
  return parseFloat(res.toFixed(5))
}
