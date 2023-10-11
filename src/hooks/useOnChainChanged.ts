import { useChainContext } from "../contexts";

export const useOnChainChanged = () => {
  const { selectedChain } = useChainContext()

  window.ethereum?.on('chainChanged', (chainId) => {
    if (chainId !== `0x${selectedChain.id.toString(16)}`) {
      alert("Hey change your network to the correct one!")
    }
  })
}
