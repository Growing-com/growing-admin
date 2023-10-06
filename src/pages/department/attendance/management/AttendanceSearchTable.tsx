import GRTable from "@component/atom/GRTable";
import ColumAttendanceRender from "@component/templates/table/ColumAttendanceRender";
import ColumSexRender from "@component/templates/table/ColumSexRender";

import { ColumnType } from "antd/es/table";
import { concat } from "lodash";

import { FC, useMemo } from "react";

type tAttendanceTable = {
  cordi: string;
  leader: string;
  name: string;
  grade: string;
  gender: string;
};

type tAttendanceSearchTable = {
  attendanceList: any[];
};

const AttendanceSearchTable: FC<tAttendanceSearchTable> = ({
  attendanceList
}) => {
  const renderAddDay: ColumnType<tAttendanceTable>[] = () => {
    if (!attendanceList?.length) return [];

    const _attendanceItems = attendanceList?.[0].attendanceItems;
    if (_attendanceItems?.length) {
      return _attendanceItems.map(item => {
        return {
          title: item.week,
          dataIndex: item.week,
          key: item.week,
          align: "center",
          render: () => {
            return (
              <ColumAttendanceRender
                attendanceStatus={item.status}
                contentEtc={item.etc}
              />
            );
          }
        };
      });
    }
    return [];
  };

  const columns: ColumnType<tAttendanceTable>[] = useMemo(
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
      }
    ],
    []
  );

  return (
    <GRTable
      rowKey={"name"}
      columns={concat(columns, renderAddDay())}
      data={attendanceList}
      isHoverTable={false}
      paginationProps={{
        total: 100,
        defaultPageSize: 10
      }}
      scroll={{ x: 1300 }}
    />
  );
};

export default AttendanceSearchTable;
