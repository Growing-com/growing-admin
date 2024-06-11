import GRTable from "@component/atom/GRTable";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { getInActiveUser } from "api/account";
import queryKeys from "api/queryKeys";
import GRStylesConfig from "styles/GRStylesConfig";

export const NewFamilyLineOutTable = () => {
  const { data: inActiveUser } = useQuery(
    [queryKeys.IN_ACTIVE_USERS],
    async () => await getInActiveUser(),
    { select: _data => _data.content }
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
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem",
      sorter: (a, b) => a.grade - b.grade
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      width: "5rem",
      render: (_, record) => <ColumSexRender sexData={record?.sex} />
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "15rem"
    },
    {
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
      }
    },
    {
      title: "최종 수정자",
      dataIndex: "updatedBy",
      key: "updatedBy",
      align: "center",
      width: "5rem",
      render: (_, record) => {
        return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
      }
    },
    {
      title: "수정자 날짜",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        return record.updatedAt;
      }
    }
  ];

  return (
    <>
      <GRTable
        rowKey={"id"}
        columns={columns}
        data={inActiveUser}
        isHoverTable={false}
        marginbottom={GRStylesConfig.BASE_MARGIN}
        scroll={{ y: "20rem" }}
        pagination={{
          total: inActiveUser?.length,
          position: ["bottomCenter"]
        }}
      />
    </>
  );
};
