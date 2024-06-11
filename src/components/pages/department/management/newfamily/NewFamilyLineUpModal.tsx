import GRTable from "@component/atom/GRTable";
import GRView from "@component/atom/view/GRView";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useForm } from "react-hook-form";

export const NewFamilyLineUpModal = ({ open, onClickClose }) => {
  const { control, handleSubmit, reset } = useForm();

  const columns = [
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
        <GRTable columns={columns} />
      </GRView>
    </GRFormModal>
  );
};
