import GRTable from "@component/atom/GRTable";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import queryKeys from "api/queryKeys";
import { getLineOutNewFamiles } from "apiV2/newFamily";
import { tLineOutNewFamilyV2 } from "apiV2/newFamily/type";
import GRStylesConfig from "styles/GRStylesConfig";

type tNewFamilyLineOutTable = {
  onSelectLineOut: (key: React.Key[], selectedRows: any[]) => void;
};

export const NewFamilyLineOutTable = ({
  onSelectLineOut
}: tNewFamilyLineOutTable) => {
  const { data: lineOutNewFamiles } = useQuery(
    [queryKeys.NEW_FAMILY_LINE_OUT_V2],
    async () => await getLineOutNewFamiles(),
    { select: _data => _data.content }
  );

  const columns: ColumnType<tLineOutNewFamilyV2>[] = [
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
      title: "라인아웃 날짜",
      dataIndex: "lineoutAt",
      key: "lineoutAt",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        return record?.lineoutAt !== "1970-01-01" ? record?.lineoutAt : "-";
      }
    }
  ];

  return (
    <GRTable
      rowKey={"id"}
      columns={columns}
      data={lineOutNewFamiles}
      isHoverTable={false}
      marginbottom={GRStylesConfig.BASE_MARGIN}
      scroll={{ y: "20rem" }}
      pagination={{
        total: lineOutNewFamiles?.length,
        position: ["bottomCenter"]
      }}
      rowSelection={{
        type: "radio",
        onChange: onSelectLineOut
      }}
    />
  );
};
