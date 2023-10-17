import { FC } from "react";
import cx from "classnames";
import "./Spinner.scss";

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  const areParticlesVisible = localStorage.getItem("particlesActivated") === "true";
  if (areParticlesVisible) {
    return (
      <div className={cx(className, "my-auto mx-auto mt-5", "spinner")}>
        <div className="spinnerin"></div>
      </div>
    );
  }
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
