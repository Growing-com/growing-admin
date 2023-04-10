import { css } from "@emotion/react";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties } from "react";
import { Color } from "styles/colors";

type tGRButton = {
  style: CSSProperties
} & ButtonProps

const GRButton : React.FC<tGRButton> = ({
  children,
  size,
  style,
  ...props
}) => {
  return (
    <Button
      type={'primary'}
      size={size}
      css={css`
        background-color: ${Color.green200}
      `}
      {...props}
    >
      {children}
    </Button>
  );
}

export default GRButton;
