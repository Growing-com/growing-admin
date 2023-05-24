import GRButton from "@component/base/button/GRButton";
import GRText from "@component/base/text/GRText";
import GRContainerView from "@component/base/view/GRContainerView";
import GRFlexView from "@component/base/view/GRFlexView";
import HeaderView from "@component/templates/view/HeaderView";
import { BarChartOutlined } from "@ant-design/icons";
import GRView from "@component/base/view/GRView";
import { Descriptions, Divider } from "antd";
import { css } from "@emotion/react";
import { Color } from "styles/colors";
import GRTable from "@component/base/GRTable";
import StatisticsCompareCards from "./StatisticsCompareCards";

const  AttendanceStatistics = () => {

  const absentColumns = [
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
    {
      title: '2023-05-23',
      dataIndex: 'gender',
      key: 'gender',
      align:'center',
      fixed: 'left',
      width: '5rem',
    },
    {
      title: '2023-05-30',
      dataIndex: 'gender',
      key: 'gender',
      align:'center',
      fixed: 'left',
      width: '5rem',
    },

  ]
  return (
    <>
      <HeaderView 
        title={"출석 통계"}
        headerComponent={
          <GRButton> 
            <BarChartOutlined rev={undefined} style={{ fontSize:'1.3rem' }}/>
          </GRButton>
        }
      />
      <GRContainerView>
        <StatisticsCompareCards/>
        
        <GRTable
          marginBottom={2}
          headerComponent={<GRText weight={"bold"} fontSize={"b4"}>🐏 결석 인원</GRText>}
          columns={absentColumns}
        />
        <GRTable
          headerComponent={<GRText weight={"bold"} fontSize={"b4"}>🌱 새가족 인원</GRText>}
          columns={absentColumns}
        />
      </GRContainerView>
    </>
  )
}

export default AttendanceStatistics;
