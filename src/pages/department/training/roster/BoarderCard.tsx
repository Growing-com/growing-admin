import GRText from "@component/atom/text/GRText";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
type tBoarderCard = {
  boarderCardTitle: string;
};
const BoarderCard: FC<tBoarderCard> = ({ boarderCardTitle }) => {
  return (
    <GRView
      isFlex
      justifyContent={"center"}
      alignItems={"center"}
      height={5}
      marginbottom={GRStylesConfig.BASE_MARGIN}
      customCss={css`
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 3px;
        box-shadow: var(
          --ds-shadow-raised,
          0 1px 1px rgba(23, 43, 77, 0.2),
          0 0 1px rgba(23, 43, 77, 0.2)
        );
        transition: background-color 140ms ease-in-out 0s,
          color 140ms ease-in-out 0s;
        background-color: var(--ds-surface-raised, #ffffff);
        --jsw-card-background-color: var(--ds-surface-raised, #ffffff);
        color: var(--ds-text, #172b4d);
        filter: none;
      `}
    >
      <GRText>{boarderCardTitle ?? ""} </GRText>
    </GRView>
  );
};

export default BoarderCard;
