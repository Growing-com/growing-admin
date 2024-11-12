import GRTable from "@component/atom/GRTable";
import { TableColumnsType } from "antd";
import { tCody } from "api/term/type";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useState } from "react";

const EditCodyTable: React.FC = () => {
  const [selectedCody, setSelectedCody] = useState<tCody>();
  const { currentTermCody } = useCurrentTerm();

  const onSelect = (_: React.Key[], selectedRows: any[]) => {
    setSelectedCody(selectedRows[0]);
  };

  const columns: TableColumnsType<any> = [
    {
      title: "번호",
      dataIndex: "codyId",
      key: "codyId",
      align: "center",
      width: "2rem"
    },
    {
      title: "이름",
      dataIndex: "codyName",
      key: "codyName",
      align: "center",
      width: "10rem",
      minWidth: 75
    }
  ];

  return (
    <>
      <GRTable
        rowKey={"codyId"}
        columns={columns}
        data={currentTermCody}
        rowSelection={{
          type: "radio",
          onChange: onSelect
        }}
      />
    </>
  );
};

export default EditCodyTable;
