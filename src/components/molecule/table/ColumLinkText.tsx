import GRText from "@component/atom/text/GRText";
import GRView from "@component/atom/view/GRView";
import { FC } from "react";
import { Color } from "styles/colors";

type tColumLinkText = {
  text: string;
  onClick: () => void;
};

const ColumLinkText: FC<tColumLinkText> = ({ text, onClick }) => {
  return (
    <GRView
      justifyContent={"center"}
      style={{
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <GRText color={Color.green200} weight={"bold"} style={{
        textDecoration: "underline"
      }}>
        {text}
      </GRText>
    </GRView>
  );
};

export default ColumLinkText;
