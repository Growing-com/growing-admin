import { Switch, type SwitchProps } from "antd";
import { FC } from "react";
import GRText from "../text/GRText";

export type tGRSwitch = {
  checkedText?: string;
  unCheckedText?: string;
} & SwitchProps;

const GRSwitch: FC<tGRSwitch> = ({
  checked,
  disabled,
  checkedText = "",
  unCheckedText = "",
  ...props
}) => {
  return (
    <Switch
      checkedChildren={<GRText>{checkedText}</GRText>}
      unCheckedChildren={<GRText>{unCheckedText}</GRText>}
      checked={checked}
      disabled={disabled}
      {...props}
    />
  );
};

export default GRSwitch;
