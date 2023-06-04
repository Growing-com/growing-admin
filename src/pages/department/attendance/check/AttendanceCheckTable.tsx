import GRTable from "@component/base/GRTable";
import GRText from "@component/base/text/GRText";
import GRFlexView from "@component/base/view/GRFlexView";
import GRForm from "@component/modules/form/GRForm";
import GRFormItem from "@component/modules/form/GRFormItem";
import { Alert, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const OPTION_ATTENDANCE = [
  { label: "현장", value: "100" },
  { label: "온라인", value: "200" },
  { label: "결석", value: "300" }
];
const TOOLTIP_INFO = `* Tab: 이동 \n * Tab + Shift: 이전으로 이동 \n * 화살표: 선택 가능`;
type tAttendanceCheckTable = {
  colunms: any[];
};

type tAttendanceColum = {
  cordi: string;
  leader: string;
  name: string;
  grade: string;
  gender: string;
  extraInfo: string;
};

const DUMP_DATA = [
  {
    cordi: "조예인",
    leader: "우상욱",
    name: "이종민",
    grade: "18",
    gender: "남",
    attends: "100",
    extraInfo: "오늘 배가 아파서 참석했지만 도중에 집에 일찍 갔다."
  },
  {
    cordi: "조예인",
    leader: "우상욱",
    name: "이종민",
    grade: "18",
    gender: "남",
    attends: "100",
    extraInfo: "오늘 배가 아파서 참석했지만 도중에 집에 일찍 갔다."
  },
  {
    cordi: "조예인",
    leader: "우상욱",
    name: "이종민",
    grade: "18",
    gender: "남",
    attends: "100",
    extraInfo: "오늘 배가 아파서 참석했지만 도중에 집에 일찍 갔다."
  }
];

const AttendanceCheckTable: FC<tAttendanceCheckTable> = ({ colunms }) => {
  const [headerComponents, setHeaderComponents] = useState();
  const { register, handleSubmit, control } = useForm();

  const columns: ColumnType<tAttendanceColum>[] = useMemo(
    () => [
      {
        title: "순장",
        dataIndex: "cordi",
        key: "cordi",
        align: "center",
        width: "5rem",
        fixed: "left",
        render: _value => <GRText>{_value}</GRText>
      },
      {
        title: "이름",
        dataIndex: "leader",
        key: "leader",
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
        dataIndex: "gender",
        key: "grade",
        align: "center",
        fixed: "left",
        width: "5rem"
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
        dataIndex: "attends",
        key: "attends",
        align: "center",
        fixed: "left",
        render: () => {
          return (
            <GRFormItem
              control={control}
              fieldName={"attends"}
              required={true}
              type={"radio"}
              options={[
                { label: "출석", value: "100" },
                { label: "현장", value: "200" },
                { label: "온라인", value: "300" }
              ]}
            />
          );
        }
      },
      {
        title: "추가 내용",
        dataIndex: "extraInfo",
        key: "extraInfo",
        align: "center",
        fixed: "left",
        render: () => {
          return (
            <GRFormItem
              control={control}
              fieldName={"extraInfo"}
              required={true}
              type={"textarea"}
            />
          );
        }
      }
    ],
    []
  );

  useEffect(() => {
    const headerCom = colunms.map(colunm => {
      return (
        <GRFlexView key={colunm.key}>
          <GRText>{colunm.title}</GRText>
        </GRFlexView>
      );
    });
  }, [colunms]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(_item => {
    console.log("_item", _item);
  }, []);

  return (
    <GRForm onSubmit={handleSubmit(onSubmit)}>
      <GRTable dataSource={DUMP_DATA} columns={columns} />
    </GRForm>
  );
};

export default AttendanceCheckTable;
