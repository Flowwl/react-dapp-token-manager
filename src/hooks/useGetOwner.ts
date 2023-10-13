import { FetchOptions, useFetch } from "./useFetch.ts";
import { assertAbiExists, assertAddressExists } from "../asserts";
import { useChainContext } from "../contexts";
import { TokenName, TOKENS } from "../constants/tokens.ts";
import { HexString } from "../types";

export const useGetOwner = (token: TokenName, opts: Partial<FetchOptions<HexString | undefined>> = {}) => {
  const { publicClientActions} = useChainContext()
  const promise = async () => {
    const address = TOKENS[token].address
    const abi = TOKENS[token].abi
    assertAddressExists(address);
    assertAbiExists(abi);
    try {
      return publicClientActions.readContract({
        address,
        abi,
        functionName: "getOwner",
      }) as unknown as HexString;
    } catch (e) {
      console.error(e);
    }
  };
  const getOwner = () => {
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts });
  return {
    getOwner,
    ...fetchMethods
  };
};
