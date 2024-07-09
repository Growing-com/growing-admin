import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { ColumnType } from "antd/es/table";
import { TableRowSelection } from 'antd/es/table/interface';
import { tTermNewFamily } from "api/term/types";
import { DUTY_NAME, SEX_NAME } from "config/const";
import { FC } from "react";

type tNewFamilyInfoTable = {
  data?: tTermNewFamily[];
  rowSelection: TableRowSelection<tTermNewFamily>; 
};

const NewFamilyInfoTable: FC<tNewFamilyInfoTable> = ({
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
      title: "직분",
      dataIndex: "duty",
      key: "duty",
      align: "center",
      width: "10rem",
      render: (_, item) => {
        if (!item?.duty) return;
        return DUTY_NAME[item?.duty];
      }
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
    }
  ];
  return (
    <GRTable
      data={data}
      columns={columns}
      rowKey={record => record.teamMemberId}
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

export default NewFamilyInfoTable;
