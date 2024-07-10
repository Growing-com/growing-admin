import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { ColumnType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { tTermNewFamily } from "api/term/types";
import { SEX_NAME } from "config/const";
import { FC } from "react";

type tNewFamilyLineOutTable = {
  data?: tTermNewFamily[];
  rowSelection: TableRowSelection<tTermNewFamily>;
};

const NewFamilyLineOutTable: FC<tNewFamilyLineOutTable> = ({
  data,
  rowSelection
}) => {
  const columns: ColumnType<tTermNewFamily>[] = [
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
        return record?.birth !== null && record?.birth !== "1970-01-01"
          ? record?.birth
          : "-";
      }
    },
    {
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center",
      width: "5rem"
    },
    {
      title: "라인아웃 날짜",
      dataIndex: "lineoutDate",
      key: "lineoutDate",
      align: "center",
      width: "5rem"
    }
  ];

  return (
    <GRTable
      data={data}
      columns={columns}
      rowKey={record => record.id ? record.id : record.teamMemberId}
      rowSelection={rowSelection}
      pagination={{
        total: data?.length,
        defaultPageSize: 10,
        position: ["bottomCenter"]
      }}
      scroll={{ x: 1300 }}
    />
  );
};

export default NewFamilyLineOutTable;
