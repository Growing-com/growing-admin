import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import HeaderView from "@component/molecule/view/HeaderView";
import UserHistoryModal from "@component/templates/modal/UserHistoryModal";
import { ColumnType } from "antd/es/table";
import { tUseAttendanceQueryResposne } from "api/attendance";
import { useCallback, useMemo, useState } from "react";
import Boarder from "./Boarder";
import BoarderCard from "./BoarderCard";

const TrainingRosterPage = () => {
  const [openCreateTrainingRosterModal, setOpenCreateTrainingRosterModal] =
    useState(false);
  const [selectUserId, setSelectUserId] = useState<number>();

  const onClickCreateTrainingRoster = () => {
    console.log("생성");
  };

  const onClickLinkText = useCallback(
    (_recode?: tUseAttendanceQueryResposne) => {
      setSelectUserId(_recode?.userId);
    },
    []
  );

  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "userName",
        key: "userName",
        align: "center",
        fixed: "left",
        width: "8rem",
        render: (_, recode) => (
          <ColumLinkText
            text={recode.userName}
            onClick={() => onClickLinkText(recode)}
          />
        )
      },
      {
        title: "학년",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        fixed: "left",
        width: "5rem"
      },
      {
        title: "성별",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        width: "5rem",
        render: (_, record) => <ColumSexRender sexData={record.sex} />
      }
    ],
    [onClickLinkText]
  );

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
        <GRView
          style={{
            overflowX: "scroll"
          }}
        >
          <GRView
            isFlex
            width={"100%"}
            flexDirection={"row"}
            marginbottom={1}
            style={{ minWidth: "60rem" }}
          >
            <Boarder
              boarderTitle={"훈련 종류"}
              boarderWidth={15}
              borderContentComponent={["제자학교", "제자훈련", "세례"].map(
                content => (
                  <>
                    <BoarderCard boarderCardTitle={content} />
                  </>
                )
              )}
            />
            <Boarder
              boarderTitle={"훈련 이름"}
              boarderWidth={15}
              borderContentComponent={["제자학교", "제자훈련", "세례"].map(
                content => (
                  <>
                    <BoarderCard boarderCardTitle={content} />
                  </>
                )
              )}
            />
            <Boarder
              boarderTitle={"참여자"}
              boarderWidth={30}
              borderContentComponent={
                <GRTable
                  data={[
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" },
                    { userName: "이종민", grade: 12, sex: "MALE" }
                  ]}
                  scroll={{ y: "20rem" }}
                  columns={columns}
                  isHoverTable={false}
                />
              }
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
    </>
  );
};

export default TrainingRosterPage;
