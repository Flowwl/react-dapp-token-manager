import { FC } from "react";
import cx from "classnames";

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className={cx(
        "w-6 h-6 border-2 border-gray-100 border-solid rounded-full animate-spin my-auto mx-auto",
        className
      )}
    />
  );
};

export default Spinner;
