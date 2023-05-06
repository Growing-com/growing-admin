import { css } from "@emotion/react";
import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useMemo } from "react";
import { Color } from "styles/colors";
import GRText from "../text/GRText";

type tGRButton = {
  style?: CSSProperties;
  isTextButton?: boolean;
  buttonType?: "primary" | "dashed" | "text" | "link";
  backgroundColor?: CSSProperties['backgroundColor'];
  textColor?: CSSProperties['color'];
} & ButtonProps

const GRButton : React.FC<tGRButton> = ({
  children,
  size,
  style,
  onClick,
  buttonType = "primary",
  backgroundColor,
  ghost,
  textColor,
  ...props
}) => {

  const _backgroundColor = useMemo(() => 
  {
    if( buttonType === 'primary' ){
      return Color.green200;
    }
    return backgroundColor ?? Color.white;
  },[backgroundColor, buttonType])

  const _textColor = useMemo(()=>{
    if( buttonType === 'primary' ){
      return Color.white;
    }
    return textColor ?? Color.green200
  },[buttonType, textColor])

  return (
    <Button
      type={buttonType}
      size={size}
      onClick={onClick}
      css={css`
        background-color: ${_backgroundColor};
        color: ${_textColor};
      `}
      {...props}
    >
      <GRText color={Color.white}>
        {children}
      </GRText>
    </Button>
  );
}

export default GRButton;
