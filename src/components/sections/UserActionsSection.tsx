import { FC, useState } from 'react';
import cx from "classnames";
import { useChainContext } from "../../contexts";
import { TOKENS } from "../../constants/tokens.ts";
import { useTransferTo } from "../../hooks/useTransferTo.ts";
import { useMint } from "../../hooks/useMint.ts";
import { useBurn } from "../../hooks/useBurn.ts";
import { useApproveTo } from "../../hooks/useApproveTo.ts";
import { useTransferFrom } from "../../hooks/useTransferFrom.ts";
import { useCheckAllowance } from "../../hooks/useCheckAllowance.ts";
import { computeBigIntToFloat } from "../../utils";
import Input from "../atoms/Input.tsx";
import Button from "../atoms/Button.tsx";
import { useTransferOwnership } from "../../hooks/useTransferOwnership.ts";
import { useRenounceOwnership } from "../../hooks/useRenounceOwnership.ts";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {
  const { selectedToken, tokenDecimals } = useChainContext();

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
  const [transferOwnershipTo, setTransferOwnershipTo] = useState<string>("");

  const { transfer } = useTransferTo();
  const { mint } = useMint();
  const { burn } = useBurn();
  const { approve } = useApproveTo();
  const { transferFrom } = useTransferFrom();
  const { transferOwnership } = useTransferOwnership();
  const { renounceOwnership } = useRenounceOwnership();
  const { checkAllowance } = useCheckAllowance({
    onSuccess: (allowance) => {
      alert(`User allowance: ${computeBigIntToFloat(allowance, tokenDecimals)} ${TOKENS[selectedToken].label}`);
    }
  });

  const formClass = "flex flex-col justify-between gap-5 flex-wrap";
  return (
    <div className={cx("bg-bg-700/70 rounded-lg  flex flex-col", className)}>
      <h2 className="self-center py-4 px-8 font-title text-3xl">Actions</h2>
      <div className="overflow-y-auto flex flex-col gap-4 pt-4 pb-8 px-8">
        <form className={formClass} onSubmit={(e) => {
          e.preventDefault();
          checkAllowance(allowanceOf);
        }}>
          <p>Check allowance of</p>
          <Input type="text" label="Of" onChange={(e) => setAllowanceOf(e.target.value)}/>
          <Button type={"submit"}>Check</Button>
        </form>
        {/* TODO Add error handling */}
        <form className={formClass} onSubmit={(e) => {
          e.preventDefault();
          transfer(transferTo, transferValue);
        }}>
          <p>Send transaction</p>
          <div className="flex gap-4">
            <Input type="text" label="To" onChange={(e) => setTransferTo(e.target.value)}/>
            <Input type="number" label="Value" step="0.000001" onChange={(e) => setTransferValue(e.target.value)}/>
          </div>
          <Button type={"submit"}>Send</Button>
        </form>
        <form className={formClass} onSubmit={(e) => {
          e.preventDefault();
          approve(approveTo, approveValue);
        }}>
          <p>Approve address</p>
          <div className="flex gap-4">
            <Input type="text" label="To" onChange={(e) => setApproveTo(e.target.value)}/>
            <Input type="number" step="0.000001" label="Value" onChange={(e) => setApproveValue(e.target.value)}/>
          </div>
          <Button type="submit">Approve</Button>
        </form>
        <form className={formClass} onSubmit={(e) => {
          e.preventDefault();
          transferFrom(transferFromFrom, transferFromTo, transferFromValue);
        }}>
          <p>Transfer from</p>
          <div className="flex gap-4 flex-wrap">
            <Input type="text" label="From" onChange={(e) => setTransferFromFrom(e.target.value)}/>
            <Input type="text" label="To" onChange={(e) => setTransferFromTo(e.target.value)}/>
            <Input
              label="Value"
              type="number"
              step="0.000001"
              onChange={(e) => setTransferFromValue(e.target.value)}
            />
          </div>
          <Button type="submit">Transfer</Button>
        </form>
        <form className={formClass} onSubmit={(e) => {
          e.preventDefault();
          burn(burnValue);
        }}>
          <p>Burn</p>
          <Input label="Value" type="number" step="0.000001" onChange={(e) => setBurnValue(e.target.value)}/>
          <Button type="submit">Burn</Button>
        </form>
        <form className={formClass} onSubmit={(e) => {
          e.preventDefault();
          mint(mintValue);
        }}>
          <p>Mint</p>
          <Input label="Value" type="number" step="0.000001" onChange={(e) => setMintValue(e.target.value)}/>
          <Button type="submit">Mint</Button>
        </form>
        <form className={formClass} onSubmit={(e) => {
          e.preventDefault();
          transferOwnership(transferOwnershipTo);
        }}>
          <p>Transfer Ownership to</p>
          <div className="flex gap-4">
            <Input type="text" label="To" onChange={(e) => setTransferOwnershipTo(e.target.value)}/>
          </div>
          <Button type="submit">Transfer Ownership</Button>
        </form>
        <form className={formClass} onSubmit={(e) => {
          e.preventDefault();
          renounceOwnership();
        }}>
          <p>Renounce Ownership</p>
          <Button color="red" type="submit">Renounce Ownership</Button>
        </form>
      </div>
    </div>
  );
};

export default UserActionsSection;
