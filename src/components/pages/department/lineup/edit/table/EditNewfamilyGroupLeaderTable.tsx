import GRTable from "@component/atom/GRTable";
import { TableColumnsType } from "antd";
import { tNewFamilyGroup } from "api/term/type";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useState } from "react";

const EditNewfamilyGroupLeaderTable: React.FC = () => {
  const [selectedNewfamilyLeader, setSelectedNewfamilyLeader] =
    useState<tNewFamilyGroup>();
  const { currentTermNewFamilyLeader } = useCurrentTerm();

  const onSelect = (_: React.Key[], selectedRows: any[]) => {
    setSelectedNewfamilyLeader(selectedRows[0]);
  };

  const columns: TableColumnsType<any> = [
    {
      title: "번호",
      dataIndex: "newFamilyGroupId",
      key: "newFamilyGroupId",
      align: "center",
      width: "2rem"
    },
    {
      title: "이름",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "10rem",
      minWidth: 75
    }
  ];

  return (
    <>
      <GRTable
        rowKey={"newFamilyGroupId"}
        columns={columns}
        data={currentTermNewFamilyLeader}
        rowSelection={{
          type: "radio",
          onChange: onSelect
        }}
      />
    </>
  );
};

export default EditNewfamilyGroupLeaderTable;
