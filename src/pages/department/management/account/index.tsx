import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import { Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useUserListQuery } from "api/user/queries/useUserListQuery";
import { tAccount } from "api/user/types";
import { DUTY_NAME, ROLE_NAME, SEX_NAME } from "config/const";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import AccountModal from "./AccountModal";
import ManagementSearch from "./ManagementSearch";

const ManagementAccountPage: NextPage = () => {
  const [openAccountModal, setOpenAccountModal] = useState(false);

  const { data: accountlist, refetch } = useUserListQuery();
  const [searchData, setSearchData] = useState([]);
  const columns: ColumnType<tAccount>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: text => <a>{text}</a>
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center"
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
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
      title: "전화 번호",
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

  const onAccountModal = useCallback(() => {
    refetch();
    setOpenAccountModal(!openAccountModal);
  }, [openAccountModal, refetch]);

  const onClickSearch = useCallback(
    (_searchText: string) => {
      if (accountlist?.length) {
        const _filterAccount = accountlist.filter(account => {
          if (
            account.name.indexOf(_searchText) !== -1 ||
            account.phoneNumber.indexOf(_searchText) !== -1
          )
            return account;
        });
        setSearchData(_filterAccount);
      }
    },
    [accountlist]
  );

  useEffect(() => {
    if (accountlist) {
      setSearchData(accountlist);
    }
  }, [accountlist]);

  return (
    <div>
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
            pageSize: 5,
            position: ["bottomCenter"]
          }}
        />
      </GRContainerView>
      <AccountModal open={openAccountModal} onClick={onAccountModal} />
    </div>
  );
};

export default ManagementAccountPage;
