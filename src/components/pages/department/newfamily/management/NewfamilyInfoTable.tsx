import GRTab from "@component/atom/GRTab";
import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { getNewfamilies } from "api/newfamily";
import { tNewfamily } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { SEX_NAME } from "config/const";
import { useCurrentTermInfoOptionQueries } from "hooks/queries/term/useCurrentTermInfoOptionQueries";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tNewfamilyInfoTable = {
  searchName: string;
};

const NewfamilyInfoTable: React.FC<tNewfamilyInfoTable> = ({ searchName }) => {
  const router = useRouter();

  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tNewfamily[]
  >([]);
  const [currentGroupId, setCurrentGroupId] = useState<string>("0");

  const { currentTermNewFamilyLeaderOptions } =
    useCurrentTermInfoOptionQueries();

  const tabOption = useMemo(
    () => [{ label: "전체", value: "0" }, ...currentTermNewFamilyLeaderOptions],
    [currentTermNewFamilyLeaderOptions]
  );

  const { data: newFamilyData, isLoading } = useQuery(
    [queryKeys.NEW_FAMILY, currentGroupId],
    async () => {
      if (currentGroupId === "0") {
        return await getNewfamilies();
      }
      return await getNewfamilies({ newFamilyGroupId: Number(currentGroupId) });
    },
    {
      select: _data => _data.content
    }
  );

  const onChangeTab = (_groupId: string) => {
    setCurrentGroupId(_groupId);
  };

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
      minWidth: 60,
      sorter: (a, b) => a.grade - b.grade
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
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "6rem",
      minWidth: 100,
      sorter: (a, b) => {
        return koreanSorter(
          a.newFamilyGroupLeaderName,
          b.newFamilyGroupLeaderName
        );
      }
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
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem",
      minWidth: 110
    }
  ];

  const onClickUpdateNewFamily = (_newFamilyId: number) => {
    router.push(`/department/newfamily/management/${_newFamilyId}`);
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
      <GRTab
        items={tabOption}
        size={"small"}
        type={"card"}
        onChange={onChangeTab}
        fontWeight={"normal"}
        marginBottom={"0rem"}
      />
      <GRTable
        rowKey={"newFamilyId"}
        columns={columns}
        data={filteredNewFailyData}
        isLoading={isLoading}
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

export default NewfamilyInfoTable;
