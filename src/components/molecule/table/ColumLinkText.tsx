import GRButtonText from "@component/atom/button/GRTextButton";
import GRView from "@component/atom/view/GRView";
import { FC } from "react";

type tColumLinkText = {
  text: string;
  onClick: () => void;
};

const ColumLinkText: FC<tColumLinkText> = ({ text, onClick }) => {
  return (
    <GRView>
      <GRButtonText
        onClick={onClick}
        textSize={"b7"}
        textWeight={"bold"}
        buttonType={"text"}
      >
        {text}
      </GRButtonText>
    </GRView>
  );
};

export default ColumLinkText;
