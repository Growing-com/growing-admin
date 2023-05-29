import { Radio, RadioGroupProps } from "antd";
import { FC } from "react";
import { tOptions } from "./dataEntryType";

export type tGRRadio = {
  options?: tOptions;
} & Omit<RadioGroupProps, "options">;

const GRRadio: FC<tGRRadio> = ({ options }) => {
  return <Radio.Group options={options} />;
};

export default GRRadio;
