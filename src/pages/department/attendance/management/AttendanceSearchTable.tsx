import GRTable from "@component/atom/GRTable";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import ColumDateTitleAttendanceRender from "@component/templates/table/ColumDateTitleAttendanceRender";

import { ColumnType } from "antd/es/table";
import { tUseAttendanceQueryResposne } from "api/attendance";

import { FC, useMemo } from "react";

type tAttendanceSearchTable = {
  attendanceList?: tUseAttendanceQueryResposne[];
  attendanceListSize?: number;
  attendanceListTotal?: number;
  attendanceListPage?: number;
  onChangePage: (page: number, pageSize: number) => void;
  isLoading?: boolean;
};

const AttendanceSearchTable: FC<tAttendanceSearchTable> = ({
  attendanceList,
  attendanceListSize,
  attendanceListTotal,
  onChangePage,
  attendanceListPage,
  isLoading
}) => {
  const columns: ColumnType<tUseAttendanceQueryResposne>[] = useMemo(
    () => [
      {
        title: "코디",
        dataIndex: "managerName",
        key: "managerName",
        align: "center",
        width: "5rem",
        fixed: "left",
        render: text => <a>{text}</a>
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
        width: "5rem"
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
        render: (_, record) => <ColumSexRender sexData={record.sex} />
      },
      {
        ...(ColumDateTitleAttendanceRender({
          attendanceList
        }) as tUseAttendanceQueryResposne)
      }
    ],
    [attendanceList]
  );
  return (
    <GRTable
      rowKey={"name"}
      columns={columns}
      data={attendanceList}
      isHoverTable={false}
      paginationProps={{
        total: attendanceListTotal,
        defaultPageSize: attendanceListSize,
        onChange: onChangePage,
        current: attendanceListPage
      }}
      scroll={{ x: 1300 }}
      isLoading={isLoading}
    />
  );
};

export default AttendanceSearchTable;
