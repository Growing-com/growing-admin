import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import { useQuery } from "@tanstack/react-query";
import { TableColumnsType } from "antd";
import { getNewfamiliesAttendances } from "api/newfamily";
import {
  tAttendanceItems,
  tNewfamily,
  tNewfamilyAttendances
} from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { SEX_NAME } from "config/const";
import { head } from "lodash";
import { useEffect, useState } from "react";

type tNewfamilyInfoTable = {
  searchName: string;
  selectedNewFamily: tNewfamily[];
  onSelect: (key: React.Key[], selectedRows: any[]) => void;
};

const NewfamilyAttendanceTable: React.FC<tNewfamilyInfoTable> = ({
  searchName,
  selectedNewFamily,
  onSelect
}) => {
  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tNewfamilyAttendances[]
  >([]);
  const [attendanceItems, setAttendanceItems] = useState<
    tNewfamilyAttendances | undefined
  >();

  const { data: newFamilyAttendanceData } = useQuery(
    [queryKeys.NEW_FAMILY_ATTENDANCE],
    async () => await getNewfamiliesAttendances(),
    {
      select: _data => _data.content,
      onSuccess: data => setAttendanceItems(head(data))
    }
  );

  const columns: TableColumnsType<any> = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "5rem",
      minWidth: 53
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "5rem",
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
      width: "5rem"
    },
    {
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "6rem",
      minWidth: 53
    },
    {
      title: "출석수",
      dataIndex: "totalAttendCount",
      key: "totalAttendCount",
      align: "center",
      fixed: "left",
      width: "5rem",
      sorter: (a, b) => a.totalAttendCount - b.totalAttendCount
    },
    {
      title: "결석수",
      dataIndex: "totalAbsentCount",
      key: "totalAbsentCount",
      align: "center",
      fixed: "left",
      width: "5rem",
      sorter: (a, b) => a.totalAbsentCount - b.totalAbsentCount
    },
    {
      title: "출석 날짜",
      align: "center",
      children: attendanceItems?.attendanceItems.map(item => ({
        title: item.date,
        dataIndex: "attendanceItems",
        key: "attendanceItems",
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
    if (newFamilyAttendanceData?.length) {
      let _filterNewFamily = newFamilyAttendanceData;
      if (searchName) {
        _filterNewFamily = newFamilyAttendanceData.filter(newFamily => {
          return newFamily.name?.indexOf(searchName) !== -1;
        });
      }
      setFilteredNewFailyData(_filterNewFamily);
    } else {
      setFilteredNewFailyData([]);
    }
  }, [newFamilyAttendanceData, searchName]);

  return (
    <>
      {/* <button
        onClick={() => {
          console.log(newFamilyAttendanceData);
        }}
      >
        newFamilyAttendanceData
      </button> */}
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
      />
    </>
  );
};

export default NewfamilyAttendanceTable;
