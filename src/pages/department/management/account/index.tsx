import GRTable from "@component/base/GRTable";
import GRButtonText from "@component/base/button/GRTextButton";
import GRContainerView from "@component/base/view/GRContainerView";
import HeaderView from "@component/modules/view/HeaderView";
import { Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useAccountsQuery } from "api/account/queries/accounts";
import { tAccount } from "api/account/types";
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
        const color = item?.status.length > 2 ? "geekblue" : "green";
        return (
          <Tag color={color} key={item?.status}>
            {item?.status}
          </Tag>
        );
      }
    },
    {
      title: "역할",
      dataIndex: "role",
      key: "role",
      align: "center"
    },
    {
      title: "전화 번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center"
    }
  ];

  const onAccountModal = useCallback(() => {
    setOpenAccountModal(!openAccountModal);
  }, [openAccountModal]);

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
        subComponent={<ManagementSearch />}
      />
      <GRContainerView>
        <GRTable
          rowKey={"id"}
          columns={columns}
          data={accountlist}
          paginationProps={{
            total: 100,
            defaultPageSize: 10
          }}
        />
      </GRContainerView>
      <AccountModal open={openAccountModal} onClick={onAccountModal} />
    </div>
  );
};

export default ManagementAccountPage;
