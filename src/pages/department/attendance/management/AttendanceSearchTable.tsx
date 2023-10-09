import GRTable from "@component/atom/GRTable";
import ColumAttendanceRender from "@component/templates/table/ColumAttendanceRender";
import ColumSexRender from "@component/templates/table/ColumSexRender";

import { ColumnType } from "antd/es/table";
import { tUseAttendanceQueryResposne } from "api/attendance";
import { concat } from "lodash";

import { FC, useMemo } from "react";

type tAttendanceSearchTable = {
  attendanceList?: tUseAttendanceQueryResposne[];
  attendanceListSize?: number;
  attendanceListTotal?: number;
  attendanceListPage?: number;
  onChangePage: (page: number, pageSize: number) => void;
};

const AttendanceSearchTable: FC<tAttendanceSearchTable> = ({
  attendanceList,
  attendanceListSize,
  attendanceListTotal,
  onChangePage,
  attendanceListPage
}) => {
  const renderAddDay = () => {
    if (!attendanceList?.length) return [];

    const _attendanceItems = attendanceList?.[0].attendanceItems;
    if (_attendanceItems?.length) {
      return _attendanceItems.map((item: any) => {
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
      }
    ],
    []
  );

  return (
    <GRTable
      rowKey={"name"}
      columns={concat(
        columns,
        renderAddDay() as ColumnType<tUseAttendanceQueryResposne>[]
      )}
      data={attendanceList}
      isHoverTable={false}
      paginationProps={{
        total: attendanceListTotal,
        defaultPageSize: attendanceListSize,
        onChange: onChangePage,
        current: attendanceListPage
      }}
      scroll={{ x: 1300 }}
    />
  );
};

export default AttendanceSearchTable;
