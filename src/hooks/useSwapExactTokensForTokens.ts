import {useFetch} from "./useFetch.ts";
import {TokenName, TOKENS} from "../constants/tokens.ts";
import {useChainContext, useConnectedWalletContext} from "../contexts";
import {computeFloatToBigInt} from "../utils";
import {useState} from "react";
import {toast} from "react-toastify";
import {SWAP} from "../constants";

export const useSwapExactTokensForTokens = (tokenIn: TokenName, tokenOut: TokenName) => {
  const { publicClientActions, walletClientActions, tokenDecimals} = useChainContext()
  const { account } = useConnectedWalletContext()
  const [value, setValue] = useState<string>("0")
  const promise = async () => {
    const { request } = await publicClientActions.simulateContract({
      account,
      address: SWAP.UNISWAP_V2.router,
      abi: TOKENS.WBTC.abi || [],
      functionName: 'swapExactTokensForTokens',
      args: [computeFloatToBigInt(parseFloat(value), tokenDecimals), [tokenIn, tokenOut]]
    });
    return walletClientActions.writeContract(request) as unknown as void;
  };
  const swapExactTokensForTokens = (value: string) => {
    setValue(value)
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => promise(), {
    isEnabled: false,
    onError(err) {
      toast.error(err.message)
    }
  });
  return {
    swapExactTokensForTokens,
    ...fetchMethods
  };
};
