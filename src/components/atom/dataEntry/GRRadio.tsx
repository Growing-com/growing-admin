import { Radio, RadioGroupProps } from "antd";
import { forwardRef } from "react";
import { tOptions } from "./type";

export type tGRRadio = {
  options?: tOptions[];
} & Omit<RadioGroupProps, "options">;

const GRRadio = forwardRef<HTMLDivElement, tGRRadio>(
  ({ options, ...props }: tGRRadio, ref) => {
    return <Radio.Group options={options} ref={ref} {...props} />;
  }
);

export default GRRadio;
