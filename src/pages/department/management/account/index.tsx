import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import { Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useAccountsQuery } from "api/account/queries/useAccountsQuery";
import { tAccount } from "api/account/types";
import { ROLE_NAME, STATUS_NAME } from "config/const";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import AccountModal from "./AccountModal";
import ManagementSearch from "./ManagementSearch";

const ManagementAccountPage: NextPage = () => {
  const [openAccountModal, setOpenAccountModal] = useState(false);

  const { data: accountlist } = useAccountsQuery();

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
      dataIndex: "age",
      key: "age",
      align: "center"
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center"
    },
    {
      title: "직분",
      key: "status",
      dataIndex: "tags",
      align: "center",
      render: (_, item) => {
        if (!item?.status) return;
        return (
          <Tag color={STATUS_NAME[item?.status].color} key={item?.status}>
            {STATUS_NAME[item?.status].name}
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
        return (
          <Tag color={"default"} key={item?.role}>
            {ROLE_NAME[item?.role] ?? ""}
          </Tag>
        );
      }
    }
  ];

  const onAccountModal = useCallback(() => {
    setOpenAccountModal(!openAccountModal);
  }, [openAccountModal]);

  const onClickSearch = useCallback((_searchText: string) => {
    console.log("text", _searchText);
  }, []);

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
          data={accountlist}
          paginationProps={{
            total: accountlist?.length,
            pageSize: 3
          }}
        />
      </GRContainerView>
      <AccountModal open={openAccountModal} onClick={onAccountModal} />
    </div>
  );
};

export default ManagementAccountPage;
