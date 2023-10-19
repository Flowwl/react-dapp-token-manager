export function swapExactTokenForToken(amountIn: number, reserveIn: number, reserveOut: number) {
  const numerator = amountIn * 997 * reserveOut
  const denominator = (reserveIn * 1000) + (amountIn * 997)
  return numerator / denominator
}

export function swapTokenForExactToken(amountOut: number, reserveIn: number, reserveOut: number) {
  const numerator = reserveIn * amountOut * 1000
  const denominator = (reserveOut - amountOut) * 997;
  return (numerator / denominator) + 1;
}
