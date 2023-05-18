import GRHeaderView from '@component/templates/view/GRHeaderView';
import { NextPage } from 'next';
import React from 'react'
import FilterSearch from './FilterSearch';
import GRTable from '@component/base/GRTable';
import { DUMP_DATA } from 'pages/department/management/account/dumpData';
import GRFlexView from '@component/base/view/GRFlexView';
import GRButton from '@component/base/button/GRButton';


const DATA = [{
    cordi:"123",
    leader:"123",
    name:"123",
    grade:"123",
    gender:"123",
}]
const AttendanceManagementPage: NextPage = () => {

    const columns: ColumnsType<DataType> = [
        {
          title: '코디',
          dataIndex: 'cordi',
          key: 'cordi',
          align:'center',
          render: (text) => <a>{text}</a>,
        },
        {
          title: '순장',
          dataIndex: 'leader',
          key: 'leader',
          align:'center',
        },
        {
          title: '이름',
          dataIndex: 'name',
          key: 'name',
          align:'center',
        },
        {
          title: '학년',
          dataIndex: 'grade',
          key: 'grade',
          align:'center',
        },
        {
          title: '성별',
          dataIndex: 'gender',
          key: 'gender',
          align:'center',
          fixed: 'left',
        }
    ];
  return (
    <>
        <GRHeaderView
            title={"출석 관리"}
            subComponent={<FilterSearch/>}
        />
        <GRFlexView>
            <GRButton>
                액셀 다운
            </GRButton>
        </GRFlexView>
        <GRTable
            columns={columns} 
            dataSource={DATA}
            paginationProps={{
                total:100,
                defaultPageSize:10
            }}
        />
    </>
  )
}

export default AttendanceManagementPage;