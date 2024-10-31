import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { TableColumnsType } from "antd";
import { useGraduateUserListQuery } from "api/management/user/queries/useGraduateUserListQuery";
import { tGraduatedUser } from "api/management/user/type";
import { SEX_NAME } from "config/const";
import React, { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tUserGraduateTable = {
  searchName: string;
};

const UserGraduateTable: React.FC<tUserGraduateTable> = ({ searchName }) => {
  const [filteredUserData, setFilteredUserData] = useState<tGraduatedUser[]>(
    []
  );

  const { data: graduateUserData, isLoading } = useGraduateUserListQuery();

  useEffect(() => {
    if (!graduateUserData || graduateUserData.length === 0) {
      setFilteredUserData([]);
      return;
    }
    let _filterUser = graduateUserData;
    if (searchName) {
      _filterUser = graduateUserData.filter(user => {
        return user.name?.indexOf(searchName) !== -1;
      });
    }
    setFilteredUserData(_filterUser);
  }, [graduateUserData, searchName]);

  const columns: TableColumnsType<any> = [
    {
      title: "졸업날짜",
      key: "graduateDate",
      dataIndex: "graduateDate",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.graduateDate),
      sorter: {
        compare: (valueA, valueB) =>
          dateSorter(valueA.graduateDate, valueB.graduateDate),
        multiple: 5
      }
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      sorter: {
        compare: (a, b) => koreanSorter(a.name, b.name),
        multiple: 4
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
        multiple: 3
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "4rem",
      sorter: { compare: (a, b) => a.grade - b.grade, multiple: 2 }
    },
    {
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.birth),
      sorter: {
        compare: (valueA, valueB) => dateSorter(valueA.birth, valueB.birth),
        multiple: 1
      }
    }
  ];

  return (
    <>
      {/* <button onClick={() => console.log(graduateUserData)}>graduateUserData</button> */}
      <GRTable
        rowKey={"graduatedUserId"}
        columns={columns}
        data={filteredUserData}
        isLoading={isLoading}
        pagination={{
          total: filteredUserData?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
      />
    </>
  );
};

export default UserGraduateTable;
