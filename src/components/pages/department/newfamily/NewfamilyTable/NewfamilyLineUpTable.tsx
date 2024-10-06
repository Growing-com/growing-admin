import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { getLineUpRequestNewfamilies } from "api/newfamily";
import { tNewfamily } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tNewfamilyLineUpTable = {
  searchName: string;
  selectedNewFamily: tNewfamily[];
  onSelect: (key: React.Key[], selectedRows: any[]) => void;
};

const NewfamilyLineUpTable: React.FC<tNewfamilyLineUpTable> = ({
  searchName,
  selectedNewFamily,
  onSelect
}) => {
  const router = useRouter();

  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tNewfamily[]
  >([]);

  const { data: newFamilyData } = useQuery(
    [queryKeys.NEW_FAMILY_LINE_UP_REQUEST],
    async () => await getLineUpRequestNewfamilies(),
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
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "6rem",
      sorter: (a, b) => {
        return koreanSorter(
          a.newFamilyGroupLeaderName,
          b.newFamilyGroupLeaderName
        );
      }
    },
    {
      title: "일반 순장",
      align: "center",
      dataIndex: "smallGroupLeaderName",
      width: "8rem",
      render: (_, item) => {
        if (!item) return;
        return <GRText>{item?.smallGroupLeaderName}</GRText>;
      },
      sorter: (a, b) => {
        return koreanSorter(a.smallGroupLeaderName, b.smallGroupLeaderName);
      }
    },
    {
      title: "등반일",
      dataIndex: "promoteDate",
      key: "promoteDate",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.promoteDate),
      sorter: (valueA, valueB) =>
        dateSorter(dayjs(valueA.promoteDate), dayjs(valueB.promoteDate)),
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
    }
  ];

  const onClickUpdateNewFamily = (_newFamilyId: number) => {
    router.push(`/department/newfamily/${_newFamilyId}`);
  };

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
    </>
  );
};

export default NewfamilyLineUpTable;
