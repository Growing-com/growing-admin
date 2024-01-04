import GRTable from "@component/atom/GRTable";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { ColumnType } from "antd/es/table";
import { tTermNewFamily } from "api/term/types";
import { Dayjs } from "dayjs";
import { FC, useCallback, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type tTrainingRosterModal = {
  newFamily?: tTermNewFamily;
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
};

type tNewFamilyForm = {
  visitDate: Dayjs;
  birth: Dayjs;
} & Omit<tTermNewFamily, "visitDate" | "birth">;

const emptyValues = {
  name: "",
  sex: "MALE",
  phoneNumber: "",
  birth: "",
  visitDate: "",
  etc: ""
} as unknown as tNewFamilyForm;

const TrainingRosterModal: FC<tTrainingRosterModal> = ({
  open,
  onClose,
  newFamily,
  onRegister
}) => {
  const { control, handleSubmit, reset } = useForm<any>();

  const onCloseModal = () => {};
  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    async _item => {},
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
    []
  );
  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={"명부 생성"}
      width={"50%"}
      okButtonText={"등록"}
      maskClosable={false}
    >
      <GRView flexDirection={"row"}>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"select"}
            title={"훈련 종류"}
            fieldName={"teamId"}
            control={control}
            options={[
              { label: "제자 학교", value: 1 },
              { label: "제자 반", value: 1 },
              { label: "세례", value: 1 }
            ]}
            placeholder={"훈련을 선택해주세요"}
            required={true}
          />
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"훈련 이름"}
            fieldName={"name"}
            control={control}
            placeholder={"훈련 이름을 작성해 주세요"}
            required={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            title={"훈련 기간"}
            type={"date"}
            fieldName={"rangeDate"}
            control={control}
            pickerType={"range"}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"textarea"}
            title={"메모"}
            fieldName={"etc"}
            control={control}
            placeholder={"추가 내용이 있으면 작성해 주세요"}
            style={{
              height: "8rem"
            }}
          />
        </GRFlexView>
        <GRFlexView>
          {/* auto complete 넣기 */}
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
              }
            ]}
            scroll={{ y: "20rem" }}
            columns={columns}
            isHoverTable={false}
          />
        </GRFlexView>
      </GRView>
    </GRFormModal>
  );
};

export default TrainingRosterModal;
