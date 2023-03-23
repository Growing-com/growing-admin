import { Button, ButtonProps } from "antd";
import React, { CSSProperties } from "react";
import { Color } from "styles/colors";

type tGRButton = {
  style: CSSProperties
} & ButtonProps

const GRButton : React.FC<tGRButton> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Button
      style={{
        backgroundColor:Color.green200,
        ...style,
        ...props
      }}
    >
      {children}
    </Button>
  )
}

export default GRButton;
