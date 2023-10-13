import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { TOKENS } from "../constants/tokens.ts";
import { assertAbiExists, assertAddressExists } from "../asserts";
import { toast } from "react-toastify";

export const useTransferTo = () => {
  const { walletClientActions, selectedToken, publicClientActions, tokenDecimals } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const [to, setTo] = useState<string>("");
  const promise = async () => {
    const address = TOKENS[selectedToken]?.address;
    const abi = TOKENS[selectedToken]?.abi;
    assertAddressExists(address);
    assertAbiExists(abi);

    try {
      const { request } = await publicClientActions.simulateContract({
        account,
        address,
        abi: abi,
        functionName: 'transfer',
        args: [to, computeFloatToBigInt(parseFloat(value), tokenDecimals)]
      });
      return walletClientActions.writeContract(request);
    } catch (e) {
      toast.error(`${e}`)
      throw e;
    }

  };

  const transfer = (to: string, value: string) => {
    setTo(to);
    setValue(value);
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => toast.promise(promise(), { pending: `Transferring...`, success: "Transferred!" }), { isEnabled: false });
  return {
    transfer,
    ...fetchMethods
  };
};
