import GRTable from "@component/atom/GRTable";
import GRCheck from "@component/atom/dataEntry/GRCheck";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRText from "@component/atom/text/GRText";
import GRView from "@component/atom/view/GRView";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { Checkbox } from "antd";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";

export const NewFamilyLineUpModal = ({
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

  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "등반 여부",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem",
      render: (_, item) => {
        return <Checkbox />;
      }
    },
    {
      title: "나무",
      dataIndex: "cordy",
      key: "cordy",
      align: "center",
      width: "5rem",
      render: (_, item) => {
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
      render: (_, item) => {
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
