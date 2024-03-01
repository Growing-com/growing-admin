import { tTrainingType } from "api/training/type";
import { FC } from "react";
import { TRAINING_MAIN_TITLE, tTrainingMainTitle } from "utils/constants";
import Boarder from "./Boarder";
import BoarderCard from "./BoarderCard";

type tTrainingTitleBoarder = {
  onClickBoarder: (content: tTrainingMainTitle) => void;
  selectTrainingType?: tTrainingType
};

const TrainingTitleBoarder: FC<tTrainingTitleBoarder> = ({
  onClickBoarder,
  selectTrainingType
}) => {

  const onClick = (_content: tTrainingMainTitle) => {
    onClickBoarder(_content);
  };

  return (
    <Boarder
      boarderTitle={"훈련 종류"}
      boarderWidth={15}
      borderContentComponent={TRAINING_MAIN_TITLE.map(content => (
        <>
          <BoarderCard
            boarderCardTitle={content.label}
            isSelected={content.value === selectTrainingType}
            onClickBoarder={() => onClick(content)}
            boarderHeight={3}
          />
        </>
      ))}
    />
  );
};

export default TrainingTitleBoarder;
