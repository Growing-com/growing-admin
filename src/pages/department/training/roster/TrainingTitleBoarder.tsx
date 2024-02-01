import { tTrainingType } from "api/training/type";
import { FC, useState } from "react";
import { TRAINING_MAIN_TITLE, tTrainingMainTitle } from "utils/constants";
import Boarder from "./Boarder";
import BoarderCard from "./BoarderCard";

type tTrainingTitleBoarder = {
  onClickBoarder: (content: tTrainingMainTitle) =>void;
}

const TrainingTitleBoarder: FC<tTrainingTitleBoarder> = ({ onClickBoarder }) => {
  const [selectBoarder,setSelectBoarder] = useState<tTrainingType>();

  const onClick = (_content: tTrainingMainTitle) => {
    setSelectBoarder(_content.value)
    onClickBoarder(_content)
  }

  return (
    <Boarder
      boarderTitle={"훈련 종류"}
      boarderWidth={15}
      flex={1}
      borderContentComponent={TRAINING_MAIN_TITLE.map(content => (
        <>
          <BoarderCard
            boarderCardTitle={content.label}
            isSelected={content.value === selectBoarder}
            onClickBoarder={() => onClick(content)}
            boarderHeight={3}
          />
        </>
      ))}
    />
  );
};

export default TrainingTitleBoarder;
