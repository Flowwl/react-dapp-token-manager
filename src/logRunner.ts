import { HexString } from "./types";
import { Log } from "viem";

export async function logRunner(startingBlock: bigint, nbTarget: number, callback: (fromBlock: bigint, toBlock: bigint) => Promise<Log[]>) {
  const map: Record<HexString, Log> = {};

  let timedOut = false;
  setTimeout(() => {
    timedOut = true;
  }, 15 * 1000);

  let fromBlock = startingBlock - 1000n;
  let toBlock = startingBlock;
  while(Object.keys(map).length < nbTarget && fromBlock > 0n && !timedOut) {
    const res = await callback(fromBlock, toBlock);
    res.forEach(r => { if (r.transactionHash) { map[r.transactionHash] = r }});
    toBlock = fromBlock -1n;
    fromBlock -= 1000n;
  }

  return map
}
