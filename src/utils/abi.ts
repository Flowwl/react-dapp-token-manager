import abi from "./abi.json"
import { Abi } from "viem";
import { assertIsAbi } from "../asserts";

export const getAbi = (): Abi => {
  assertIsAbi(abi);
  return abi
}
