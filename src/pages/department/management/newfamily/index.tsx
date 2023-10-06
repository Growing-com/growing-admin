import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import ColumPopoverRender from "@component/templates/table/ColumPopoverRender";
import { ColumnType } from "antd/es/table";
import { useTermNewFamily } from "api/term/queries/useTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import { SEX_NAME } from "config/const";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import { Color } from "styles/colors";
import NewFamilyDetailModal from "./NewFamilyDetailModal";

const ManagementNewFamilyPage: NextPage = () => {
  const [selectedNewFamily, setSelectedNewFamily] = useState<tTermNewFamily>();

  const { data: newFamilyData } = useTermNewFamily({ termId: 1 });

  const columns: ColumnType<tTermNewFamily>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem"
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      width: "5rem",
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
      title: "새가족 순장",
      dataIndex: "newTeamLeaderName",
      key: "newTeamLeaderName",
      align: "center"
    },
    {
      title: "추가 내용",
      dataIndex: "etc",
      key: "etc",
      align: "center",
      onCell: () => ({ onClick: e => e.stopPropagation() }),
      render: (_, record) => (
        <ColumPopoverRender content={record?.etc} label={"내용"} />
      )
    }
  ];

  const onClickRow = useCallback((_newFamily?: tTermNewFamily) => {
    setSelectedNewFamily(_newFamily);
  }, []);

  return (
    <>
      <HeaderView title={"새가족 관리"} titleInfo={"현재 텀 새가족 리스트"} />
      <GRContainerView>
        <GRTable
          headerComponent={
            <GRView>
              <GRText weight={"bold"}>새가족 리스트</GRText>
              <GRText color={Color.grey60}>
                (
                <GRText weight={"bold"} color={Color.green200}>
                  총 {newFamilyData?.length ?? 0}건
                </GRText>
                )
              </GRText>
            </GRView>
          }
          onRow={record => ({
            onClick: () => onClickRow(record)
          })}
          rowKey={"id"}
          columns={columns}
          data={newFamilyData}
          pagination={{
            position: ["bottomCenter"]
          }}
        />
      </GRContainerView>
      <NewFamilyDetailModal
        open={!!selectedNewFamily}
        newFamily={selectedNewFamily}
        onClose={onClickRow}
      />
    </>
  );
};

export default ManagementNewFamilyPage;
