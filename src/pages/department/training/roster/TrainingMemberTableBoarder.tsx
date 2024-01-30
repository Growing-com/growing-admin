import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRView from "@component/atom/view/GRView";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { ColumnType } from "antd/es/table";
import { tTrainingDetail } from "api/training/type";
import { FC, useMemo } from "react";
import { Color } from "styles/colors";
import Boarder from "./Boarder";

type tTrainingMemberTableBoarder = {
  subTrainingMembers: tTrainingDetail;
  onClickLinkText: () => void
}

const TrainingMemberTableBoarder: FC<tTrainingMemberTableBoarder> = ({ 
  subTrainingMembers, 
  onClickLinkText 
}) => {
  
  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "name",
        key: "name",
        align: "center",
        fixed: "left",
        width: "5rem",
        render: (_, recode) => (
          <ColumLinkText
            text={recode.name}
            onClick={() => onClickLinkText(recode)}
          />
        )
      },
      {
        title: "학년",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        fixed: "left",
        width: "5rem"
      },
      {
        title: "성별",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        width: "5rem",
        render: (_, record) => <ColumSexRender sexData={record.sex} />
      },
      {
        title: "전화번호",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        align: "center"
      }
    ],
    [onClickLinkText]
  );


  return (
    <Boarder
      boarderTitle={"참여자"}
      boarderWidth={30}
      borderContentComponent={
          !subTrainingMembers
          ?
            <GRView 
              isFlex 
              backgroundColor={"white"} 
              style={{ height: '30rem'}} 
              justifyContent={"center"} 
              paddingtop={10}
            >
              <GRText weight={"bold"}>
                훈련을 선택해주세요
              </GRText>
            </GRView>
          :
          <GRView height={30} backgroundColor={Color.white}>
            <GRTable
              data={subTrainingMembers?.members ?? []}
              scroll={{ y: "26rem" }}
              columns={columns}
              isHoverTable={false}
            />
          </GRView>
      }
    />
  );
};

export default TrainingMemberTableBoarder;
