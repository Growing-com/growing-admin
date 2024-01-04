import { CaretRightOutlined, EditOutlined } from "@ant-design/icons";
import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import HeaderView from "@component/molecule/view/HeaderView";
import UserHistoryModal from "@component/templates/modal/UserHistoryModal";
import { css } from "@emotion/react";
import { ColumnType } from "antd/es/table";
import { tUseAttendanceQueryResposne } from "api/attendance";
import { useCallback, useMemo, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import Boarder from "./Boarder";
import BoarderCard from "./BoarderCard";
import TrainingRosterModal from "./TrainingRosterModal";

const TrainingRosterPage = () => {
  const [openCreateTrainingRosterModal, setOpenCreateTrainingRosterModal] =
    useState(false);
  const [selectUserId, setSelectUserId] = useState<number>();
  const [openTrainingRosterModal, setOpenTrainingRosterModal] = useState(false);

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

  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "userName",
        key: "userName",
        align: "center",
        fixed: "left",
        width: "5rem",
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
      },
      {
        title: "전화번호",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        align: "center"
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
            justifyContent={"space-between"}
            marginbottom={1}
            style={{ minWidth: "60rem" }}
          >
            <Boarder
              boarderTitle={"훈련 종류"}
              boarderWidth={15}
              borderContentComponent={["제자학교", "제자훈련", "세례"].map(
                content => (
                  <>
                    <BoarderCard boarderCardTitle={content} isSelected={true} />
                  </>
                )
              )}
            />
            <CaretRightOutlined rev={undefined} />
            <Boarder
              boarderTitle={"훈련 이름"}
              boarderWidth={20}
              borderContentComponent={[
                {
                  title: "2023-2학기 달무리",
                  rangeDate: ["2024-01-22", "2024-01-33"]
                },
                {
                  title: "2023-1학기 하나라",
                  rangeDate: ["2024-01-22", "2024-01-33"]
                }
              ].map(content => (
                <>
                  {/* <BoarderCard boarderCardTitle={content} isSelected={true} /> */}
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
                      --jsw-card-background-color: var(
                        --ds-surface-raised,
                        #ffffff
                      );
                      color: var(--ds-text, #172b4d);
                      filter: none;
                    `}
                  >
                    <GRFlexView flexDirection={"row"}>
                      <GRFlexView>
                        <GRText weight={"bold"}>{content.title ?? ""} </GRText>
                        <GRText
                          weight={"bold"}
                          color={Color.grey80}
                          fontSize={"b8"}
                        >
                          {`${content.rangeDate[0]} ~ ${content.rangeDate[1]}` ??
                            ""}{" "}
                        </GRText>
                      </GRFlexView>
                      <GRFlexView>
                        <EditOutlined rev={undefined} />
                      </GRFlexView>
                    </GRFlexView>
                  </GRView>
                </>
              ))}
            />
            <CaretRightOutlined rev={undefined} />
            <Boarder
              boarderTitle={"참여자"}
              boarderWidth={30}
              borderContentComponent={
                <GRTable
                  data={[
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    },
                    {
                      userName: "이종민",
                      grade: 12,
                      sex: "MALE",
                      phoneNumber: "010-9099-9999"
                    }
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
      <TrainingRosterModal
        open={openTrainingRosterModal}
        onClose={onCloseTrainingRosterModal}
      />
    </>
  );
};

export default TrainingRosterPage;
