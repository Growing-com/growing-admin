import GRTable from "@component/atom/GRTable";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRView from "@component/atom/view/GRView";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";

type newFamilyLineUpColumns = {
  name: string;
  climb: string;
  cordy: string;
  leader: string;
};

type tNewFamilyLineUpModal = {
  open: boolean;
  onClickClose: () => void;
  selectNewFamily: any;
};
export const NewFamilyLineUpModal: FC<tNewFamilyLineUpModal> = ({
  open,
  onClickClose,
  selectNewFamily
}) => {
  const [selectedLeaderId, setSelectedLeaderId] = useState<number>();
  const [selectPromteDate, setSelectPromteDate] = useState(false);

  const { control, handleSubmit, reset } = useForm();
  const {
    setSelectedCodyId,
    termCordyOptions,
    termLeaderOptions,
    selectedCodyId
  } = useTermInfoOptionQueries();

  const columns: ColumnType<newFamilyLineUpColumns>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "등반 여부",
      dataIndex: "promote",
      key: "promote",
      align: "center",
      width: "5rem",
      render: (_, _item) => {
        return <Checkbox onChange={() => setSelectPromteDate(pre => !pre)} />;
      }
    },
    {
      title: "등반일",
      dataIndex: "promoteDate",
      key: "promoteDate",
      align: "center",
      render: (_, _item) => {
        return (
          <GRDatePicker pickerType={"basic"} disabled={!selectPromteDate} />
        );
      }
    },
    {
      title: "순장",
      dataIndex: "leader",
      key: "leader",
      align: "center",
      render: (_, _item) => {
        return (
          <GRSelect
            marginright={GRStylesConfig.BASE_MARGIN}
            value={selectedLeaderId}
            options={termLeaderOptions}
            onChange={() => {}}
            placeholder={"리더 선택"}
          />
        );
      }
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  const onClickModalOk = item => {
    console.log("item", item);
  };

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={"새가족 라인업"}
      width={"60%"}
      maskClosable={false}
    >
      <GRView flexDirection={"row"}>
        <GRTable columns={columns} data={selectNewFamily} />
      </GRView>
    </GRFormModal>
  );
};
