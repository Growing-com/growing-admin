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
import { useCallback } from "react"
import { useQuery } from "queries/useQuery"
import querykeys from "queries/querykeys"

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const ManagementAccount : NextPage = () => {

  const columns: ColumnsType<DataType> = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '학년',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '성별',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '상태',
      key: 'status',
      dataIndex: 'tags',
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
    },
    {
      title: '현재 리더',
      dataIndex: 'leader',
      key: 'leader',
    },
    {
      title: '전화 번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];

  const onClick = useCallback(()=>{

  },[])

  return(
    <div>
      <GRFlexView isRow justifyContent={"flex-end"}>
        <GRButton onClick={onClick}>
          계정 생성
        </GRButton>
      </GRFlexView>
      <ManagementSearch/>
      <GRTable
        columns={columns} 
        dataSource={DUMP_DATA}
      />
    </div>
  )
}


export default ManagementAccount