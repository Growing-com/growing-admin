import { css } from "@emotion/react";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties } from "react";
import { Color } from "styles/colors";

type tGRButton = {
  style?: CSSProperties;
  onClick: () => React.MouseEventHandler<HTMLAnchorElement> | void;
}
 & ButtonProps
const GRButton : React.FC<tGRButton> = ({
  children,
  size,
  style,
  onClick,
  ...props
}) => {
  return (
    <Button
      type={'primary'}
      size={size}
      onClick={onClick}
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
