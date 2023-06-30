import { Checkbox, CheckboxProps } from "antd";
import { FC } from "react";
import { tOptions } from "./dataEntryType";

export type tGRCheck = {
  options?: tOptions;
} & CheckboxProps;

const GRCheck: FC<tGRCheck> = ({ options }) => {
  return <Checkbox.Group options={options} />;
};

export default GRCheck;
