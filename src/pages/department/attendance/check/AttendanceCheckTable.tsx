import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRFormInputText from "@component/molecule/form/GRFormInputText";
import GRFormItem from "@component/molecule/form/GRFormItem";
import AlertModal from "@component/molecule/modal/AlertModal";
import { Alert, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import { FC, useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const TOOLTIP_INFO = `* Tab: 이동 \n * Tab + Shift: 이전으로 이동 \n * 화살표: 선택 가능`;
type tAttendanceCheckTable = {
  colunms?: any[];
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
    leader: "우상욱1",
    name: "이종민1",
    grade: "18",
    gender: "남",
    attends: "100",
    extraInfo: "오늘 배가 아파서 참석했지만 도중에 집에 일찍 갔다."
  },
  {
    cordi: "조예인",
    leader: "우상욱2",
    name: "이종민2",
    grade: "18",
    gender: "남",
    attends: "100",
    extraInfo: "오늘 배가 아파서 참석했지만 도중에 집에 일찍 갔다."
  },
  {
    cordi: "조예인",
    leader: "우상욱3",
    name: "이종민3",
    grade: "18",
    gender: "남",
    attends: "100",
    extraInfo: "오늘 배가 아파서 참석했지만 도중에 집에 일찍 갔다."
  }
];

const AttendanceCheckTable: FC<tAttendanceCheckTable> = () => {
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("출석을 등록하시겠습니까?");
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
        dataIndex: "name",
        key: "name",
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
        render: (_, recode) => {
          return (
            <GRFormItem
              type={"radio"}
              control={control}
              fieldName={`attends-${recode.name}`}
              required={true}
              options={[
                { label: "현장", value: "200" },
                { label: "온라인", value: "300" },
                { label: "결석", value: "100" }
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
        render: (_, recode) => {
          return (
            <GRFormInputText
              type={"textarea"}
              control={control}
              fieldName={`extraInfo-${recode.name}`}
              required={true}
            />
          );
        }
      }
    ],
    [control]
  );

  const handleModal = () => {
    setOpen(!open);
  };

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    _item => {
      console.log("_item", _item);
      setOpen(!open);
    },
    [open]
  );

  return (
    <>
      <GRTable data={DUMP_DATA} columns={columns} />
      <GRFlexView
        flexDirection={"row"}
        justifyContent={"flex-end"}
        margintop={1}
      >
        <GRButtonText
          htmlType={"submit"}
          marginleft={0.5}
          size={"large"}
          onClick={() => setOpen(!open)}
        >
          출석 등록
        </GRButtonText>
      </GRFlexView>
      <AlertModal
        open={open}
        description={description}
        onCancelClickButton={handleModal}
        onOkClickButton={handleModal}
      />
    </>
  );
};

export default AttendanceCheckTable;
