import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import { TableColumnsType } from "antd";
import { useDispatchedUserListQuery } from "api/account/queries/useDispatchedUserListQuery";
import { tDispatchedUser } from "api/management/user/type";
import { DISPATCH_TYPE, SEX_NAME } from "config/const";
import React, { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tUserDispatchTable = {
  searchName: string;
  onSelect: (key: React.Key[], selectedRows: any[]) => void;
};

const UserDispatchTable: React.FC<tUserDispatchTable> = ({
  searchName,
  onSelect
}) => {
  const [filteredUserData, setFilteredUserData] = useState<tDispatchedUser[]>(
    []
  );

  const { data: dispatchedUserData, isLoading } = useDispatchedUserListQuery();

  useEffect(() => {
    if (!dispatchedUserData || dispatchedUserData.length === 0) {
      setFilteredUserData([]);
      return;
    }
    let _filterUser = dispatchedUserData;
    if (searchName) {
      _filterUser = dispatchedUserData.filter(user => {
        return user.name?.indexOf(searchName) !== -1;
      });
    }
    setFilteredUserData(_filterUser);
  }, [dispatchedUserData, searchName]);

  const columns: TableColumnsType<any> = [
    {
      title: "리더",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "6rem",
      sorter: {
        compare: (a, b) => koreanSorter(a.leaderName, b.leaderName),
        multiple: 4
      },
      render: (_, item) => {
        return <GRText weight={"bold"}>{item.leaderName}</GRText>;
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
        multiple: 3
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
      sorter: { compare: (a, b) => a.grade - b.grade, multiple: 1 }
    },
    {
      title: "종류",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: "6rem",
      render: (_, record) => <GRText>{DISPATCH_TYPE[record.type]}</GRText>,
      sorter: {
        compare: (a, b) =>
          koreanSorter(DISPATCH_TYPE[a.type], DISPATCH_TYPE[b.type]),
        multiple: 7
      }
    },
    {
      title: "파송날짜",
      dataIndex: "sendDate",
      key: "sendDate",
      align: "center",
      width: "10rem",
      render: (_, record) => checkDefaultDate(record.sendDate),
      sorter: {
        compare: (valueA, valueB) =>
          dateSorter(valueA.sendDate, valueB.sendDate),
        multiple: 5
      }
    },
    {
      title: "복귀날짜",
      dataIndex: "returnDate",
      key: "returnDate",
      align: "center",
      width: "10rem",
      render: (_, record) => checkDefaultDate(record.returnDate),
      sorter: {
        compare: (valueA, valueB) =>
          dateSorter(valueA.returnDate, valueB.returnDate),
        multiple: 6
      }
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
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
    }
  ];

  return (
    <>
      {/* <button onClick={() => console.log(dispatchedUserData)}>
        dispatchedUserData
      </button> */}
      <GRTable
        rowKey={"dispatchedUserId"}
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

export default UserDispatchTable;
