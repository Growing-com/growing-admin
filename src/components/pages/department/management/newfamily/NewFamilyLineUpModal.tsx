import GRTable from "@component/atom/GRTable";
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
      dataIndex: "climb",
      key: "climb",
      align: "center",
      width: "5rem",
      render: (_, _item) => {
        return <Checkbox />;
      }
    },
    {
      title: "나무",
      dataIndex: "cordy",
      key: "cordy",
      align: "center",
      width: "5rem",
      render: (_, _item) => {
        return (
          <GRSelect
            style={{ width: "10rem" }}
            marginright={GRStylesConfig.BASE_MARGIN}
            value={selectedCodyId}
            options={termCordyOptions}
            onChange={_cordy => {
              setSelectedCodyId(_cordy);
            }}
            placeholder={"나무 선택"}
          />
        );
      }
    },
    {
      title: "순장",
      dataIndex: "leader",
      key: "leader",
      align: "center",
      width: "5rem",
      render: (_, _item) => {
        return (
          <GRSelect
            marginright={GRStylesConfig.BASE_MARGIN}
            style={{ width: "10rem" }}
            value={selectedLeaderId}
            options={termLeaderOptions}
            onChange={() => {}}
            disabled={!selectedCodyId}
            placeholder={"리더 선택"}
          />
        );
      }
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  const onClickModalOk = () => {};

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
