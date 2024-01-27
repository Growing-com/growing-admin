import GRTable from "@component/atom/GRTable";
import GRView from "@component/atom/view/GRView";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { ColumnType } from "antd/es/table";
import { useMemo } from "react";
import { Color } from "styles/colors";
import Boarder from "./Boarder";

const TrainingMemberTableBoarder = ({ memberData, onClickLinkText }) => {
  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "userName",
        key: "userName",
        align: "center",
        fixed: "left",
        width: "5rem",
        render: (_, recode) => (
          <ColumLinkText
            text={recode.userName}
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
        <GRView height={30} backgroundColor={Color.white}>
          <GRTable
            data={memberData}
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
