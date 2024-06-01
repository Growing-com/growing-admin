import GRTable from "@component/atom/GRTable";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { ColumnType } from "antd/es/table";
import { tUseAttendanceQueryResposne } from "api/attendance";
import { useAttendanceQuery } from "api/attendance/queries/useAttendanceQuery";
import { tAttendanceSearch } from "api/attendance/types";
import { useState } from "react";

export const accountDumpData = [
  {
    name: "이종민",
    age: 18,
    gender: "남",
    status: "리더",
    role: "관리자",
    leader: "조예인",
    phoneNumber: "010-5485-9349"
  },
  {
    name: "아이유",
    age: 10,
    gender: "여",
    status: "조원",
    role: "",
    leader: "조예인",
    phoneNumber: "010-5485-9349"
  }
];

export const NewFamilyAttendanceTable = () => {
  const [filter, setFilter] = useState<tAttendanceSearch>({
    startDate: "2023-11-02",
    endDate: "2024-01-01",
    page: 0,
    size: 10,
    codyId: 6
  });
  const { data: attendanceList, isFetching } = useAttendanceQuery(filter);

  const columns: ColumnType<tUseAttendanceQueryResposne>[] = [
    {
      title: "나무",
      dataIndex: "managerName",
      key: "managerName",
      align: "center",
      width: "5rem",
      fixed: "left"
    },
    {
      title: "순장",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      fixed: "left",
      width: "5rem"
    },
    {
      title: "이름",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      fixed: "left",
      width: "8rem",
      render: (_, recode) => (
        <ColumLinkText
          text={recode.userName}
          onClick={() => onClickLinkText(recode)}
        />
      )
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
      fixed: "left",
      width: "5rem",
      render: (_, record) => <ColumSexRender sexData={record?.sex} />
    }
  ];

  return (
    <GRTable
      columns={columns}
      data={attendanceList}
      pagination={{
        total: attendanceList?.length,
        defaultPageSize: 10,
        position: ["bottomCenter"]
      }}
    />
  );
};
