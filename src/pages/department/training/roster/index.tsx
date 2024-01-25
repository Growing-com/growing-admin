import { CaretRightOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import UserHistoryModal from "@component/templates/modal/UserHistoryModal";
import { useQuery } from "@tanstack/react-query";
import { tUseAttendanceQueryResposne } from "api/attendance";
import queryKeys from "api/queryKeys";
import { getTrainingDetail } from "api/training";
import { useCallback, useState } from "react";
import { tTrainingList, tTrainingMainTitle } from "../../../../utils/constants";
import TrainingMemberTableBoarder from "./TrainingMemberTableBoarder";
import TrainingRosterModal from "./TrainingRosterModal";
import TrainingSubContentBoarder from "./TrainingSubContentBoarder";
import TrainingTitleBoarder from "./TrainingTitleBoarder";
import { tTrainingType } from "api/training/type";

const TrainingRosterPage = () => {
  const [openCreateTrainingRosterModal, setOpenCreateTrainingRosterModal] =
    useState(false);
  const [selectUserId, setSelectUserId] = useState<number>();
  const [openTrainingRosterModal, setOpenTrainingRosterModal] = useState(false);
  const [selectTraining, setSelectTraining] = useState<tTrainingType>();
  const [selectTrainingSubContent, setSelectTrainingSubContent] =
    useState<tTrainingType>();

  const { data: subTrainingContent } = useQuery(
    [queryKeys.TRAINING_DETAIL, selectTraining],
    async () =>
      await getTrainingDetail({
        type: selectTraining
      }),
    { enabled: !!selectTraining }
  );

  const onClickCreateTrainingRoster = () => {
    setOpenTrainingRosterModal(true);
  };

  const onClickLinkText = useCallback(
    (_recode?: tUseAttendanceQueryResposne) => {
      setSelectUserId(_recode?.userId);
    },
    []
  );

  const onCloseTrainingRosterModal = () => {
    setOpenTrainingRosterModal(false);
  };

  const onClickBoarder = (training: tTrainingMainTitle) => {
    setSelectTraining(training.value);
  };

  const onClickTraining = (subContent: tTrainingList) => {
    setSelectTrainingSubContent(subContent.key);
  };

  return (
    <>
      <HeaderView
        title={"명부 관리"}
        headerComponent={
          <GRButtonText
            onClick={onClickCreateTrainingRoster}
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
            <TrainingTitleBoarder onClickBoarder={onClickBoarder} />
            <CaretRightOutlined rev={undefined} />
            <TrainingSubContentBoarder
              subTrainingContent={subTrainingContent}
              onClickTraining={onClickTraining}
            />
            <CaretRightOutlined rev={undefined} />
            <TrainingMemberTableBoarder
              memberData={[]}
              onClickLinkText={onClickLinkText}
            />
          </GRView>
        </GRView>
      </GRContainerView>
      {selectUserId && (
        <UserHistoryModal
          open={!!selectUserId}
          onClose={onClickLinkText}
          userId={selectUserId}
        />
      )}
      <TrainingRosterModal
        open={openTrainingRosterModal}
        onClose={onCloseTrainingRosterModal}
      />
    </>
  );
};

export default TrainingRosterPage;
