import { Button } from "@mui/material";
import { Color } from "styles/colors";

const GRButton = ({
  children,
  style
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
