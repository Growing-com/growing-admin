import { Checkbox, CheckboxProps } from "antd";
import { tOptions } from "./type";

export type tGRCheck = {
  options?: tOptions;
} & CheckboxProps;

const GRCheck = ({ options }: tGRCheck) => {
  return <Checkbox.Group options={options} />;
};

export default GRCheck;
