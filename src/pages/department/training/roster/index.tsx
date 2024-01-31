import { CaretRightOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import UserHistoryModal from "@component/templates/modal/UserHistoryModal";
import { useQuery } from "@tanstack/react-query";
import { tUseAttendanceQueryResposne } from "api/attendance";
import queryKeys from "api/queryKeys";
import { getTrainingDetail, getTrainingSubContentList } from "api/training";
import { tTrainingDetail, tTrainingType } from "api/training/type";
import { useCallback, useState } from "react";
import { tTrainingMainTitle } from "../../../../utils/constants";
import TrainingMemberTableBoarder from "./TrainingMemberTableBoarder";
import TrainingRosterModal from "./TrainingRosterModal";
import TrainingSubContentBoarder from "./TrainingSubContentBoarder";
import TrainingTitleBoarder from "./TrainingTitleBoarder";

const TrainingRosterPage = () => {
  const [openTrainingRosterModal, setOpenTrainingRosterModal] = useState(false);
  const [selectTrainingType, setSelectTrainingType] = useState<tTrainingType>();
  const [selectTrainingSubContent, setSelectTrainingSubContent] =
    useState<tTrainingDetail>();

  const [selectTrainingId, setSelectTrainingId] = useState<
    number | undefined
  >();

  const { data: trainingSubContentList } = useQuery(
    [queryKeys.TRAINING_DETAIL, selectTrainingType],
    async () =>
      await getTrainingSubContentList({
        type: selectTrainingType
      }),
    { enabled: !!selectTrainingType, select: _data => _data.content }
  );

  const { data: trainingDetail } = useQuery(
    [queryKeys.TRAINING_MEMBERS, selectTrainingSubContent],
    async () => await getTrainingDetail(selectTrainingSubContent?.id),
    { enabled: !!selectTrainingSubContent, select: _data => _data.content }
  );

  const onClickOpenRosterModal = (_content?: tTrainingDetail) => {
    setSelectTrainingId(_content?.id);
    setOpenTrainingRosterModal(true);
  };

  const onCloseTrainingRosterModal = () => {
    setOpenTrainingRosterModal(false);
  };

  const onClickBoarder = (training: tTrainingMainTitle) => {
    setSelectTrainingType(training.value);
  };

  const onClickSubContent = (subContent: tTrainingDetail) => {
    setSelectTrainingSubContent(subContent);
  };

  return (
    <>
      <HeaderView
        title={"명부 관리"}
        headerComponent={
          <GRButtonText
            onClick={() => onClickOpenRosterModal()}
            buttonType={"default"}
            size={"large"}
          >
            명부 생성
          </GRButtonText>
        }
      />
      <GRContainerView>
        <GRView style={{ overflowX: "scroll" }}>
          <GRView
            isFlex
            width={"100%"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            marginbottom={1}
            style={{ minWidth: "60rem" }}
          >
            {/* 훈련 종류 board */}
            <TrainingTitleBoarder onClickBoarder={onClickBoarder} />
            <CaretRightOutlined rev={undefined} />
            {/* 훈련 이름 board */}
            <TrainingSubContentBoarder
              subContent={trainingSubContentList}
              onClickSubContent={onClickSubContent}
              onClickOpenRosterModal={onClickOpenRosterModal}
            />
            <CaretRightOutlined rev={undefined} />
            {/* 훈련 참여자 board */}
            <TrainingMemberTableBoarder
              rosterMembers={trainingDetail?.members}
            />
          </GRView>
        </GRView>
      </GRContainerView>
      <TrainingRosterModal
        open={openTrainingRosterModal}
        onClose={onCloseTrainingRosterModal}
        trainingId={selectTrainingId}
      />
    </>
  );
};

export default TrainingRosterPage;
