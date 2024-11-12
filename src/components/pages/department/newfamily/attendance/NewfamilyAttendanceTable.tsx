import GRTab from "@component/atom/GRTab";
import GRTable from "@component/atom/GRTable";
import { tOptions } from "@component/atom/dataEntry/type";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import { Alert, TableColumnsType, Tooltip } from "antd";
import {
  tAttendanceItems,
  tNewfamily,
  tNewfamilyAttendances
} from "api/newfamily/type";
import { SEX_NAME } from "config/const";
import { head } from "lodash";
import { useEffect, useState } from "react";
import { koreanSorter } from "utils/sorter";

const TOOLTIP_INFO = `* 초록색: 4주 이상 출석 \n * 빨간색: 연속 4주 결석 \n * 노란색: 연속 3주 결석`;

type tNewfamilyAttendanceTable = {
  searchName: string;
  selectedNewFamily: tNewfamily[];
  onSelect: (key: React.Key[], selectedRows: any[]) => void;
  tabProps: {
    newfamilyGroupAttendanceData: tNewfamilyAttendances[];
    newfamilyLeaderTabOption: tOptions[];
    onChangeLeaderTab: (_groupId: string) => void;
  };
};

const NewfamilyAttendanceTable: React.FC<tNewfamilyAttendanceTable> = ({
  searchName,
  selectedNewFamily,
  onSelect,
  tabProps
}) => {
  const {
    newfamilyGroupAttendanceData,
    newfamilyLeaderTabOption,
    onChangeLeaderTab
  } = tabProps;

  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tNewfamilyAttendances[]
  >([]);
  const [attendanceData, setAttendanceData] = useState<
    tNewfamilyAttendances | undefined
  >();

  const getRowClassName = (record: any) => {
    const lineOutRow =
      record.attendanceItems
        .slice(0, 4)
        .filter((item: tAttendanceItems) => item.status === "ABSENT").length ===
      4;
    if (lineOutRow) {
      return "highlight-lineout";
    }

    const warningRow =
      record.attendanceItems
        .slice(0, 3)
        .filter((item: tAttendanceItems) => item.status === "ABSENT").length ===
      3;
    if (warningRow) {
      return "highlight-warning";
    }

    return record.totalAttendCount >= 4 ? "highlight-promote" : "";
  };

  const columns: TableColumnsType<any> = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "5rem",
      minWidth: 75
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "5rem",
      minWidth: 60,
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem",
      minWidth: 60,
      sorter: {
        compare: (a, b) => a.grade - b.grade,
        multiple: 1
      }
    },
    {
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "6rem",
      minWidth: 100,
      sorter: {
        compare: (a, b) =>
          koreanSorter(a.newFamilyGroupLeaderName, b.newFamilyGroupLeaderName),
        multiple: 3
      }
    },
    {
      title: "출석수",
      dataIndex: "totalAttendCount",
      key: "totalAttendCount",
      align: "center",
      fixed: "left",
      width: "5rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => a.totalAttendCount - b.totalAttendCount,
        multiple: 4
      }
    },
    {
      title: "결석수",
      dataIndex: "totalAbsentCount",
      key: "totalAbsentCount",
      align: "center",
      fixed: "left",
      width: "5rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => a.totalAbsentCount - b.totalAbsentCount,
        multiple: 2
      }
    },
    {
      title: () => {
        return (
          <Tooltip
            overlayStyle={{ whiteSpace: "pre-line" }}
            title={TOOLTIP_INFO}
          >
            <GRFlexView alignItems={"center"}>
              <Alert
                showIcon
                message={
                  <GRText weight={"bold"} fontSize={"b7"}>
                    출석 날짜
                  </GRText>
                }
                type={"info"}
                banner={true}
                style={{ backgroundColor: "transparent" }}
              />
            </GRFlexView>
          </Tooltip>
        );
      },
      align: "center",
      children: attendanceData?.attendanceItems.map(item => ({
        title: item.date,
        dataIndex: "attendanceItems",
        key: "attendanceItems",
        align: "center",
        minWidth: 100,
        render: (record: tAttendanceItems[]) => {
          const findData = record.find(r => r.date === item.date);
          return (
            <ColumAttendanceRender
              attendanceStatus={findData?.status}
              contentEtc={findData?.reason}
            />
          );
        }
      }))
    }
  ];

  useEffect(() => {
    if (newfamilyGroupAttendanceData?.length) {
      setAttendanceData(head(newfamilyGroupAttendanceData));
    }
  }, [newfamilyGroupAttendanceData]);

  useEffect(() => {
    if (newfamilyGroupAttendanceData?.length) {
      let _filterNewFamily = newfamilyGroupAttendanceData;
      if (searchName) {
        _filterNewFamily = newfamilyGroupAttendanceData.filter(newFamily => {
          return newFamily.name?.indexOf(searchName) !== -1;
        });
      }
      setFilteredNewFailyData(_filterNewFamily);
    } else {
      setFilteredNewFailyData([]);
    }
  }, [newfamilyGroupAttendanceData, searchName]);

  return (
    <>
      <GRTab
        items={newfamilyLeaderTabOption}
        size={"small"}
        type={"card"}
        onChange={onChangeLeaderTab}
        fontWeight={"normal"}
        marginBottom={"0rem"}
      />
      <GRTable
        rowKey={"newFamilyId"}
        columns={columns}
        data={filteredNewFailyData}
        pagination={{
          total: filteredNewFailyData?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
        rowSelection={{
          selectedRowKeys: selectedNewFamily.map(
            newFamily => newFamily.newFamilyId
          ),
          onChange: onSelect
        }}
        scroll={{ x: true }}
        tableLayout={"auto"}
        rowClassName={getRowClassName}
        rowHoverable={false}
      />
    </>
  );
};

export default NewfamilyAttendanceTable;
