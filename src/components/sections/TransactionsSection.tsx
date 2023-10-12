import { FC } from 'react';
import cx from "classnames";

interface TransactionsSectionProps {
  className?: string;
}

const TransactionsSection: FC<TransactionsSectionProps> = ({ className }) => {

  return (
    <div className={cx("bg-bg-700 rounded-lg", className)}>
      <h2 className="text-xl self-center py-4 px-8">Transactions</h2>

      <div className="pt-4 pb-8 px-8">TransactionsSection</div>
    </div>
  );
};

export default TransactionsSection;
