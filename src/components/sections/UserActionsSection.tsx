import { FC, useState } from 'react';
import cx from "classnames";
import { useGetTotalSupply, useGetUserBalanceByToken } from "../../hooks";
import { useChainContext, useConnectedWalletContext } from "../../contexts";
import { TOKENS } from "../../constants/tokens.ts";
import { useTransferTo } from "../../hooks/useTransferTo.ts";
import Spinner from "../atoms/Spinner.tsx";
import { useMint } from "../../hooks/useMint.ts";
import { useBurn } from "../../hooks/useBurn.ts";
import { useApproveTo } from "../../hooks/useApproveTo.ts";
import { useTransferFrom } from "../../hooks/useTransferFrom.ts";
import { useCheckAllowance } from "../../hooks/useCheckAllowance.ts";
import { computeBigIntToFloat } from "../../utils";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {
  const { selectedToken, tokenDecimals } = useChainContext();
  const { address } = useConnectedWalletContext();

  const [transferTo, setTransferTo] = useState<string>("");
  const [transferValue, setTransferValue] = useState<string>("0");
  const [mintValue, setMintValue] = useState<string>("0");
  const [burnValue, setBurnValue] = useState<string>("0");
  const [approveTo, setApproveTo] = useState<string>("");
  const [approveValue, setApproveValue] = useState<string>("0");
  const [transferFromFrom, setTransferFromFrom] = useState<string>("");
  const [transferFromTo, setTransferFromTo] = useState<string>("");
  const [transferFromValue, setTransferFromValue] = useState<string>("0");
  const [allowanceOf, setAllowanceOf] = useState<string>("");

  const { data: totalSupply } = useGetTotalSupply(selectedToken);
  const { data: userBalance, isLoading: isBalanceLoading } = useGetUserBalanceByToken(address);
  const { transfer } = useTransferTo();
  const { mint } = useMint();
  const { burn } = useBurn();
  const { approve } = useApproveTo();
  const { transferFrom } = useTransferFrom();
  const { checkAllowance } = useCheckAllowance({
    onSuccess: (allowance) => {
        alert(`user allowance: ${computeBigIntToFloat(allowance, tokenDecimals)} ${TOKENS[selectedToken].label}`)
    }
  });

  return (
    <div className={cx(className)}>
      <div>Total Supply: {totalSupply || 0}</div>
      <div className="flex gap-2">
        Balance:
        {isBalanceLoading && <Spinner className={"ml-0"}/>}
        {!isBalanceLoading && <p>{userBalance || 0} ({TOKENS[selectedToken].label}) </p>}
      </div>
      {/* TODO */}
      <div className="flex flex-col gap-3">
        <h2 className="underline font-bold text-xl self-center">Actions</h2>
        <form className="flex justify-between gap-5" onSubmit={(e) => {
          e.preventDefault()
          checkAllowance(allowanceOf)
        }}>
          <p>Check allowance of</p>
          <input type="text" placeholder="0x..." onChange={(e) => setAllowanceOf(e.target.value)}/>
          <button type={"submit"}>Check</button>
        </form>
        {/* TODO Add error handling */}
        <form className="flex justify-between gap-5" onSubmit={(e) => {
          e.preventDefault()
          transfer(transferTo, transferValue)
        }}>
          <p>Send transaction</p>
          <input type="text" placeholder="0x..." onChange={(e) => setTransferTo(e.target.value)} pattern="0x[0-9a-f]*"/>
          <input type="number" placeholder="1.3" onChange={(e) => setTransferValue(e.target.value)} />
          <button type={"submit"}>Send</button>
        </form>
        <form className="flex justify-between gap-5" onSubmit={(e) => {
          e.preventDefault();
          approve(approveTo, approveValue)
        }}>
          <p>Approve address</p>
          <input type="text" placeholder="0x..." onChange={(e) => setApproveTo(e.target.value)}/>
          <input type="number" step="0.000001" placeholder="1234" onChange={(e) => setApproveValue(e.target.value)}/>
          <button type="submit">Approve</button>
        </form>
        <form className="flex justify-between gap-5" onSubmit={(e) => {
          e.preventDefault();
          transferFrom(transferFromFrom, transferFromTo, transferFromValue)
        }}>
          <p>Transfer from</p>
          <input type="text" placeholder="from" onChange={(e) => setTransferFromFrom(e.target.value)}/>
          <input type="text" placeholder="to" onChange={(e) => setTransferFromTo(e.target.value)}/>
          <input type="number" step="0.000001" placeholder="1234" onChange={(e) => setTransferFromValue(e.target.value)} />
          <button type="submit">Transfer</button>
        </form>
        <form className="flex justify-between gap-5" onSubmit={(e) => {
          e.preventDefault()
          burn(burnValue)
        }}>
          <p>Burn</p>
          <input type="number" step="0.000001" placeholder="1234" onChange={(e) => setBurnValue(e.target.value)}/>
          <button type="submit">Burn</button>
        </form>
        <form className="flex justify-between gap-5" onSubmit={(e) => {
          e.preventDefault()
          mint(mintValue)
        }}>
          <p>Mint</p>
          <input type="number" placeholder="1234" step="0.000001" onChange={(e) => setMintValue(e.target.value)}/>
          <button type="submit">Mint</button>
        </form>
      </div>
    </div>
  );
};

export default UserActionsSection;
