import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { Alert, RadioChangeEvent, TableColumnsType, Tooltip } from "antd";
import useAttendanceCheckMutate from "api/attendance/mutate/useAttendanceCheckMutate";
import { useAttendanceCheckData } from "api/attendance/queries/useAttendanceCheckData";
import { tAttendanceCheckData } from "api/attendance/type";
import { ATTENDANCE_CHECK_STATUS, SEX_NAME, TOOLTIP_INFO } from "config/const";
import { Dayjs } from "dayjs";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_DATE_FORMAT } from "utils/DateUtils";
import AttendanceCheckSubmitButton from "../../newfamily/AttendanceCheckSubmitButton";

type tAttendanceCheckStumpTable = {
  filterDate: Dayjs;
};

const AttendanceCheckStumpTable: React.FC<tAttendanceCheckStumpTable> = ({
  filterDate
}) => {
  const [checkData, setCheckData] = useState<tAttendanceCheckData[]>();

  const [isLoading, setIsLoading] = useState(false);
  const [isCompleteCheck, setIsCompleteCheck] = useState(false);

  const { currentTermId } = useCurrentTerm();

  const { stumpAttendanceMutate } = useAttendanceCheckMutate();
  const { checkStumpData } = useAttendanceCheckData(
    filterDate.format(DEFAULT_DATE_FORMAT)
  );

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

    try {
      await stumpAttendanceMutate({
        date: filterDate.format(DEFAULT_DATE_FORMAT),
        termId: currentTermId,
        attendanceItems: _formAttendanceCheckItems
      });
    } catch (e: any) {
      GRAlert.error(`출석 체크 실패, 다시 시도해주세요 ${e?.message ?? ""}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    if (!checkStumpData) return;
    setCheckData(checkStumpData);
  }, [checkStumpData]);

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

export default AttendanceCheckStumpTable;
