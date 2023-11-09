import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import UserHistoryModal from "@component/templates/modal/UserHistoryModal";
import { ColumnType } from "antd/es/table";
import {
  tAttendanceCheckListItem,
  tAttendanceItem
} from "api/attendance/types";
import { useCallback, useMemo, useState } from "react";
import { getWeekDataFromToday } from "utils/DateUtils";
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
        title: "출석 날짜",
        align: "center",
        children: [
          {
            title: getWeekDataFromToday.lastlastSunday,
            dataIndex: "attendanceItems",
            align: "center",
            render: (record: tAttendanceItem[]) => {
              const findData = record.find(
                r => r.week === getWeekDataFromToday.lastlastSunday
              );
              return (
                <ColumAttendanceRender
                  attendanceStatus={findData?.status}
                  contentEtc={findData?.etc}
                />
              );
            }
          },
          {
            title: getWeekDataFromToday.lastSunday,
            dataIndex: "attendanceItems",
            align: "center",
            render: (record: tAttendanceItem[]) => {
              const findData = record.find(
                r => r.week === getWeekDataFromToday.lastSunday
              );
              return (
                <ColumAttendanceRender
                  attendanceStatus={findData?.status}
                  contentEtc={findData?.etc}
                />
              );
            }
          }
        ]
      }
    ],
    [onClickLinkText]
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
