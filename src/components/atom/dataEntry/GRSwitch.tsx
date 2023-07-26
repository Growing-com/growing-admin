import { Switch, type SwitchProps } from "antd";
import { ForwardedRef, forwardRef } from "react";
import GRText from "../text/GRText";

export type tGRSwitch = {
  checkedText?: string;
  unCheckedText?: string;
} & SwitchProps;

const GRSwitch = (
  {
    checked,
    disabled,
    checkedText = "",
    unCheckedText = "",
    ...props
  }: tGRSwitch,
  _ref: ForwardedRef<HTMLDivElement>
) => {
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

export default forwardRef(GRSwitch);
