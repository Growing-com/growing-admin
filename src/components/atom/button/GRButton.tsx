import { SerializedStyles, css } from "@emotion/react";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useMemo } from "react";
import { Color } from "styles/colors";
import getMargin, { type tGetMargin } from "styles/css/getMargin";

type tButtonSize = "large" | "normal" | "small";

type tGRButton = {
  style?: CSSProperties;
  isTextButton?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
  textColor?: CSSProperties["color"];
  buttonSize?: tButtonSize;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  borderRadius?: CSSProperties["borderRadius"];
  buttonType?: "default" | "primary" | "cancel" | "custom";
} & ButtonProps &
  tGetMargin;

const GRButton: React.FC<tGRButton> = ({
  children,
  buttonSize,
  onClick,
  buttonType = "primary",
  backgroundColor,
  textColor,
  width,
  height,
  borderRadius,
  ...props
}) => {
  const _margin = getMargin(props);

  const _type = useMemo(() => {
    const buttonProps = { type: buttonType, textColor, backgroundColor };
    switch (buttonType) {
      case "custom":
        buttonProps.type = "default";
        break;
      case "default":
        buttonProps.textColor = Color.black;
        buttonProps.backgroundColor = Color.white;
        break;
      case "primary":
        buttonProps.textColor = Color.white;
        buttonProps.backgroundColor = Color.black100;
        break;
      case "cancel":
        buttonProps.textColor = Color.grey40;
        buttonProps.backgroundColor = Color.grey140;
        break;
    }
    return buttonProps;
  }, [backgroundColor, buttonType, textColor]);

  return (
    <Button
      onClick={onClick}
      css={css`
        background-color: ${_type.backgroundColor};
        ${buttonSize && BUTTON_SIZE_STYLE[buttonSize]};
        ${_margin};
        width: ${width};
        height: ${height};
        border-radius: ${borderRadius};
      `}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GRButton;

export const BUTTON_SIZE_STYLE: Record<tButtonSize, SerializedStyles> = {
  small: css`
    width: 3.9rem;
    height: 2rem;
  `,
  normal: css`
    width: 5.3rem;
    height: 2rem;
  `,
  large: css`
    width: 13rem;
    height: 2.5rem;
  `
};
