import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";
import { toast } from "react-toastify";

export const useApproveTo = () => {
  const { walletClientActions, selectedToken, publicClientActions, tokenDecimals} = useChainContext();
  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0")
  const [to, setTo] = useState<string>("")
  const promise = async () => {
    const address = TOKENS[selectedToken].address
    assertAddressExists(address);
    try {
      const { request } = await publicClientActions.simulateContract({
        account,
        address: address,
        abi: TOKENS[selectedToken]?.abi || [],
        functionName: 'approve',
        args: [to, computeFloatToBigInt(parseFloat(value), tokenDecimals)]
      });
      return walletClientActions.writeContract(request);
    }
    catch (e) {
      toast.error(`${e}`)
      throw e
    }
  };

  const approve = (to: string, value: string) => {
    setTo(to);
    setValue(value);
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => toast.promise(promise(), { pending: "Approving...", success: "Approved!" }), { isEnabled: false })
  return {
    approve,
    ...fetchMethods
  }
};
