import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { getPromotedNewfamilies } from "api/newfamily";
import { tNewfamilyPromoted } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { SEX_NAME } from "config/const";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tNewfamilyPromotedTable = {
  searchName: string;
};

const NewfamilyPromotedTable: React.FC<tNewfamilyPromotedTable> = ({
  searchName
}) => {
  const router = useRouter();

  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tNewfamilyPromoted[]
  >([]);

  const { data: newFamilyPromotedData } = useQuery(
    [queryKeys.NEW_FAMILY_PROMOTED],
    async () => await getPromotedNewfamilies(),
    {
      select: _data => _data.content
    }
  );

  const columns: ColumnType<any>[] = [
    {
      title: "등반 순장",
      align: "center",
      dataIndex: "smallGroupLeaderName",
      width: "8rem",
      minWidth: 90,
      render: (_, item) => {
        if (!item) return;
        return <GRText>{item?.smallGroupLeaderName}</GRText>;
      },
      sorter: (a, b) => {
        return koreanSorter(a.smallGroupLeaderName, b.smallGroupLeaderName);
      }
    },
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
      title: "등반일",
      dataIndex: "promoteDate",
      key: "promoteDate",
      align: "center",
      width: "8rem",
      minWidth: 85,
      render: (_, record) => checkDefaultDate(record.promoteDate),
      sorter: (valueA, valueB) =>
        dateSorter(valueA.promoteDate, valueB.promoteDate)
    },
    {
      title: "등반 후 경과 주",
      dataIndex: "weeksAfterPromotion",
      key: "weeksAfterPromotion",
      align: "center",
      width: "8rem",
      minWidth: 105,
      render: (_, record) => (
        <GRText>{`${record.weeksAfterPromotion} 주`}</GRText>
      )
    },
    {
      title: "등반 후 출석 주",
      dataIndex: "attendanceAfterPromotion",
      key: "attendanceAfterPromotion",
      align: "center",
      width: "8rem",
      minWidth: 105,
      render: (_, record) => (
        <GRText>{`${record.attendanceAfterPromotion} 주`}</GRText>
      )
    },
    {
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "6rem",
      minWidth: 100
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem",
      minWidth: 110
    }
  ];

  const onClickUpdateNewFamily = (_newFamilyId: number) => {
    router.push(`/department/newfamily/${_newFamilyId}`);
  };

  useEffect(() => {
    if (newFamilyPromotedData?.length) {
      let _filterNewFamily = newFamilyPromotedData;
      if (searchName) {
        _filterNewFamily = newFamilyPromotedData.filter(newFamily => {
          return newFamily.name?.indexOf(searchName) !== -1;
        });
      }
      setFilteredNewFailyData(_filterNewFamily);
    } else {
      setFilteredNewFailyData([]);
    }
  }, [newFamilyPromotedData, searchName]);

  return (
    <>
      <GRTable
        rowKey={"newFamilyId"}
        columns={columns}
        data={filteredNewFailyData}
        pagination={{
          total: filteredNewFailyData?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
      />
    </>
  );
};

export default NewfamilyPromotedTable;
