import { Radio, RadioGroupProps } from "antd";
import { tOptions } from "./type";

export type tGRRadio = {
  options?: tOptions[];
} & Omit<RadioGroupProps, "options">;

const GRRadio = ({ options, ...props }: tGRRadio) => {
  return <Radio.Group options={options} {...props} />;
};

export default GRRadio;
