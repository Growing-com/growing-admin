import { Button } from "antd";
import { Color } from "styles/colors";

const GRTextButton = ({
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
