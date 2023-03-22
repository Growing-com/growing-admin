import { Button, ButtonProps } from "@mui/material";
import React, { CSSProperties } from "react";
import { Color } from "styles/colors";

type tGRButton = {
  style: CSSProperties
} & ButtonProps

const GRButton : React.FC<tGRButton> = ({
  children,
  style,
}) => {
  return (
    <Button
      style={{
        backgroundColor:Color.green200,
        ...style
      }}
    >
      {children}
    </Button>
  )
}

export default GRButton;
