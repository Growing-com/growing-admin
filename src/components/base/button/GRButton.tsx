import { css } from "@emotion/react";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useMemo } from "react";
import { Color } from "styles/colors";
import GRText from "../text/GRText";
import { getMargin, tGetMargin } from "utils";
import { SerializedStyles } from "@emotion/react";

type tButtonSize = "large" | "normal" | "small"; 

type tGRButton = {
  style?: CSSProperties;
  isTextButton?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  textColor?: CSSProperties['color'];
  size?: tButtonSize;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
} & Omit<ButtonProps,"size"> & tGetMargin;

const GRButton : React.FC<tGRButton> = ({
  children,
  size = "normal", 
  style,
  onClick,
  type = "primary",
  backgroundColor,
  ghost,
  textColor,
  width,
  height,
  ...props
}) => {
  const _margin = getMargin(props);
  const _backgroundColor = useMemo(() => 
  {
    if( type === 'primary' ){
      return Color.green200;
    }
    return backgroundColor ?? Color.white;
  },[backgroundColor, type])

  const _textColor = useMemo(()=>{
    if( type === 'primary' ){
      return Color.white;
    }
    return textColor ?? Color.green200
  },[type, textColor])

  return (
    <Button
      type={type}
      onClick={onClick}
      css={css`
        background-color: ${_backgroundColor};
        ${BUTTON_SIZE_STYLE[size]};
        ${_margin};
        width: ${width};
        height: ${height};
      `}
      {...props}
    >
      <GRText color={_textColor}>
        {children}
      </GRText>
    </Button>
  );
}

export default GRButton;


export const BUTTON_SIZE_STYLE: Record<tButtonSize,SerializedStyles> = {
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
}