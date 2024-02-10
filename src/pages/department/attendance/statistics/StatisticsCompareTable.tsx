import GRTab from "@component/atom/GRTab";
import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import { tOptions } from "@component/atom/dataEntry/type";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import ExcelButton from "@component/molecule/button/ExcelButton";
import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import UserHistoryModal from "@component/templates/modal/UserHistoryModal";
import { ColumnType } from "antd/es/table";
import {
  tAttendanceCheckListItem,
  tAttendanceItem
} from "api/attendance/types";
import { useStatisticsDataToExcel } from "hooks/useStatisticsDataToExcel";
import { Dictionary, groupBy } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Color } from "styles/colors";
import { getWeekDataFromToday } from "utils/DateUtils";
import { koreanSorter, numberSorter } from "utils/sorter";

type tStatisticsCompareTable = {
  headerTitle: string;
  dataSource?: tAttendanceCheckListItem[];
  isUseTab?: boolean;
  infoMessage: string;
};

const StatisticsCompareTable = ({
  headerTitle,
  dataSource,
  isUseTab = false,
  infoMessage
}: tStatisticsCompareTable) => {
  const [selectUserId, setSelectUserId] = useState<number>();
  const [managerTabItems, setManagerTabItems] = useState<tOptions[]>([]);
  const [statisticsDatasource, setStatisticsDatasource] =
    useState<tAttendanceCheckListItem[]>();
  const [groupByStatisticsDatasource, setGroupByStatisticsDatasource] =
    useState<Dictionary<tAttendanceCheckListItem[]>>();
  const [handleStatisticsDataToExcel] = useStatisticsDataToExcel();
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

  const onClickExcel = useCallback(async () => {
    try {
      if (!dataSource?.length) {
        throw new Error("추출 데이터가 없습니다");
      }
      await handleStatisticsDataToExcel(headerTitle, "attendance", dataSource);
      return GRAlert.success("엑셀 추출 성공");
    } catch (e) {
      GRAlert.error("엑셀 추출 실패");
    }
  }, [dataSource, handleStatisticsDataToExcel, headerTitle]);

  const onChangeTab = useCallback(
    (_tabValue: string) => {
      if (groupByStatisticsDatasource) {
        const _managerdatasource = groupByStatisticsDatasource[_tabValue];
        setStatisticsDatasource(_managerdatasource);
      }
    },
    [groupByStatisticsDatasource]
  );

  useEffect(() => {
    if (isUseTab) {
      const _groupByManager = groupBy(dataSource, "managerName");
      const _tabItem = Object.keys(_groupByManager).map(manager => ({
        label: manager,
        value: manager
      }));
      const initTab = _tabItem[0];
      setGroupByStatisticsDatasource(_groupByManager);
      setManagerTabItems(_tabItem);
      setStatisticsDatasource(_groupByManager[initTab?.value]);
    } else {
      setStatisticsDatasource(dataSource);
    }
  }, [dataSource, isUseTab]);

  return (
    <>
      <GRFlexView flexDirection={"row"} alignItems={"center"} margintop={3}>
        <GRText weight={"bold"} fontSize={"b4"} marginright={0.5}>
          {headerTitle}
        </GRText>
        <GRInfoBadge infoMessage={infoMessage} />
      </GRFlexView>
      <GRTable
        rowKey={"userName"}
        marginbottom={2}
        headerComponent={
          <GRView>
            <GRTab
              items={managerTabItems}
              onChange={onChangeTab}
              tabBarExtraContent={
                <ExcelButton
                  size={"small"}
                  onClickExcel={onClickExcel}
                  onlyIcon
                />
              }
            />
            <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
              <GRView>
                <GRText weight={"bold"}>리스트 </GRText>
                <GRText color={Color.grey60}>
                  <GRText weight={"bold"} color={Color.green200}>
                    {statisticsDatasource?.length ?? 0} 명
                  </GRText>
                  <GRText marginhorizontal={"0.3"}>/</GRText>
                  <GRText fontSize={"b8"} color={Color.grey80}>
                    {" "}
                    총 {dataSource?.length ?? 0} 명
                  </GRText>
                </GRText>
              </GRView>
            </GRFlexView>
          </GRView>
        }
        isHoverTable={false}
        columns={absentColumns}
        data={statisticsDatasource}
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
