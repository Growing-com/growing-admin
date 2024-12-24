import GRTable from "@component/atom/GRTable";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import { TableColumnsType } from "antd";
import { tAttendanceData } from "api/attendance/type";
import { SEX_NAME } from "config/const";
import { FC } from "react";

type tNonAttendanceModal = {
  open: boolean;
  onClickClose: () => void;
  nonAttendanceUserData: tAttendanceData[];
};

const NonAttendanceModal: FC<tNonAttendanceModal> = ({
  open,
  onClickClose,
  nonAttendanceUserData
}) => {
  const columns: TableColumnsType<any> = [
    {
      title: "코디",
      dataIndex: "codyName",
      key: "codyName",
      align: "center",
      width: "5rem",
      minWidth: 75
    },
    {
      title: "순장",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "5rem",
      minWidth: 75
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      minWidth: 75,
      render: (_, item) => <GRText weight={"bold"}>{item.name}</GRText>
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "5rem",
      minWidth: 60,
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem",
      minWidth: 60
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  return (
    <GRModal
      open={open}
      isOneButton={true}
      onCancel={onCloseModal}
      title={`출석 미체크 명단 ( ${nonAttendanceUserData?.length} 명  )`}
      width={"50%"}
    >
      <GRTable
        rowKey={"userId"}
        columns={columns}
        data={nonAttendanceUserData}
        pagination={{
          total: nonAttendanceUserData?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
        scroll={{ x: true }}
        tableLayout={"auto"}
      />
    </GRModal>
  );
};

export default NonAttendanceModal;
