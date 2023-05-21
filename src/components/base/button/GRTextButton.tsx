import { Button } from "antd";
import { Color } from "styles/colors";
import type { FC } from 'react';

type tGRTextButton = {
  text:string;
}

const GRTextButton: FC<tGRTextButton> = ({
  text
}) => {
  return (
    <Button
      style={{
        backgroundColor:Color.green200
      }}
    >
      {text}
    </Button>
  )
}

export default GRTextButton;
