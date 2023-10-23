import { FetchOptions, useFetch } from "./useFetch.ts";
import { SWAP, TOKENS } from "../constants";
import { useChainContext, useConnectedWalletContext } from "../contexts";
import { computeFloatToBigInt } from "../utils";
import { toast } from "react-toastify";
import { useSwapContext } from "../contexts/SwapContext.tsx";
import { assertAddressExists } from "../asserts";

export const useSwapTokensForTokens = (opt: Partial<FetchOptions<void>> = {}) => {
  const {publicClientActions, walletClientActions, webSocketPublicClientActions} = useChainContext()
  const {swapTokens, tokenMode} = useSwapContext()
  const {account} = useConnectedWalletContext()
  const promise = async () => {
    const toastId = toast.loading("Swapping In Progress...", { autoClose: false, isLoading: true })
    const address = TOKENS[swapTokens.IN.token].address;
    const abi = TOKENS[swapTokens.IN.token]?.abi || [];
    assertAddressExists(address);

    toast.update(toastId, { render: "Asking for allowance...", autoClose: false, isLoading: true })
    try {
      const allowance = await publicClientActions.readContract({
        address, abi, functionName: 'allowance',
        args: [account, SWAP.UNISWAP_V2.router]
      }) as bigint;

      const amountIn = computeFloatToBigInt(parseFloat(swapTokens.IN.amount), swapTokens.IN.decimals)
      const amountOut = computeFloatToBigInt(parseFloat(swapTokens.OUT.amount), swapTokens.OUT.decimals)
      const getDeadline = () => Date.now() + 1000 * 60 * 10
      console.log(allowance, amountIn, allowance < amountIn)
      if (allowance < amountIn) {
        const {request} = await publicClientActions.simulateContract({
          account, address, abi, functionName: 'approve',
          args: [SWAP.UNISWAP_V2.router, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"]
        });
        const txHash = await walletClientActions.writeContract(request)
        toast.update(toastId, {render: "Waiting for transaction to be mined...", autoClose: false, isLoading: true})
        await webSocketPublicClientActions.waitForTransactionReceipt({hash: txHash, confirmations: 1})
      }

      toast.update(toastId, {render: "Asking for swap approval...", autoClose: false, isLoading: true})

      if (tokenMode === "IN") {
        const {request} = await publicClientActions.simulateContract({
          account,
          address: SWAP.UNISWAP_V2.router,
          abi: SWAP.UNISWAP_V2.routerABI,
          functionName: 'swapExactTokensForTokens',
          args: [amountIn, amountOut, [TOKENS[swapTokens.IN.token].address, TOKENS[swapTokens.OUT.token].address], account, getDeadline()]
        });
        const txHash = await walletClientActions.writeContract(request);
        toast.update(toastId, {render: "Waiting for transaction to be mined...", autoClose: false, isLoading: true})
        await webSocketPublicClientActions.waitForTransactionReceipt({hash: txHash, confirmations: 1})
      } else if (tokenMode === "OUT") {
        const {request} = await publicClientActions.simulateContract({
          account,
          address: SWAP.UNISWAP_V2.router,
          abi: SWAP.UNISWAP_V2.routerABI,
          functionName: 'swapTokensForExactTokens',
          args: [amountOut, amountIn, [TOKENS[swapTokens.IN.token].address, TOKENS[swapTokens.OUT.token].address], account, getDeadline()]
        });
        const txHash = await walletClientActions.writeContract(request);
        toast.update(toastId, {render: "Waiting for transaction to be mined...", autoClose: false, isLoading: true})
        await webSocketPublicClientActions.waitForTransactionReceipt({hash: txHash, confirmations: 1})
      }

      toast.update(toastId, {render: "Swap successful", autoClose: 500, isLoading: false, type: "success"})
    } catch (err) {
      toast.update(toastId, {render: "Swap failed", autoClose: 500, isLoading: false, type: "error"})
      throw err
    }
  }
  const swapTokensForTokens = () => {
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => promise(), {
    isEnabled: false,
    onError(err) {
      toast.error(err.message)
    },
    ...opt
  });
  return {
    swapTokensForTokens,
    ...fetchMethods
  };
};
