export function swapExactTokenForToken(amountIn: bigint, reserveIn: bigint, reserveOut: bigint) {
  const numerator = amountIn * 997n * reserveOut
  const denominator = (reserveIn * 1000n) + (amountIn * 997n)
  return numerator / denominator
}

export function swapTokenForExactToken(amountOut: bigint, reserveIn: bigint, reserveOut: bigint) {
  const numerator = reserveIn * amountOut * 1000n
  const denominator = (reserveOut - amountOut) * 997n;
  return (numerator / denominator) + 1n;
}
