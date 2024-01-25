import React from "react";
import { TRAINING_MAIN_TITLE } from "utils/constants";
import Boarder from "./Boarder";
import BoarderCard from "./BoarderCard";

const TrainingTitleBoarder = ({ onClickBoarder }) => {
  return (
    <Boarder
      boarderTitle={"훈련 종류"}
      boarderWidth={15}
      borderContentComponent={TRAINING_MAIN_TITLE.map(content => (
        <>
          <BoarderCard
            boarderCardTitle={content.label}
            isSelected={false}
            onClickBoarder={() => onClickBoarder(content)}
            boarderHeight={3}
          />
        </>
      ))}
    />
  );
};

export default TrainingTitleBoarder;
