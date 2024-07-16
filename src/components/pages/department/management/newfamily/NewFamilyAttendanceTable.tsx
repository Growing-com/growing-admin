import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import { ColumnType } from "antd/es/table";
import { tAttendanceItem } from "api/attendance/types";
import { tNewFamilyV2 } from "apiV2/newFamily/type";
import { ATTEND_STATUS } from "common/enum";
import { FC } from "react";
import { NEWFAMILY_DUMP_ATTENDANCE_DATA } from "./newfamilyDumpData";

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

type tNewFamilyAttendanceTable = {
  selectedNewFamily: tNewFamilyV2[];
  onSelect: (key: React.Key[], selectedRows: any[]) => void;
};

type tNewFamilyAttendanceTableColums = {
  userName: string;
  attendanceItems: tAttendanceItem[];
};

export const NewFamilyAttendanceTable: FC<tNewFamilyAttendanceTable> = ({
  selectedNewFamily,
  onSelect
}) => {
  const onSearch = () => {};
  const columns: ColumnType<tNewFamilyAttendanceTableColums>[] = [
    {
      title: "이름",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: "8rem",
      render: (_, recode) => (
        <ColumLinkText text={recode.userName} onClick={onSearch} />
      )
    },
    {
      title: "출석수",
      dataIndex: "attendance",
      key: "attendance",
      align: "center",
      width: "5rem",
      render: (_, record) => {
        const attendanceLen = record.attendanceItems.filter(
          item => item.status === ATTEND_STATUS.ATTEND
        ).length;
        return <GRText>{attendanceLen}</GRText>;
      }
    },
    {
      title: "결석수",
      dataIndex: "absence",
      key: "absence",
      align: "center",
      fixed: "left",
      width: "5rem",
      render: (_, record) => {
        const attendanceLen = record.attendanceItems.filter(
          item => item.status === ATTEND_STATUS.ABSENT
        ).length;
        return <GRText>{attendanceLen}</GRText>;
      }
    }
    // {
    //   ...(ColumDateTitleAttendanceRender({
    //     attendanceList: NEWFAMILY_DUMP_ATTENDANCE_DATA,
    //     weeks: searchWeek
    //   }) as tUseAttendanceQueryResposne)
    // }
  ];

  return (
    <GRTable
      columns={columns}
      data={NEWFAMILY_DUMP_ATTENDANCE_DATA}
      pagination={{
        total: NEWFAMILY_DUMP_ATTENDANCE_DATA?.length,
        defaultPageSize: 10,
        position: ["bottomCenter"]
      }}
      rowSelection={{
        selectedRowKeys: selectedNewFamily.map(
          newFamily => newFamily.newFamilyId
        ),
        onChange: onSelect
      }}
    />
  );
};
