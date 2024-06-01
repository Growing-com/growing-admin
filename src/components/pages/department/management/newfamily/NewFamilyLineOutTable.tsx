import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { ColumnType } from "antd/es/table";
import { useTermNewFamily } from "api/term/queries/useTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { dateSorter, koreanSorter } from "utils/sorter";

export const NewFamilyLineOutTable = () => {
  const { data: newFamilyData, refetch } = useTermNewFamily({ termId: 1 });

  const columns: ColumnType<tTermNewFamily>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "등반일",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        if (!record.lineoutDate && !record.lineupDate) return "";
        const date = record.lineoutDate
          ? record.lineoutDate
          : record.lineupDate;
        return <GRText weight={"bold"}>{date}</GRText>;
      }
    },
    {
      title: "새가족 순장",
      dataIndex: "newTeamLeaderName",
      key: "newTeamLeaderName",
      align: "center",
      width: "6rem"
    },
    {
      title: "등반 순장",
      align: "center",
      dataIndex: "firstPlantLeaderName",
      width: "8rem",
      sorter: (a, b) =>
        koreanSorter(a.firstPlantLeaderName, b.firstPlantLeaderName)
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
      dataIndex: "sex",
      key: "sex",
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
      render: (_, record) => {
        return record?.birth !== "1970-01-01" ? record?.birth : "-";
      }
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
      render: (_, record) => {
        return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
      }
    }
  ];

  return (
    <GRTable
      columns={columns}
      data={newFamilyData}
      pagination={{
        total: newFamilyData?.length,
        defaultPageSize: 10,
        position: ["bottomCenter"]
      }}
    />
  );
};
