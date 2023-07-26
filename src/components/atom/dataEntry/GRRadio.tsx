import { Radio, RadioGroupProps } from "antd";
import { ForwardedRef, forwardRef } from "react";
import { tOptions } from "./dataEntryType";

export type tGRRadio = {
  options?: tOptions;
} & Omit<RadioGroupProps, "options">;

const GRRadio = (
  { options, ...props }: tGRRadio,
  _ref: ForwardedRef<HTMLDivElement>
) => {
  return <Radio.Group options={options} {...props} />;
};

export default forwardRef(GRRadio);
