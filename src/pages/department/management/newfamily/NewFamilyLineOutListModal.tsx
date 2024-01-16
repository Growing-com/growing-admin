import GRTable from "@component/atom/GRTable";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { ColumnType } from "antd/es/table";
import { FC, useCallback } from "react";

type tNewFamilyLineOutListModal = {
  open: boolean;
};

const NewFamilyLineOutListModal: FC<tNewFamilyLineOutListModal> = ({
  open
}) => {
  const onOkClick = useCallback(() => {}, []);

  const onCancelClick = useCallback(() => {}, []);

  const columns: ColumnType<any>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      sorter: (a, b) => a.grade - b.grade
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      render: (_, record) => <ColumSexRender sexData={record.sex} />
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "15rem"
    },
    {
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
      }
    }
  ];

  return (
    <GRModal
      onOk={onOkClick}
      onCancel={onCancelClick}
      open={open}
      showFooter={false}
      title={
        <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
          <GRText weight={"bold"}>라인 아웃 목록</GRText>
        </GRFlexView>
      }
    >
      <GRTable rowKey={"id"} columns={columns} data={[]} />
    </GRModal>
  );
};

export default NewFamilyLineOutListModal;
