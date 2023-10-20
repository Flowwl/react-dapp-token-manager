import uniswapFactoryABI from "./abis/uniswap_factory_abi.json"
import uniswapRouterABI from "./abis/uniswap_router_abi.json"
import uniswapPairWBTC_BUSD_ABI from "./abis/uniswap_pair_wbtc_busd_abi.json"

export const SWAP = {
  UNISWAP_V2: {
    router: "0x3e5a0d21067f3507fc935d1581e89cf3ee531718",
    routerABI: uniswapRouterABI,
    factory: "0xfD171dB72120812Edbdb77f7A80ea0288FE4da38",
    factoryABI: uniswapFactoryABI,
    //0xE78410E1E0410429AEA83696A065DF1a6551c553
    pair_wbtc_busd: "0xE78410E1E0410429AEA83696A065DF1a6551c553",
    pair_wbtc_busd_ABI: uniswapPairWBTC_BUSD_ABI,
  }
} as const
