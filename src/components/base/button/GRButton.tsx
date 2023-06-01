import { SerializedStyles, css } from "@emotion/react";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useMemo } from "react";
import { Color } from "styles/colors";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import GRText from "../text/GRText";

type tButtonSize = "large" | "normal" | "small";

type tGRButton = {
  style?: CSSProperties;
  isTextButton?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
  textColor?: CSSProperties["color"];
  size?: tButtonSize;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  buttonType?: "default" | "primary" | "cancel" | "custom";
} & Omit<ButtonProps, "size"> &
  tGetMargin;

type tType = "default" | "primary";

const GRButton: React.FC<tGRButton> = ({
  children,
  size = "normal",
  style,
  onClick,
  buttonType = "primary",
  backgroundColor,
  ghost,
  textColor,
  width,
  height,
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
        buttonProps.textColor = Color.green200;
        buttonProps.backgroundColor = Color.white;
        break;
      case "primary":
        buttonProps.textColor = Color.white;
        buttonProps.backgroundColor = Color.green200;
        break;
      case "cancel":
        buttonProps.textColor = Color.grey30;
        buttonProps.backgroundColor = Color.grey20;
        break;
    }
    return buttonProps;
  }, [backgroundColor, buttonType, textColor]);

  return (
    <Button
      onClick={onClick}
      css={css`
        background-color: ${_type.backgroundColor};
        ${BUTTON_SIZE_STYLE[size]};
        ${_margin};
        width: ${width};
        height: ${height};
      `}
      {...props}
    >
      <GRText color={_type.textColor}>{children}</GRText>
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
    width: 8rem;
    height: 2rem;
  `
};
