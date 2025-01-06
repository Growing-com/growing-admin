import GRTab from "@component/atom/GRTab";
import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import { tOptions } from "@component/atom/dataEntry/type";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { Alert, TableColumnsType, Tooltip } from "antd";
import { RadioChangeEvent } from "antd/lib";
import useAttendanceCheckMutate from "api/attendance/mutate/useAttendanceCheckMutate";
import { useAttendanceCheckData } from "api/attendance/queries/useAttendanceCheckData";
import { tAttendanceCheckData } from "api/attendance/type";
import { ATTENDANCE_CHECK_STATUS, SEX_NAME, TOOLTIP_INFO } from "config/const";
import { Dayjs } from "dayjs";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { head } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_DATE_FORMAT } from "utils/DateUtils";
import AttendanceCheckSubmitButton from "../../newfamily/AttendanceCheckSubmitButton";

type tAttendanceCheckNormalTable = {
  filterDate: Dayjs;
  selectedCodyId: number | undefined;
  leaderByCodyOptions: tOptions[];
};

const AttendanceCheckNormalTable: React.FC<tAttendanceCheckNormalTable> = ({
  filterDate,
  selectedCodyId,
  leaderByCodyOptions
}) => {
  const [currentLeaderTab, setCurrentLeaderTab] = useState<string>();
  const [checkData, setCheckData] = useState<tAttendanceCheckData[]>();

  const [isCompleteCheck, setIsCompleteCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { groupUserAttendanceMutate } = useAttendanceCheckMutate();
  const { currentTermId } = useCurrentTerm();

  const { checkGroupData } = useAttendanceCheckData(
    filterDate.format(DEFAULT_DATE_FORMAT),
    selectedCodyId
  );

  const onChangeTab = (_tabIndx: string) => {
    const leaderName = leaderByCodyOptions.find(
      leader => leader.value === _tabIndx
    )?.label;
    setCurrentLeaderTab(leaderName);
  };

  // attendanceItem 가 통일 될 경우 공통으로 빼야 됨 // 보류
  const insertDataInFormResult = (
    _userId: number,
    key: string,
    value: any,
    data: any,
    setData: any
  ) => {
    const _formResult = data?.map(
      (result: { userId: number; attendanceItem: any[] }) => {
        if (_userId !== result.userId) return result;

        return {
          ...result,
          attendanceItem: {
            ...result.attendanceItem,
            [key]: value
          }
        };
      }
    );
    setData(_formResult);
  };

  const onChangeAttendStatus = useCallback(
    (_userId: number, e: RadioChangeEvent) => {
      insertDataInFormResult(
        _userId,
        "status",
        e.target.value,
        checkData,
        setCheckData
      );
    },
    [insertDataInFormResult]
  );

  const onChangeAttendReason = useCallback(
    (_userId: number, e: string) => {
      insertDataInFormResult(_userId, "reason", e, checkData, setCheckData);
    },
    [insertDataInFormResult]
  );

  // 처음 렌더링 때 탭 설정
  useEffect(() => {
    if (leaderByCodyOptions) {
      const leaderName = head(leaderByCodyOptions)?.label;
      setCurrentLeaderTab(leaderName);
    }
  }, [leaderByCodyOptions]);

  // 순장에 맞는 데이터만 보여줌
  useEffect(() => {
    let _findAttendance = checkGroupData;
    if (currentLeaderTab) {
      _findAttendance = checkGroupData?.filter(
        checkData => checkData.leaderName === currentLeaderTab
      );
    }
    setCheckData(_findAttendance);
  }, [checkGroupData, currentLeaderTab]);

  const validateAttendanceCheck = () => {
    if (!checkData) return;
    for (const item of checkData) {
      if (
        !item.attendanceItem?.status ||
        item.attendanceItem?.status === "NONE"
      ) {
        GRAlert.error(`${item.name}의 출석을 선택해주세요`);
        return false;
      }
    }
    return true;
  };

  const handleOnSubmitButton = async () => {
    if (!validateAttendanceCheck()) return;

    setIsLoading(true);
    const _formAttendanceCheckItems =
      checkData
        ?.map(item => ({
          userId: item.userId,
          status: item.attendanceItem.status,
          reason: item.attendanceItem.reason
        }))
        .filter(item => item !== undefined) ?? [];

    if (!currentTermId) return GRAlert.error("현재 텀 정보가 없습니다.");
    if (!selectedCodyId) return GRAlert.error("코디 아이디가 없습니다.");

    try {
      await groupUserAttendanceMutate({
        date: filterDate.format(DEFAULT_DATE_FORMAT),
        termId: currentTermId,
        codyId: selectedCodyId,
        attendanceItems: _formAttendanceCheckItems
      });
    } catch (e: any) {
      GRAlert.error(`출석 체크 실패, 다시 시도해주세요 ${e?.message ?? ""}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  // button diabled 변수 설정
  useEffect(() => {
    if (checkData?.length) {
      const checkFinish = checkData.filter(
        form => form.attendanceItem?.status === "NONE"
      );
      setIsCompleteCheck(checkFinish.length === 0);
    }
  }, [checkData]);

  const columns: TableColumnsType<any> = [
    {
      title: "코디",
      dataIndex: "codyName",
      key: "codyName",
      align: "center",
      width: "5rem",
      minWidth: 75
    },
    {
      title: "순장",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "5rem",
      minWidth: 75
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      minWidth: 75,
      render: (_, item) => <GRText weight={"bold"}>{item.name}</GRText>
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "5rem",
      minWidth: 60,
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem",
      minWidth: 60
    },
    {
      title: () => {
        return (
          <Tooltip
            overlayStyle={{ whiteSpace: "pre-line" }}
            title={TOOLTIP_INFO}
          >
            <GRFlexView alignItems={"center"}>
              <Alert
                showIcon
                message={
                  <GRText weight={"bold"} fontSize={"b7"}>
                    출석
                  </GRText>
                }
                type={"info"}
                banner={true}
                style={{ backgroundColor: "transparent" }}
              />
            </GRFlexView>
          </Tooltip>
        );
      },
      dataIndex: "status",
      key: "status",
      align: "center",
      minWidth: 110,
      render: (_, recode) => (
        <GRRadio
          options={ATTENDANCE_CHECK_STATUS}
          onChange={_status => onChangeAttendStatus(recode.userId, _status)}
          value={recode.attendanceItem?.status}
        />
      )
    },
    {
      title: "기타 사항",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      minWidth: 110,
      render: (_, recode) => (
        <GRView>
          <GRTextInput
            style={{
              height: "2.1rem"
            }}
            type={"textarea"}
            value={recode.attendanceItem?.reason}
            onChange={_reason => onChangeAttendReason(recode.userId, _reason)}
          />
        </GRView>
      )
    }
  ];

  return (
    <>
      <GRTab items={leaderByCodyOptions} onChange={onChangeTab} />
      <GRTable
        isLoading={isLoading}
        rowKey={"userId"}
        columns={columns}
        data={checkData}
        pagination={{
          total: checkData?.length,
          defaultPageSize: 15,
          position: ["bottomCenter"]
        }}
        scroll={{ x: true }}
        tableLayout={"auto"}
      />
      <AttendanceCheckSubmitButton
        onSubmit={handleOnSubmitButton}
        disabled={!isCompleteCheck}
      />
    </>
  );
};

export default AttendanceCheckNormalTable;
