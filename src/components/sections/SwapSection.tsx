import {FC} from 'react';
import cx from "classnames"
import SwapForm from "./SwapForm.tsx";

interface SwapSectionProps {
  className?: string
}



// - NE PAS UTILISER LES FONCTIONS getAmountIn / getAmountOut / getAmountsIn / getAmountsOut du router, faire le calcul en js, car sinon cela consomme des requete rpc a chaque chiffre entré par l'utilisateur et cela ralenti enormement l'app (ceci dit, ces fonctions peuvent etre utilise lors du dev, pour verifier les valeurs)
// - verifier que le amountOut est plus petit que la reserve correspondante dans le cas de swapTokenForExactToken
// - verifier que le amountIn est plus petit ou egal a la balance de l'utilisateur
// - mettre un bouton "max" sur le token a vendre
const SwapSection: FC<SwapSectionProps> = ({className}) => {
  return (
    <div className={cx("bg-bg-700/70 rounded-lg shadow-xl m-auto w-1/2 px-8 pt-8 pb-12 overflow-y-auto", className)}>
      <h2 className="text-4xl font-title text-center">SWAP</h2>
      <SwapForm/>
    </div>
  );
};

export default SwapSection;
