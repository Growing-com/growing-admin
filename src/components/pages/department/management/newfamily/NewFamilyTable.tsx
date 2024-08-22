import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import queryKeys from "api/queryKeys";
import { getNewFamilies } from "apiV2/newFamily";
import { tNewFamilyV2 } from "apiV2/newFamily/type";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tNewFamilyTable = {
  selectedNewFamily: tNewFamilyV2[];
  onSelect: (key: React.Key[], selectedRows: any[]) => void;
  searchName: string;
};

export const NewFamilyTable: FC<tNewFamilyTable> = ({
  selectedNewFamily,
  onSelect,
  searchName
}) => {
  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tNewFamilyV2[]
  >([]);
  const { data: newFamilyData } = useQuery(
    [queryKeys.NEW_FAMILY_V2],
    async () => await getNewFamilies(),
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
      title: "등반일",
      dataIndex: "promoteDate",
      key: "promoteDate",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.promoteDate)
    },
    {
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "6rem"
    },
    {
      title: "순장",
      align: "center",
      dataIndex: "promotedSmallGroupLeaderName",
      width: "8rem",
      render: (_, item) => {
        if (!item) return;
        return <GRText>{item?.promotedSmallGroupLeaderName ?? item?.smallGroupLeaderName}</GRText>;
      },
      sorter: (a, b) => {
        const nameA = a.promotedSmallGroupLeaderName ?? a.smallGroupLeaderName;
        const nameB = b.promotedSmallGroupLeaderName ?? b.smallGroupLeaderName;
        return koreanSorter(nameA, nameB);
      },
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
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
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.birth)
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
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
    />
  );
};
