import { FC, useState } from 'react';
import cx from "classnames";
import { useGetTotalSupply, useGetUserBalanceByToken } from "../../hooks";
import { useChainContext, useConnectedWalletContext } from "../../contexts";
import { TOKENS } from "../../constants/tokens.ts";
import { useTransferTo } from "../../hooks/useTransferTo.ts";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {
  const { selectedToken } = useChainContext();
  const { address } = useConnectedWalletContext();

  const [transferTo, setTransferTo] = useState<string>("")
  const [value, setValue] = useState<string>("0")

  const { data: totalSupply } = useGetTotalSupply(selectedToken);
  const { data: userBalance } = useGetUserBalanceByToken(address, selectedToken);
  const { transfer } = useTransferTo();

  return (
    <div className={cx(className)}>
      <div>Total Supply: {totalSupply || 0}</div>
      <div>Balance: {userBalance || 0} ({TOKENS[selectedToken].label})</div>
      {/* TODO */}
      <div className="flex flex-col gap-3">
        <h2 className="underline font-bold text-xl self-center">Actions</h2>
        {/* TODO */}
        <div className="flex justify-between gap-5">
          <p>Check Allowance of a spender</p>
          <input type="text" placeholder="0x..."/>
          <button>Check</button>
        </div>
        {/* FIXME */}
        <div className="flex justify-between gap-5">
          <p>Send transaction</p>
          <input type="text" placeholder="0x..." value={transferTo} onChange={(e) => setTransferTo(e.target.value)}/>
          <input type="number" placeholder="1.3" value={value} onChange={(e) => setValue(e.target.value)}/>
          <button onClick={() => transfer(transferTo, value)}>Send</button>
        </div>
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
