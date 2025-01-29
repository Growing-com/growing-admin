import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { getLineOutNewfamilies } from "api/newfamily";
import { tLineOutNewFamily } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { SEX_NAME } from "config/const";
import { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter } from "utils/sorter";

type tNewfamilyLineOutTable = {
  searchName: string;
  onSelectLineOut: (key: React.Key[], selectedRows: any[]) => void;
};

const NewfamilyLineOutTable: React.FC<tNewfamilyLineOutTable> = ({
  searchName,
  onSelectLineOut
}) => {
  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tLineOutNewFamily[]
  >([]);

  const { data: newFamilyData } = useQuery({
    queryKey: [queryKeys.NEW_FAMILY_LINE_OUT],
    queryFn: async () => await getLineOutNewfamilies(),
    select: _data => _data.content
  });

  const columns: ColumnType<any>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
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
      minWidth: 60
    },
    {
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      minWidth: 85,
      render: (_, record) => checkDefaultDate(record.birth)
    },
    {
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center",
      width: "8rem",
      minWidth: 85,
      sorter: (valueA, valueB) =>
        dateSorter(valueA.visitDate, valueB.visitDate),
      render: (_, record) => checkDefaultDate(record.visitDate)
    },
    {
      title: "라인아웃날짜",
      key: "lineOutDate",
      dataIndex: "lineOutDate",
      align: "center",
      width: "8rem",
      minWidth: 100,
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
