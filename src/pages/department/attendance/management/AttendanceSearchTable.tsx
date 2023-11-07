import GRTable from "@component/atom/GRTable";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import UserHistoryModal from "@component/templates/modal/UserHistoryModal";
import ColumDateTitleAttendanceRender from "@component/templates/table/ColumDateTitleAttendanceRender";

import { ColumnType } from "antd/es/table";
import { tUseAttendanceQueryResposne } from "api/attendance";

import { FC, useCallback, useMemo, useState } from "react";

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
  const [selectUserId, setSelectUserId] = useState<number>();
  const onClickLinkText = useCallback(
    (_recode?: tUseAttendanceQueryResposne) => {
      setSelectUserId(_recode?.userId);
    },
    []
  );

  const columns: ColumnType<tUseAttendanceQueryResposne>[] = useMemo(
    () => [
      {
        title: "나무",
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
        render: (_, record) => <ColumSexRender sexData={record.sex} />
      },
      {
        ...(ColumDateTitleAttendanceRender({
          attendanceList
        }) as tUseAttendanceQueryResposne)
      }
    ],
    [attendanceList, onClickLinkText]
  );

  return (
    <>
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
      {selectUserId && (
        <UserHistoryModal
          open={!!selectUserId}
          onClose={onClickLinkText}
          userId={selectUserId}
        />
      )}
    </>
  );
};

export default AttendanceSearchTable;
