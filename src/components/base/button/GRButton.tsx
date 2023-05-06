import { css } from "@emotion/react";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useMemo } from "react";
import { Color } from "styles/colors";
import GRText from "../text/GRText";

type tGRButton = {
  style?: CSSProperties;
  isTextButton?: boolean;
  type?: "primary" | "dashed" | "text" | "link";
  backgroundColor?: CSSProperties['backgroundColor'];
  textColor?: CSSProperties['color'];
} & ButtonProps

const GRButton : React.FC<tGRButton> = ({
  children,
  size,
  style,
  onClick,
  type = "primary",
  backgroundColor,
  ghost,
  textColor,
  ...props
}) => {

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
      size={size}
      onClick={onClick}
      css={css`
        background-color: ${_backgroundColor};
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
