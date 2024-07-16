import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useMemo } from "react";
import { Color } from "styles/colors";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import GRText, { tFontSizeType } from "../text/GRText";

export type tButtonSize = "large" | "normal" | "small";
export type tButtonType =
  | "default"
  | "primary"
  | "cancel"
  | "text"
  | "custom"
  | "blod"
  | "warning";
export type tGRButtonText = {
  style?: CSSProperties;
  isTextButton?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
  textColor?: CSSProperties["color"];
  borderColor?: CSSProperties["color"];
  size?: tButtonSize;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  buttonType?: tButtonType;
  textSize?: tFontSizeType;
  textWeight?: CSSProperties["fontWeight"];
} & Omit<ButtonProps, "size" | "type"> &
  tGetMargin;

type tType = "default" | "primary";

const GRButtonText: React.FC<tGRButtonText> = ({
  size = "normal",
  children,
  onClick,
  buttonType = "primary",
  backgroundColor,
  textColor,
  borderColor,
  width,
  height,
  textSize,
  textWeight,
  disabled,
  ...props
}) => {
  const _margin = getMargin(props);
  const _width = useMemo(
    () => (typeof width === "string" ? width : `${width}rem`),
    [width]
  );
  const _height = useMemo(
    () => (typeof height === "string" ? height : `${height}rem`),
    [height]
  );

  const _type = useMemo(
    () => (buttonType !== "primary" ? "default" : buttonType),
    [buttonType]
  );

  const _buttonTypeColor = useMemo(() => {
    const buttonProps = {
      type: buttonType,
      textColor,
      backgroundColor,
      borderColor
    };
    if (disabled) {
      buttonProps.textColor = Color.grey80;
      buttonProps.backgroundColor = Color.white;
      return buttonProps;
    }
    switch (buttonType) {
      case "custom":
        buttonProps.type = "default";
        break;
      case "blod":
        buttonProps.textColor = Color.black;
        buttonProps.backgroundColor = Color.white;
        buttonProps.borderColor = Color.black;
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
        buttonProps.textColor = Color.grey40;
        buttonProps.backgroundColor = Color.grey140;
        buttonProps.borderColor = "transparent";
        break;
      case "warning":
        buttonProps.textColor = Color.white;
        buttonProps.backgroundColor = Color.red100;
        buttonProps.borderColor = "transparent";
        break;
      case "text":
        buttonProps.textColor = Color.green200;
        break;
    }
    return buttonProps;
  }, [backgroundColor, borderColor, buttonType, disabled, textColor]);

  return (
    <ButtonCompon
      type={_type as tType}
      ghost={buttonType === "text"}
      onClick={onClick}
      css={css`
        background-color: ${_buttonTypeColor.backgroundColor};
        ${BUTTON_SIZE_STYLE[size]};
        ${_margin};
        width: ${_width};
        height: ${_height};
        border-color: ${_buttonTypeColor.borderColor};
      `}
      disabled={disabled}
      {...props}
    >
      <GRText
        weight={textWeight}
        fontSize={textSize}
        color={_buttonTypeColor.textColor}
      >
        {children}
      </GRText>
    </ButtonCompon>
  );
};

export default GRButtonText;

const ButtonCompon = styled(Button)`
  /* .ant-btn {
    .ant-btn-default {
      &:hover {
        background-color: white !important;
      }
    }
  } */
`;

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
