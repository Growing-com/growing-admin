import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import { ColumnType } from "antd/es/table";
import { useGetTermNewFamily } from "api/term/queries/useGetTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import { SEX_NAME } from "config/const";
import { NextPage } from "next";
import { Color } from "styles/colors";

const ManagementNewFamilyPage: NextPage = () => {
  const { data: newFamilyData } = useGetTermNewFamily({ termId: 1 });
  console.log("newFamilyData", newFamilyData);

  const columns: ColumnType<tTermNewFamily>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center"
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
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center"
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center"
    },
    {
      title: "등반일",
      dataIndex: "lineupDate",
      key: "lineupDate",
      align: "center"
    },
    {
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center"
    },
    {
      title: "추가 내용",
      dataIndex: "etc",
      key: "etc",
      align: "center"
    },
    {
      title: "라인업",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      render: (_: unknown, record: tTermNewFamily) => {
        return <GRButtonText>라인업</GRButtonText>;
      }
    }
  ];

  return (
    <div>
      <HeaderView title={"새가족 관리"} />
      <GRContainerView>
        <GRTable
          headerComponent={
            <GRView>
              <GRText weight={"bold"}>업체 리스트</GRText>
              <GRText color={Color.grey60}>
                (
                <GRText weight={"bold"} color={Color.green200}>
                  총 {newFamilyData.length}건
                </GRText>
                )
              </GRText>
            </GRView>
          }
          rowKey={"id"}
          columns={columns}
          data={newFamilyData}
          pagination={{
            position: ["bottomCenter"]
          }}
        />
      </GRContainerView>
    </div>
  );
};

export default ManagementNewFamilyPage;
