import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import AlertModal from "@component/molecule/modal/AlertModal";
import { Alert, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import { useGetTermMembersByCodyQuery } from "api/term/queries/useGetTermMembersByCodyQuery";
import { SEX_NAME } from "config/const";
import { FC, useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const TOOLTIP_INFO = `* Tab: 이동 \n * Tab + Shift: 이전으로 이동 \n * 화살표: 선택 가능`;
type tAttendanceCheckTable = {
  dataSource?: any[];
};

type tAttendanceColum = {
  cordi: string;
  leader: string;
  name: string;
  grade: string;
  gender: string;
  extraInfo: string;
};

const AttendanceCheckTable: FC<tAttendanceCheckTable> = ({ dataSource }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("출석을 등록하시겠습니까?");
  const { data: cordiMember } = useGetTermMembersByCodyQuery({
    termId: 1,
    codyId: 2
  });

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
        dataIndex: "memberName",
        key: "memberName",
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
        dataIndex: "attends",
        key: "attends",
        align: "center",
        fixed: "left",
        render: (_, recode) => {
          return (
            <GRRadio
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
          return <GRTextInput type={"textarea"} />;
        }
      }
    ],
    []
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
      <GRTable rowKey={"name"} data={cordiMember} columns={columns} />
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
