export const formatBigInt = (value: bigint, decimals: bigint) => {
  return value / (10n ** decimals);
}
