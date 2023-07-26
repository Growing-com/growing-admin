import { Checkbox, CheckboxProps } from "antd";
import { ForwardedRef, forwardRef } from "react";
import { tOptions } from "./dataEntryType";

export type tGRCheck = {
  options?: tOptions;
} & CheckboxProps;

const GRCheck = ({ options }: tGRCheck, _ref: ForwardedRef<HTMLDivElement>) => {
  return <Checkbox.Group options={options} />;
};

export default forwardRef(GRCheck);
