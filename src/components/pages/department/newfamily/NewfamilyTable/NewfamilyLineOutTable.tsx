import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { getLineOutNewfamilies } from "api/newfamily";
import { tLineOutNewFamily } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter } from "utils/sorter";

type tNewfamilyInfoTable = {
  searchName: string;
  onSelectLineOut: (key: React.Key[], selectedRows: any[]) => void;
};

const NewfamilyLineOutTable: React.FC<tNewfamilyInfoTable> = ({
  searchName,
  onSelectLineOut
}) => {
  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tLineOutNewFamily[]
  >([]);

  const { data: newFamilyData } = useQuery(
    [queryKeys.NEW_FAMILY_LINE_OUT],
    async () => await getLineOutNewfamilies(),
    {
      select: _data => _data.content
    }
  );

  const columns: ColumnType<any>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
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
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.birth)
    },
    {
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center",
      width: "8rem",
      sorter: (valueA, valueB) =>
        dateSorter(dayjs(valueA.visitDate), dayjs(valueB.visitDate)),
      render: (_, record) => checkDefaultDate(record.visitDate)
    },
    {
      title: "라인아웃날짜",
      key: "lineOutDate",
      dataIndex: "lineOutDate",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.lineOutDate)
    }
  ];

  useEffect(() => {
    if (newFamilyData?.length) {
      let _filterNewFamily = newFamilyData;
      if (searchName) {
        _filterNewFamily = newFamilyData.filter(newFamily => {
          return newFamily.name?.indexOf(searchName) !== -1;
        });
      }
      setFilteredNewFailyData(_filterNewFamily);
    } else {
      setFilteredNewFailyData([]);
    }
  }, [newFamilyData, searchName]);

  return (
    <>
      {/* <button
        onClick={() => {
          console.log(newFamilyData);
        }}
      >
        newFamilyData
      </button> */}
      <GRTable
        rowKey={"lineOutNewFamilyId"}
        columns={columns}
        data={filteredNewFailyData}
        pagination={{
          total: filteredNewFailyData?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
        rowSelection={{
          type: "radio",
          onChange: onSelectLineOut
        }}
      />
    </>
  );
};

export default NewfamilyLineOutTable;
