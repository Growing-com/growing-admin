import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { Alert, Tooltip, type RadioChangeEvent } from "antd";
import { ColumnType } from "antd/es/table";
import { tAttendance, tAttendanceCheckItem } from "api/attendance/types";
import { ATTENDANCE_STATUS } from "config/const";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import AttendancdeCheckSubmitButton from "./AttendancdeCheckSubmitButton";

const TOOLTIP_INFO = `* Tab: 이동 \n * Tab + Shift: 이전으로 이동 \n * 방향키: 선택 가능`;

type tAttendanceCheckTable = {
  attendanceDataSource?: tAttendanceCheckItem[];
  isLoading?: boolean;
  onSubmit: (_attendance: tAttendance[]) => void;
};

const AttendanceCheckTable: FC<tAttendanceCheckTable> = ({
  attendanceDataSource,
  isLoading,
  onSubmit
}) => {
  const [formResult, setFormResult] = useState<tAttendanceCheckItem[]>([]);
  const [isCompleteCheck, setIsCompleteCheck] = useState(false);

  const insertDataInFormResult = useCallback(
    (_teamMemberId: number, key: string, value: any) => {
      const _formResult = formResult.map(result => {
        if (_teamMemberId === result.teamMemberId) {
          return {
            ...result,
            [key]: value
          };
        }
        return result;
      });
      setFormResult(_formResult);
    },
    [formResult]
  );

  const onChangeAttendStatus = useCallback(
    (_teamMemberId: number, e: RadioChangeEvent) => {
      insertDataInFormResult(_teamMemberId, "status", e.target.value);
    },
    [insertDataInFormResult]
  );

  const onChangeAttendEtc = useCallback(
    (_teamMemberId: number, e: string) => {
      insertDataInFormResult(_teamMemberId, "etc", e);
    },
    [insertDataInFormResult]
  );

  const columns: ColumnType<tAttendanceCheckItem>[] = useMemo(
    () => [
      {
        title: "순장",
        dataIndex: "leaderName",
        key: "leaderName",
        align: "center",
        width: "5rem",
        render: _value => <GRText>{_value}</GRText>
      },
      {
        title: "이름",
        dataIndex: "userName",
        key: "userName",
        align: "center",
        width: "5rem"
      },
      {
        title: "학년",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        width: "5rem"
      },
      {
        title: "성별",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        width: "5rem",
        render: (_, item) => <ColumSexRender sexData={item.sex} />
      },
      {
        title: () => {
          return (
            <>
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
            </>
          );
        },
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (_, recode) => (
          <GRRadio
            options={ATTENDANCE_STATUS}
            onChange={_status =>
              onChangeAttendStatus(recode.teamMemberId, _status)
            }
            value={recode.status}
          />
        )
      },
      {
        title: "기타 사항",
        dataIndex: "etc",
        key: "etc",
        align: "center",
        render: (_, recode) => (
          <GRView>
            <GRTextInput
              style={{
                height: "2.1rem"
              }}
              value={recode.etc}
              type={"textarea"}
              onChange={_etc => onChangeAttendEtc(recode.teamMemberId, _etc)}
            />
          </GRView>
        )
      }
    ],
    [onChangeAttendEtc, onChangeAttendStatus]
  );

  const handleOnSubmitButton = () => {
    try {
      const _attendForm = formResult.map(form => {
        if (!form.status) {
          throw new Error("출석은 모두 선택 해야 합니다");
        }
        return {
          teamMemberId: form.teamMemberId,
          status: form.status,
          teamId: form.teamId,
          etc: form.etc
        };
      });
      onSubmit(_attendForm);
    } catch (e: any) {
      GRAlert.error(e?.message ?? "출석 체크 오류");
    }
  };

  useEffect(() => {
    if (attendanceDataSource) {
      setFormResult(attendanceDataSource);
    }
  }, [attendanceDataSource]);

  useEffect(() => {
    if (formResult.length) {
      const checkFinish = formResult.filter(form => form.status === null);
      setIsCompleteCheck(!checkFinish.length);
    }
  }, [formResult]);

  return (
    <>
      <GRTable
        isLoading={isLoading}
        rowKey={record => record.teamMemberId}
        data={formResult}
        columns={columns}
        isHoverTable={false}
      />
      <AttendancdeCheckSubmitButton
        onSubmit={handleOnSubmitButton}
        disabled={isCompleteCheck}
      />
    </>
  );
};

export default AttendanceCheckTable;
