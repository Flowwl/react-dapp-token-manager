import { FC, useState } from 'react';
import cx from "classnames";
import Input from "../atoms/Input.tsx";
import Button from "../atoms/Button.tsx";
import { useTransferOwnership } from "../../hooks/useTransferOwnership.ts";
import { useRenounceOwnership } from "../../hooks/useRenounceOwnership.ts";
import { useGetOwner } from "../../hooks/useGetOwner.ts";
import { useChainContext, useConnectedWalletContext } from "../../contexts";
import { isAddressEqual } from "viem";

interface OwnershipSectionProps {
  className?: string;
}

const OwnershipSection: FC<OwnershipSectionProps> = ({ className }) => {
  const { selectedToken } = useChainContext();
  const { account } = useConnectedWalletContext();
  const { data: owner} = useGetOwner(selectedToken, { isEnabled: true  });
  const [transferOwnershipTo, setTransferOwnershipTo] = useState<string>("");
  const { transferOwnership } = useTransferOwnership();
  const { renounceOwnership } = useRenounceOwnership();


  if (! owner) { return null; }
  const isOwner = isAddressEqual(owner, account);
  if (! isOwner) { return null; }
  return (
    <>
      <form className={cx(className)} onSubmit={(e) => {
        e.preventDefault();
        transferOwnership(transferOwnershipTo);
      }}>
        <p>Transfer Ownership to</p>
        <div className="flex gap-4">
          <Input type="text" label="To" onChange={(e) => setTransferOwnershipTo(e.target.value)}/>
        </div>
        <Button type="submit">Transfer Ownership</Button>
      </form>
      <form className={className} onSubmit={(e) => {
        e.preventDefault();
        renounceOwnership();
      }}>
        <p>Renounce Ownership</p>
        <Button color="red" type="submit">Renounce Ownership</Button>
      </form>
    </>
  );
};

export default OwnershipSection;
