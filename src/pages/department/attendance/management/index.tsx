import HeaderView from '@component/templates/view/HeaderView';
import { NextPage } from 'next';
import React from 'react'
import FilterSearch from './FilterSearch';
import GRTable from '@component/base/GRTable';
import GRFlexView from '@component/base/view/GRFlexView';
import GRButton from '@component/base/button/GRButton';
import ExcelButton from '@component/templates/button/ExcelButton';
import { ColumnType } from 'antd/es/table';

const DATA = [{
    cordi:"123",
    leader:"123",
    name:"123",
    grade:"123",
    gender:"123",
}]

type tAttendanceTable = {
  cordi: string;
  leader: string;
  name: string;
  grade: string;
  gender: string;
}

const AttendanceManagementPage: NextPage = () => {

    const columns: ColumnType<tAttendanceTable>[] = [
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
        <HeaderView
            title={"출석 관리"}
            subComponent={<FilterSearch/>}
            headerComponent={<ExcelButton/>}
        />
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