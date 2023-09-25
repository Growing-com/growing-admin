import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRFormInputText from "@component/molecule/form/GRFormInputText";
import GRFormItem from "@component/molecule/form/GRFormItem";
import { Alert, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import { ATTENDANCE_STATUS, SEX_NAME } from "config/const";
import { FC, useMemo } from "react";
import type { Control, FieldValues } from "react-hook-form";

const TOOLTIP_INFO = `* Tab: 이동 \n * Tab + Shift: 이전으로 이동 \n * 화살표: 선택 가능`;
type tAttendanceCheckTable = {
  attendanceDataSource: any[];
  control: Control<FieldValues, any>;
};

type tAttendanceColum = {
  cordi: string;
  leader: string;
  name: string;
  grade: string;
  gender: string;
  etc: string;
  status: string;
};

const AttendanceCheckTable: FC<tAttendanceCheckTable> = ({
  attendanceDataSource,
  control
}) => {
  const columns: ColumnType<tAttendanceColum>[] = useMemo(
    () => [
      {
        title: "순장",
        dataIndex: "leaderName",
        key: "leaderName",
        align: "center",
        width: "5rem",
        fixed: "left",
        render: _value => <GRText>{_value}</GRText>
      },
      {
        title: "이름",
        dataIndex: "userName",
        key: "userName",
        align: "center",
        fixed: "left",
        width: "5rem"
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
        fixed: "left",
        width: "5rem",
        render: (_, item) => {
          if (!item?.sex) return;
          return <GRText>{SEX_NAME[item?.sex]}</GRText>;
        }
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
                    message={"출석"}
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
        fixed: "left",
        render: (_, recode) => {
          return (
            <GRFormItem
              type={"radio"}
              fieldName={`${recode.userId}.status`}
              control={control}
              options={ATTENDANCE_STATUS}
            />
          );
        }
      },
      {
        title: "추가 내용",
        dataIndex: "etc",
        key: "etc",
        align: "center",
        fixed: "left",
        render: (_, recode) => {
          return (
            <GRFormInputText
              fieldName={`${recode.userId}.etc`}
              control={control}
              type={"textarea"}
              placeholder={"추가 내용 작성해 주세요"}
            />
          );
        }
      }
    ],
    [control]
  );

  return (
    <GRTable
      rowKey={record => record.userId}
      data={attendanceDataSource}
      columns={columns}
    />
  );
};

export default AttendanceCheckTable;
