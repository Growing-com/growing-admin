import GRTable from "@component/atom/GRTable";
import { TableColumnsType } from "antd";
import { tPastor } from "api/term/type";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useState } from "react";

const EditPastorTable: React.FC = () => {
  const [selectedPastor, setSelectedPastor] = useState<tPastor>();
  const { currentTermPastor } = useCurrentTerm();

  const onSelect = (_: React.Key[], selectedRows: any[]) => {
    setSelectedPastor(selectedRows[0]);
  };

  const columns: TableColumnsType<any> = [
    {
      title: "번호",
      dataIndex: "pastorId",
      key: "pastorId",
      align: "center",
      width: "2rem"
    },
    {
      title: "이름",
      dataIndex: "pastorName",
      key: "pastorName",
      align: "center",
      width: "10rem",
      minWidth: 75
    }
  ];

  return (
    <>
      {/* <button onClick={() => console.log(selectedPastor)}>selectedPastor</button> */}
      <GRTable
        rowKey={"pastorId"}
        columns={columns}
        data={currentTermPastor}
        rowSelection={{
          type: "radio",
          onChange: onSelect
        }}
      />
    </>
  );
};

export default EditPastorTable;
