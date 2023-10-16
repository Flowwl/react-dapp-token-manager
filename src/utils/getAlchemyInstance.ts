import { ENV_CONFIG } from "../config.ts";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: ENV_CONFIG.ALCHEMY_API_KEY,
}
export const getAlchemyInstance = (network: Network) => {
  return new Alchemy({
    ...settings,
    network
  })
}
