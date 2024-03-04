import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import TableInfoHeader from "@component/templates/table/TableInfoHeader";
import { ColumnType } from "antd/es/table";
import { useRouter } from "next/router";

const ManagementLineUpPage = () => {
  const router = useRouter();
  const lineupData = [
    {
      termName: "2023-01",
      progress: "PROGRESS",
      termOfDate: "2023-01-01 ~ 2023-01-31",
      enrollment: 100,
      averageAttendanceRate: "100%"
    }
  ];

  const columns: ColumnType<any>[] = [
    {
      title: "텀이름",
      dataIndex: "termName",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "진행 상황",
      align: "center",
      dataIndex: "progress",
      width: "8rem"
    },
    {
      title: "기간",
      align: "center",
      dataIndex: "termOfDate",
      width: "8rem"
    },
    {
      title: "재적",
      dataIndex: "enrollment",
      align: "center",
      width: "8rem"
    },
    {
      title: "평균 출석율",
      dataIndex: "averageAttendanceRate",
      align: "center",
      width: "8rem"
    }
  ];

  const onClickCreateLineUp = () => {
    router.push("/department/management/lineup/create");
  };

  return (
    <>
      <HeaderView
        title={"라인업 관리"}
        headerComponent={
          <GRButtonText
            onClick={onClickCreateLineUp}
            buttonType={"default"}
            size={"large"}
          >
            라인업 생성
          </GRButtonText>
        }
      />
      <GRContainerView>
        <GRTable
          rowKey={"name"}
          headerComponent={
            <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
              <TableInfoHeader
                count={lineupData.length}
                totalCount={lineupData.length}
                title={"라인업 리스트"}
              />
            </GRFlexView>
          }
          columns={columns}
          data={lineupData}
          scroll={{ x: 1300 }}
        />
      </GRContainerView>
    </>
  );
};

export default ManagementLineUpPage;
