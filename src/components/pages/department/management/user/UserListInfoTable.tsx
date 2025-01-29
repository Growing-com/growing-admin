import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { TableColumnsType } from "antd";
import { tUser } from "api/account/types";
import { useUserListQuery } from "api/management/user/queries/useUserListQuery";
import { DUTY, SEX_NAME } from "config/const";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tUserInfoTable = {
  searchName: string;
  onSelect: (key: React.Key[], selectedRows: any[]) => void;
  selectedUser: tUser[];
};

const UserListInfoTable: React.FC<tUserInfoTable> = ({
  searchName,
  onSelect,
  selectedUser
}) => {
  const router = useRouter();

  const [filteredUserData, setFilteredUserData] = useState<tUser[]>([]);

  const { userList: userData, isLoading } = useUserListQuery();

  const onClickUpdateUser = (_userId: number) => {
    router.push(`/department/management/user?userId=${_userId}`);
  };

  useEffect(() => {
    if (!userData || userData.length === 0) {
      setFilteredUserData([]);
      return;
    }
    let _filterUser = userData;
    if (searchName) {
      _filterUser = userData.filter(user => {
        return user.name?.indexOf(searchName) !== -1;
      });
    }
    setFilteredUserData(_filterUser);
  }, [userData, searchName]);

  const columns: TableColumnsType<any> = [
    {
      title: "직분",
      dataIndex: "duty",
      key: "duty",
      align: "center",
      width: "5rem",
      minWidth: 90,
      onFilter: (value, record) => record.duty === value,
      render: (_, item) => {
        if (!item?.duty) return;
        return <GRText>{DUTY[item?.duty]}</GRText>;
      },
      sorter: {
        compare: (a, b) => koreanSorter(DUTY[a.duty], DUTY[b.duty]),
        multiple: 5
      }
    },
    {
      title: "리더",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "6rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => koreanSorter(a.leaderName, b.leaderName),
        multiple: 6
      },
      onFilter: (value, record) => record.leaderName === value
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => koreanSorter(a.name, b.name),
        multiple: 4
      },
      render: (_, item) => {
        return <GRText weight={"bold"}>{item.name}</GRText>;
      }
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "4rem",
      minWidth: 60,
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
      minWidth: 60,
      sorter: { compare: (a, b) => a.grade - b.grade, multiple: 2 }
    },
    {
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      minWidth: 85,
      render: (_, record) => checkDefaultDate(record.birth),
      sorter: {
        compare: (valueA, valueB) => dateSorter(valueA.birth, valueB.birth),
        multiple: 1
      }
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

  return (
    <>
      <GRTable
        rowKey={"userId"}
        columns={columns}
        data={filteredUserData}
        isLoading={isLoading}
        pagination={{
          total: filteredUserData?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
        rowSelection={{
          selectedRowKeys: selectedUser.map(user => user.userId),
          onChange: onSelect
        }}
        onRow={record => {
          return { onClick: () => onClickUpdateUser(record.userId) };
        }}
      />
    </>
  );
};

export default UserListInfoTable;
