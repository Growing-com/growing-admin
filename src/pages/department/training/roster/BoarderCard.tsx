import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
type tBoarderCard = {
  boarderCardTitle?: string;
  isSelected?: boolean;
  cardContainComponent?: ReactNode;
};
const BoarderCard: FC<tBoarderCard> = ({
  boarderCardTitle,
  isSelected,
  cardContainComponent
}) => {
  return (
    <GRView
      isFlex
      height={5}
      isBoard={isSelected}
      marginbottom={GRStylesConfig.BASE_MARGIN}
      borderRadius={GRStylesConfig.BASE_RADIUS}
      customCss={css`
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        position: relative;
        box-shadow: 0 1px 1px rgba(23, 43, 77, 0.2),
          0 0 1px rgba(23, 43, 77, 0.2);
        transition: background-color 140ms ease-in-out 0s,
          color 140ms ease-in-out 0s;
        background-color: #ffffff;
        --jsw-card-background-color: #ffffff;
        color: #172b4d;
        filter: none;
        border: 0.1rem solid transparent;
        :hover {
          border: 0.1rem solid ${Color.green200};
        }
      `}
    >
      {cardContainComponent ? (
        cardContainComponent
      ) : (
        <GRFlexView justifyContent={"center"} alignItems={"center"}>
          <GRText weight={"bold"} fontSize={"b5"}>
            {boarderCardTitle ?? ""}{" "}
          </GRText>
        </GRFlexView>
      )}
    </GRView>
  );
};

export default BoarderCard;
