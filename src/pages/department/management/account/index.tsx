import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import ColumSexRender from "@component/templates/table/ColumSexRender";
import { Tag } from "antd";
import type { ColumnType } from "antd/es/table";
import { useUserListQuery } from "api/account/queries/useUserListQuery";
import type { tAccount } from "api/account/types";
import { DUTY_NAME, ROLE_NAME } from "config/const";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import AccountModal from "./AccountModal";
import ManagementSearch from "./ManagementSearch";

const ManagementAccountPage: NextPage = () => {
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<tAccount>();
  const [searchData, setSearchData] = useState<tAccount[]>();

  const { data: accountlist, refetch } = useUserListQuery();

  const columns: ColumnType<tAccount>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      sorter: (a, b) => a.grade - b.grade
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      render: (_, record) => <ColumSexRender sexData={record.sex} />
    },
    {
      title: "직분",
      key: "duty",
      dataIndex: "tags",
      align: "center",
      render: (_, item) => {
        if (!item?.duty) return;
        const _duty = DUTY_NAME.find(duty => duty.value === item.duty);
        return (
          <Tag color={_duty?.color} key={`duty_key_${_duty?.value}`}>
            {_duty?.name ?? ""}
          </Tag>
        );
      }
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "15rem"
    },
    {
      title: "역할",
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (_, item) => {
        const _role = ROLE_NAME.find(role => role.value === item.role);
        return (
          <Tag color={"default"} key={_role?.value}>
            {_role?.label ?? ""}
          </Tag>
        );
      }
    }
  ];

  const onClickSearch = useCallback(
    (_searchText?: string) => {
      let _filterAccount = accountlist;
      if (accountlist?.length && _searchText) {
        _filterAccount = accountlist.filter(account => {
          if (
            account.name.indexOf(_searchText) !== -1 ||
            account.phoneNumber.indexOf(_searchText) !== -1
          ) {
            return account;
          }
          return null;
        });
      }
      setSearchData(_filterAccount);
    },
    [accountlist]
  );

  const onAccountModal = useCallback(() => {
    setOpenAccountModal(!openAccountModal);
    setSelectedUser(undefined);
  }, [openAccountModal]);

  const onRegister = useCallback(() => {
    setOpenAccountModal(!openAccountModal);
    setSelectedUser(undefined);
    refetch();
  }, [openAccountModal, refetch]);

  const onClickRow = useCallback((_user: tAccount) => {
    setSelectedUser(_user);
    setOpenAccountModal(true);
  }, []);

  useEffect(() => {
    if (accountlist) {
      setSearchData(accountlist);
    }
  }, [accountlist]);

  return (
    <>
      <HeaderView
        title={"계정 관리"}
        headerComponent={
          <GRButtonText
            onClick={onAccountModal}
            buttonType={"default"}
            size={"large"}
          >
            계정 생성
          </GRButtonText>
        }
        subComponent={<ManagementSearch onClickSearch={onClickSearch} />}
      />
      <GRContainerView>
        <GRTable
          rowKey={"id"}
          columns={columns}
          data={searchData}
          pagination={{
            total: searchData?.length,
            defaultPageSize: 20,
            position: ["bottomCenter"]
          }}
          onRow={record => ({
            onClick: () => onClickRow(record)
          })}
        />
      </GRContainerView>
      <AccountModal
        open={openAccountModal}
        onClose={onAccountModal}
        onRegister={onRegister}
        user={selectedUser}
      />
    </>
  );
};

export default ManagementAccountPage;
