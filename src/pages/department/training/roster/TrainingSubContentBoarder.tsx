import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRStylesConfig from "styles/GRStylesConfig";
import Boarder from "./Boarder";
import BoarderCard from "./BoarderCard";
import { Color } from "styles/colors";
import { FC } from "react";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";

type tTrainingSubContentBoarder = {
  subTrainingContent: any[];
  onClickTraining: () => void;
};

const TrainingSubContentBoarder: FC<tTrainingSubContentBoarder> = ({
  subTrainingContent,
  onClickTraining
}) => {
  if (!subTrainingContent?.length) {
    return (
      <Boarder
        boarderTitle={"훈련 이름"}
        boarderWidth={20}
        borderContentComponent={
          <BoarderCard
            boarderHeight={3}
            isSelected={false}
            cardContainComponent={
              <GRFlexView
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                paddingleft={GRStylesConfig.BASE_MARGIN}
              >
                <PlusOutlined rev={undefined} style={{ fontWeight: "bold" }} />
                <GRText marginleft={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
                  명부 생성
                </GRText>
              </GRFlexView>
            }
          />
        }
      />
    );
  }
  return (
    <Boarder
      boarderTitle={"훈련 이름"}
      boarderWidth={20}
      borderContentComponent={subTrainingContent?.map(content => (
        <>
          <BoarderCard
            isSelected={false}
            cardContainComponent={
              <>
                <GRFlexView
                  flexDirection={"row"}
                  paddinghorizontal={GRStylesConfig.BASE_LONG_MARGIN}
                >
                  <GRFlexView
                    justifyContent={"center"}
                    alignItems={"start"}
                    onClick={() => onClickTraining(content)}
                  >
                    <GRText weight={"bold"} fontSize={"b5"}>
                      {content.title ?? ""}{" "}
                    </GRText>
                    <GRText
                      weight={"bold"}
                      color={Color.grey80}
                      fontSize={"b8"}
                    >
                      {/* {`${content.rangeDate[0]} ~ ${content.rangeDate[1]}` ??
                    ""}{" "} */}
                    </GRText>
                  </GRFlexView>
                  <EditOutlined rev={undefined} />
                </GRFlexView>
              </>
            }
          />
        </>
      ))}
    />
  );
};

export default TrainingSubContentBoarder;
