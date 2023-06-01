import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useMemo } from "react";
import { Color } from "styles/colors";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import GRText from "../text/GRText";

type tButtonSize = "large" | "normal" | "small";

type tGRButtonText = {
  style?: CSSProperties;
  isTextButton?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
  textColor?: CSSProperties["color"];
  borderColor?: CSSProperties["color"];
  size?: tButtonSize;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  buttonType?: "default" | "primary" | "cancel" | "text" | "custom";
} & Omit<ButtonProps, "size" | "type"> &
  tGetMargin;

type tType = "default" | "primary";

const GRButtonText: React.FC<tGRButtonText> = ({
  size = "normal",
  children,
  style,
  onClick,
  buttonType = "primary",
  backgroundColor,
  ghost,
  textColor,
  borderColor,
  width,
  height,
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
    () =>
      buttonType !== "default" || buttonType !== "primary"
        ? "default"
        : buttonType,
    []
  );

  const _buttonTypeColor = useMemo(() => {
    let buttonProps = {
      type: buttonType,
      textColor,
      backgroundColor
    };
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
      case "text":
        buttonProps.textColor = Color.green200;
        break;
    }
    return buttonProps;
  }, [backgroundColor, buttonType, textColor]);

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
      `}
      {...props}
    >
      <GRText color={_buttonTypeColor.textColor}>{children}</GRText>
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
