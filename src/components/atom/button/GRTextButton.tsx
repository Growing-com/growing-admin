import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useMemo, useState } from "react";
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

type tButtonProps = {
  type: tButtonType;
  textColor?: CSSProperties["color"];
  backgroundColor?: CSSProperties["backgroundColor"];
  borderColor?: CSSProperties["color"];
  hoverText?: CSSProperties["color"];
  hoverBackgroundColor?: CSSProperties["backgroundColor"];
  hoverBorderColor?: CSSProperties["color"];
};

const GRTextButton: React.FC<tGRButtonText> = ({
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
  const [isHovered, setIsHovered] = useState(false);

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

  const _buttonTypeColor = useMemo<tButtonProps>(() => {
    const buttonProps: tButtonProps = {
      type: buttonType,
      textColor,
      backgroundColor,
      borderColor,
      hoverText: undefined,
      hoverBackgroundColor: undefined,
      hoverBorderColor: undefined
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
        buttonProps.hoverText = Color.white;
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
        buttonProps.hoverText = Color.red100;
        buttonProps.hoverBackgroundColor = Color.white;
        buttonProps.hoverBorderColor = Color.red200;
        break;
      case "text":
        buttonProps.textColor = Color.green200;
        break;
    }
    return buttonProps;
  }, [backgroundColor, borderColor, buttonType, disabled, textColor]);

  return (
    <ButtonCompon
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type={_type as tType}
      ghost={buttonType === "text"}
      onClick={onClick}
      css={css`
        background-color: ${_buttonTypeColor.backgroundColor};
        border-color: ${_buttonTypeColor.borderColor};
        ${BUTTON_SIZE_STYLE[size]};
        ${_margin};
        height: ${_height};
        width: ${_width};

        &:hover {
          color: ${_buttonTypeColor.hoverText} !important;
          background-color: ${_buttonTypeColor.hoverBackgroundColor} !important;
          border-color: ${_buttonTypeColor.hoverBorderColor} !important;
        }
      `}
      disabled={disabled}
      {...props}
    >
      <GRText
        weight={textWeight}
        fontSize={textSize}
        color={
          isHovered ? _buttonTypeColor.hoverText : _buttonTypeColor.textColor
        }
      >
        {children}
      </GRText>
    </ButtonCompon>
  );
};

export default GRTextButton;

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
    width: 7rem;
    height: 2rem;
  `,
  large: css`
    width: 8rem;
    height: 2rem;
  `
};
