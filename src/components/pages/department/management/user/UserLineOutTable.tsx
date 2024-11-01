import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { TableColumnsType } from "antd";
import { useLineOutUserListQuery } from "api/management/user/queries/useLineOutUserListQuery";
import { tLineOutUser } from "api/management/user/type";
import { SEX_NAME } from "config/const";
import React, { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tUserLineOutTable = {
  searchName: string;
  onSelect: (key: React.Key[], selectedRows: any[]) => void;
};

const UserLineOutTable: React.FC<tUserLineOutTable> = ({
  searchName,
  onSelect
}) => {
  const [filteredUserData, setFilteredUserData] = useState<tLineOutUser[]>([]);

  const { data: lineOutUserData, isLoading } = useLineOutUserListQuery();

  useEffect(() => {
    if (!lineOutUserData || lineOutUserData.length === 0) {
      setFilteredUserData([]);
      return;
    }
    let _filterUser = lineOutUserData;
    if (searchName) {
      _filterUser = lineOutUserData.filter(user => {
        return user.name?.indexOf(searchName) !== -1;
      });
    }
    setFilteredUserData(_filterUser);
  }, [lineOutUserData, searchName]);

  const columns: TableColumnsType<any> = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      sorter: {
        compare: (a, b) => koreanSorter(a.name, b.name),
        multiple: 1
      }
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "4rem",
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      },
      sorter: {
        compare: (a, b) => koreanSorter(SEX_NAME[a.sex], SEX_NAME[b.sex]),
        multiple: 2
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "4rem",
      sorter: { compare: (a, b) => a.grade - b.grade, multiple: 3 }
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
      title: "라인아웃 날짜",
      dataIndex: "lineOutDate",
      key: "lineOutDate",
      align: "center",
      width: "10rem",
      render: (_, record) => checkDefaultDate(record.lineOutDate),
      sorter: {
        compare: (valueA, valueB) =>
          dateSorter(valueA.lineOutDate, valueB.lineOutDate),
        multiple: 4
      }
    },
    {
      title: "이유",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      width: "10rem"
    }
  ];

  return (
    <>
      <GRTable
        rowKey={"lineOutUserId"}
        columns={columns}
        data={filteredUserData}
        isLoading={isLoading}
        pagination={{
          total: filteredUserData?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
        rowSelection={{
          type: "radio",
          onChange: onSelect
        }}
      />
    </>
  );
};

export default UserLineOutTable;
