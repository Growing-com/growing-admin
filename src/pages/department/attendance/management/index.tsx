import HeaderView from '@component/modules/view/HeaderView';
import { NextPage } from 'next';
import React, { useMemo } from 'react'
import FilterSearch from './FilterSearch';
import GRTable from '@component/base/GRTable';
import GRFlexView from '@component/base/view/GRFlexView';
import GRButton from '@component/base/button/GRButton';
import ExcelButton from '@component/modules/button/ExcelButton';
import { ColumnType } from 'antd/es/table';
import { getSundayOfMonth } from 'utils/DateUtils';
import dayjs from 'dayjs';
import GRContainerView from '@component/base/view/GRContainerView';

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
    const renderAddDay = () => {
      const sundays = getSundayOfMonth();
      return sundays.map( (day: dayjs.Dayjs) => {
        const dayKey = day.format("MM/DD")
        return {
          title: dayKey,
          dataIndex: dayKey,
          key: dayKey,
          align:'center',
        }
      });
    }
    const columns: ColumnType<tAttendanceTable>[] = useMemo(() =>
    [
        {
          title: '코디',
          dataIndex: 'cordi',
          key: 'cordi',
          align:'center',
          width: '5rem',
          fixed: 'left',
          render: (text) => <a>{text}</a>,
        },
        {
          title: '순장',
          dataIndex: 'leader',
          key: 'leader',
          align:'center',
          fixed: 'left',
          width: '5rem',
        },
        {
          title: '이름',
          dataIndex: 'name',
          key: 'name',
          align:'center',
          fixed: 'left',
          width: '5rem',
        },
        {
          title: '학년',
          dataIndex: 'grade',
          key: 'grade',
          align:'center',
          fixed: 'left',
          width: '5rem',
        },
        {
          title: '성별',
          dataIndex: 'gender',
          key: 'gender',
          align:'center',
          fixed: 'left',
          width: '5rem',
        },
        ...renderAddDay()
    ],[]);
    
  return (
    <>
        <HeaderView
            title={"출석 관리"}
            subComponent={<FilterSearch/>}
            headerComponent={<ExcelButton/>}
        />
        <GRContainerView>
          <GRTable
            columns={columns} 
            dataSource={DATA}
            paginationProps={{
              total:100,
              defaultPageSize:10
            }}
            scroll={{ x: 1300 }}
            />
        </GRContainerView>
    </>
  )
}

export default AttendanceManagementPage;