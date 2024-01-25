import GRText from "@component/atom/text/GRText";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
type tBoarder = {
  boarderWidth?: number;
  boarderHeight?: number;
  boarderTitle: string;
  borderContentComponent: ReactNode;
};
const Boarder: FC<tBoarder> = ({
  boarderWidth = 70,
  boarderTitle,
  borderContentComponent
}) => {
  return (
    <GRView
      width={boarderWidth}
      backgroundColor={Color.grey160}
      borderRadius={GRStylesConfig.BASE_RADIUS}
      paddingbottom={GRStylesConfig.BASE_LONG_MARGIN}
    >
      <GRView
        isFlex
        justifyContent={"start"}
        alignItems={"center"}
        height={3}
        borderColor={Color.grey120}
        customCss={css`
          border-top-right-radius: 1rem;
          border-top-left-radius: 1rem;
        `}
      >
        <GRText
          fontSize={"b6"}
          color={Color.blue80}
          weight={"bold"}
          marginleft={GRStylesConfig.BASE_LONG_MARGIN}
        >
          {boarderTitle ?? ""}
        </GRText>
      </GRView>
      <GRView
        height={30}
        backgroundColor={Color.grey160}
        borderRadius={0.5}
        paddinghorizontal={GRStylesConfig.BASE_LONG_MARGIN}
        style={{
          minHeight: "30rem",
          overflowY: "scroll"
        }}
        customCss={css`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        {borderContentComponent}
      </GRView>
    </GRView>
  );
};

export default Boarder;
