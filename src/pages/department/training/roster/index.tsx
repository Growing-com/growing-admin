import { CaretRightOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import {
  getDiscipleShipDetail,
  getDiscipleShips,
  getTrainingDetail,
  getTrainingSubContentList
} from "api/training";
import { tTrainingDetail, tTrainingType } from "api/training/type";
import { useState } from "react";
import { tTrainingMainTitle } from "../../../../utils/constants";
import TrainingMemberTableBoarder from "./TrainingMemberTableBoarder";
import TrainingRosterModal from "./TrainingRosterModal";
import TrainingSubContentBoarder from "./TrainingSubContentBoarder";
import TrainingTitleBoarder from "./TrainingTitleBoarder";

const TrainingRosterPage = () => {
  const [openTrainingRosterModal, setOpenTrainingRosterModal] = useState(false);
  const [modalTrainingType, setModalTrainingType] = useState<tTrainingType>();
  const [selectTrainingType, setSelectTrainingType] = useState<tTrainingType>();
  const [selectTrainingSubContent, setSelectTrainingSubContent] =
    useState<tTrainingDetail>();

  const [selectTrainingId, setSelectTrainingId] = useState<
    number | undefined
  >();

  const { data: trainingSubContentList, refetch: trainingSubContentRefetch } =
    useQuery(
      [queryKeys.TRAINING_DETAIL, selectTrainingType],
      async () => {
        if (selectTrainingType === "DISCIPLE") {
          return await getDiscipleShips();
        } else {
          return await getTrainingSubContentList({
            type: selectTrainingType
          });
        }
      },
      { enabled: !!selectTrainingType, select: _data => _data.content }
    );

  const { data: trainingDetail, refetch: trainingRefetch } = useQuery(
    [queryKeys.TRAINING_MEMBERS, selectTrainingSubContent],
    async () => {
      if (selectTrainingType === "DISCIPLE") {
        return await getDiscipleShipDetail(selectTrainingSubContent?.id);
      } else {
        return await getTrainingDetail(selectTrainingSubContent?.id);
      }
    },
    { enabled: !!selectTrainingSubContent, select: _data => _data.content }
  );

  const onClickOpenRosterModal = (_content?: tTrainingDetail) => {
    setSelectTrainingId(_content?.id);
    setModalTrainingType(selectTrainingType);
    setOpenTrainingRosterModal(true);
  };

  const onCloseTrainingRosterModal = async (_refetch?: boolean) => {
    if (_refetch) {
      await trainingRefetch();
    }
    setOpenTrainingRosterModal(false);
  };

  const onClickCreateTraining = () => {
    setSelectTrainingId(undefined);
    setModalTrainingType(undefined);
    setOpenTrainingRosterModal(true);
  };

  const onClickBoarder = (training: tTrainingMainTitle) => {
    if (selectTrainingType !== training.value) {
      setSelectTrainingSubContent(undefined);
      setSelectTrainingType(training.value);
    }
    setModalTrainingType(training.value);
  };

  const onClickSubContent = (subContent: tTrainingDetail) => {
    if (subContent.id !== selectTrainingSubContent?.id) {
      setSelectTrainingSubContent(subContent);
    }
  };

  return (
    <>
      <HeaderView
        title={"명부 관리"}
        headerComponent={
          <GRButtonText
            onClick={() => onClickCreateTraining()}
            buttonType={"default"}
            size={"large"}
          >
            명부 생성
          </GRButtonText>
        }
      />
      <GRContainerView>
        <GRView style={{ overflowX: "auto" }}>
          <GRView
            isFlex
            flexDirection={"row"}
            marginbottom={1}
            style={{
              minWidth: "80rem"
            }}
          >
            {/* 훈련 종류 board */}
            <TrainingTitleBoarder
              selectTrainingType={selectTrainingType}
              onClickBoarder={onClickBoarder}
            />
            <CaretRightOutlined
              rev={undefined}
              style={{ margin: "0 0.5rem" }}
            />
            {/* 훈련 이름 board */}
            <TrainingSubContentBoarder
              selectTrainingSubContent={selectTrainingSubContent}
              subContent={trainingSubContentList}
              onClickSubContent={onClickSubContent}
              onClickOpenRosterModal={onClickOpenRosterModal}
            />
            <CaretRightOutlined
              rev={undefined}
              style={{ margin: "0 0.5rem" }}
            />
            {/* 훈련 참여자 board */}
            <TrainingMemberTableBoarder
              rosterMembers={trainingDetail?.members}
              selectTrainingSubContent={selectTrainingSubContent}
            />
          </GRView>
        </GRView>
      </GRContainerView>
      <TrainingRosterModal
        open={openTrainingRosterModal}
        onClose={onCloseTrainingRosterModal}
        trainingId={selectTrainingId}
        trainingType={modalTrainingType}
      />
    </>
  );
};

export default TrainingRosterPage;
