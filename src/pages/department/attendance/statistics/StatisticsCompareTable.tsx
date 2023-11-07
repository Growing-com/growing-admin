import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import UserHistoryModal from "@component/templates/modal/UserHistoryModal";
import ColumDateTitleAttendanceRender from "@component/templates/table/ColumDateTitleAttendanceRender";
import { ColumnType } from "antd/es/table";
import { tAttendanceCheckListItem } from "api/attendance/types";
import { useCallback, useMemo, useState } from "react";
import { koreanSorter, numberSorter } from "utils/sorter";

type tStatisticsCompareTable = {
  headerTitle: string;
  dataSource?: tAttendanceCheckListItem[];
};

const StatisticsCompareTable = ({
  headerTitle,
  dataSource
}: tStatisticsCompareTable) => {
  const [selectUserId, setSelectUserId] = useState<number>();

  const onClickLinkText = useCallback((_recode?: tAttendanceCheckListItem) => {
    setSelectUserId(_recode?.userId);
  }, []);

  const absentColumns: ColumnType<tAttendanceCheckListItem>[] = useMemo(
    () => [
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
        width: "5rem",
        sorter: (a, b) => koreanSorter(a.userName, b.userName),
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
        width: "5rem",
        sorter: (a, b) => numberSorter(a.grade, b.grade)
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
          attendanceList: dataSource
        }) as tAttendanceCheckListItem)
      }
    ],
    [dataSource, onClickLinkText]
  );

  return (
    <>
      <GRTable
        rowKey={"name"}
        marginbottom={2}
        headerComponent={
          <GRText
            weight={"bold"}
            fontSize={"b4"}
            marginright={0.5}
            marginbottom={1}
          >
            {headerTitle}
          </GRText>
        }
        isHoverTable={false}
        columns={absentColumns}
        data={dataSource}
        scroll={{ y: 200 }}
      />
      <UserHistoryModal
        open={!!selectUserId}
        onClose={onClickLinkText}
        userId={selectUserId}
      />
    </>
  );
};

export default StatisticsCompareTable;
