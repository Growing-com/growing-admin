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
import { koreanSorter } from "utils/sorter";

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
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
    },
    {
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "6rem"
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
      render: (_, record) => checkDefaultDate(record.promoteDate)
    },
    {
      title: "등반 후 경과 주",
      dataIndex: "weeksAfterPromotion",
      key: "weeksAfterPromotion",
      align: "center",
      width: "8rem",
      render: (_, record) => (
        <GRText>{`${record.weeksAfterPromotion} 주`}</GRText>
      )
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
        onRow={record => {
          return { onClick: () => onClickUpdateNewFamily(record.newFamilyId) };
        }}
      />
    </>
  );
};

export default NewfamilyPromotedTable;
