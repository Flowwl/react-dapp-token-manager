import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import cx from "classnames";
import "./Slider.scss";

const Slider: FC<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">> = ({className, onChange, ...props}) => {
    return (
      <div className={cx("flex gap-2 items-center slider", className)}>
        <input type="range" {...props} onChange={onChange} className="bg-gray-300 w-2/3 level"/>
        {props.value !== undefined && (
          <p className="text-gray-400 text-sm text-center">
            {parseFloat(props.value.toString()).toFixed(1)}%
          </p>
        )}
      </div>
    );
  }
;

export default Slider;
