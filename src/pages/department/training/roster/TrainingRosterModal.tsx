import GRTable from "@component/atom/GRTable";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import TableInfoHeader from "@component/templates/table/TableInfoHeader";
import { useMutation } from "@tanstack/react-query";
import { AutoComplete, Divider, Input, SelectProps } from "antd";
import { ColumnType } from "antd/es/table";
import { tTermNewFamily } from "api/term/types";
import { createTraining } from "api/training";
import { tTrainingType } from "api/training/type";
import { Dayjs } from "dayjs";
import { FC, useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { TRAINING_MAIN_TITLE } from "utils/constants";

type tTrainingRosterModal = {
  newFamily?: tTermNewFamily;
  open: boolean;
  onClose: () => void;
  onRegister?: () => void;
};

type tNewFamilyForm = {
  visitDate: Dayjs;
  birth: Dayjs;
} & Omit<tTermNewFamily, "visitDate" | "birth">;

type tTrainingValue = {
  type: tTrainingType;
  name: string;
  rangeDate: Date[];
  etc: string;
};

const TrainingRosterModal: FC<tTrainingRosterModal> = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm<any>();

  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [traingRosterlist, setTraingRosterlist] = useState([]);

  const { mutateAsync: createTrainingMutateAsync } =
    useMutation(createTraining);
  // const { mutateAsync: updateTrainingMutateAsync } =
  //   useMutation(updateTraining);

  const onCloseModal = () => {
    onClose();
  };

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    async _item => {
      console.log("item", _item);
      await createTrainingMutateAsync({
        type: _item.type,
        name: _item.name,
        startDate: _item.rangeDate[0],
        endDate: _item.rangeDate[1],
        etc: _item.etc
      });
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

  const handleSearch = (value: string) => {
    console.log("value", value);
    setOptions(value ? [] : []);
  };

  const onSearch = (value: string) => {
    console.log("value2", value);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

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
        <GRView>
          <GRFlexView flexDirection={"row"}>
            <GRFormItem
              type={"select"}
              title={"훈련 종류"}
              fieldName={"type"}
              control={control}
              options={TRAINING_MAIN_TITLE}
              placeholder={"훈련을 선택해주세요"}
              required={true}
              containStyle={{ marginRight: "1rem" }}
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
              required={true}
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
        </GRView>
        <Divider style={{ margin: "1rem 0rem 1.5rem 0rem " }} />
        <GRFlexView
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginbottom={GRStylesConfig.BASE_MARGIN}
        >
          <TableInfoHeader title={"명부 리스트"} />
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 200 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input.Search
              placeholder={"이름 검색"}
              enterButton={"추가"}
              onSearch={onSearch}
            />
          </AutoComplete>
        </GRFlexView>
        <GRFlexView>
          <GRTable
            data={traingRosterlist}
            scroll={{ y: "10rem" }}
            columns={columns}
            isHoverTable={false}
            marginbottom={GRStylesConfig.BASE_MARGIN}
          />
        </GRFlexView>
      </GRView>
    </GRFormModal>
  );
};

export default TrainingRosterModal;
