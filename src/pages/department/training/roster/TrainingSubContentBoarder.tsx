import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import Boarder from "./Boarder";
import BoarderCard from "./BoarderCard";
import { tTrainingDetail } from "api/training/type";

type tTrainingSubContentBoarder = {
  subTrainingContent: tTrainingDetail[];
  onClickTraining: () => void;
};

const TrainingSubContentBoarder: FC<tTrainingSubContentBoarder> = ({
  subTrainingContent,
  onClickTraining,
  onClickCreateTraining
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
                onClick={onClickCreateTraining}
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
                      {content.name ?? ""}{" "}
                    </GRText>
                    <GRText
                      weight={"bold"}
                      color={Color.grey80}
                      fontSize={"b8"}
                    >
                      {`${content.startDate} ~ ${content.endDate}` ?? ""}{" "}
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
