import { FC, useState } from 'react';
import cx from "classnames";
import { useGetTotalSupply, useGetUserBalanceByToken } from "../../hooks";
import { useChainContext, useConnectedWalletContext } from "../../contexts";
import { TOKENS } from "../../constants/tokens.ts";
import { useTransferTo } from "../../hooks/useTransferTo.ts";
import Spinner from "../atoms/Spinner.tsx";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {
  const { selectedToken } = useChainContext();
  const { address } = useConnectedWalletContext();

  const [transferTo, setTransferTo] = useState<string>("");
  const [value, setValue] = useState<string>("0");

  const { data: totalSupply } = useGetTotalSupply(selectedToken);
  const { data: userBalance, isLoading: isBalanceLoading } = useGetUserBalanceByToken(address);
  const { transfer } = useTransferTo();

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
        {/* TODO */}
        <div className="flex justify-between gap-5">
          <p>Check Allowance of a spender</p>
          <input type="text" placeholder="0x..."/>
          <button>Check</button>
        </div>
        {/* TODO Add error handling */}
        <form className="flex justify-between gap-5" onSubmit={() => transfer(transferTo, value)}>
          <p>Send transaction</p>
          <input type="text" placeholder="0x..." value={transferTo} onChange={(e) => setTransferTo(e.target.value)} pattern="0x[0-9a-f]*"/>
          <input type="number" placeholder="1.3" value={value} onChange={(e) => setValue(e.target.value)} />
          <button type={"submit"}>Send</button>
        </form>
        {/* FIXME */}
        <div className="flex justify-between gap-5">
          <p>Approve address</p>
          <input type="text" placeholder="0x..."/>
          <button>Approve</button>
        </div>
        {/* FIXME */}
        <div className="flex justify-between gap-5">
          <p>Transfer from</p>
          <input type="text" placeholder="0x..."/>
          <button>Approve</button>
        </div>
        {/* FIXME */}
        <div className="flex justify-between gap-5">
          <p>Burn</p>
          <input type="text" placeholder="0x..."/>
          <button>Burn</button>
        </div>
        {/* FIXME */}
        <div className="flex justify-between gap-5">
          <p>Mint</p>
          <input type="text" placeholder="0x..."/>
          <button>Mint</button>
        </div>
      </div>
    </div>
  );
};

export default UserActionsSection;
