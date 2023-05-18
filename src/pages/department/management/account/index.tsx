import GRTable from "@component/base/GRTable"
import GRButton from "@component/base/button/GRButton"
import GRText from "@component/base/text/GRText"
import GRTextInput from "@component/base/text/GRTextInput"
import GRFlexView from "@component/base/view/GRFlexView"
import { Button, Pagination, Space, Table, Tag } from "antd"
import { NextPage } from "next"
import ManagementSearch from "./ManagementSearch"
import { ColumnsType } from "antd/es/table"
import { DUMP_DATA } from "./dumpData"
import { useCallback, useState } from "react"
import { useQuery } from "queries/useQuery"
import querykeys from "queries/querykeys"
import { Color } from "styles/colors"
import GRHeaderView from "@component/templates/view/GRHeaderView"
import AccountModal from "./AccountModal"

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const ManagementAccountPage : NextPage = () => {
const [openAccountModal, setOpenAccountModal] = useState(false);
  const columns: ColumnsType<DataType> = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '학년',
      dataIndex: 'age',
      key: 'age',
      align:'center',
    },
    {
      title: '성별',
      dataIndex: 'gender',
      key: 'gender',
      align:'center',
    },
    {
      title: '상태',
      key: 'status',
      dataIndex: 'tags',
      align:'center',
      render: (_, { status }) => {
            let color = status.length > 2 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={status}>
                {status}
              </Tag>
            );
        }
    },
    {
      title: '권한',
      dataIndex: 'role',
      key: 'role',
      align:'center',
    },
    {
      title: '현재 리더',
      dataIndex: 'leader',
      key: 'leader',
      align:'center',
    },
    {
      title: '전화 번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align:'center',
    },
  ];

  const onClick = useCallback(()=>{

  },[])

   const onAccountModal = useCallback(()=>{
    setOpenAccountModal(!openAccountModal);
  },[openAccountModal])

  return(
    <div>
      <GRHeaderView
        title={"계정 관리"}
        headerComponent={
          <GRButton onClick={onAccountModal}>
            계정 생성
          </GRButton>
        }
        subComponent={<ManagementSearch/>}
      />
      <GRTable
        columns={columns} 
        dataSource={DUMP_DATA}
        paginationProps={{
          total:100,
          defaultPageSize:10
        }}
      />
      <AccountModal
        open={openAccountModal}
        onClick={onAccountModal}
      />
    </div>
  )
}


export default ManagementAccountPage