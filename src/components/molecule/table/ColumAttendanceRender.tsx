import GRView from "@component/atom/view/GRView";
import { Popover, Tag } from "antd";
import { tAttendanceStatus } from 'api/attendance/type';
import { ATTENDANCE_STATUS } from "config/const";
import { FC } from "react";
import GRDot from "../GRDot";

type tColumAttendanceRender = {
  attendanceStatus?: tAttendanceStatus;
  contentEtc?: string;
};
const ColumAttendanceRender: FC<tColumAttendanceRender> = ({
  attendanceStatus,
  contentEtc
}) => {
  if (!attendanceStatus) {
    return (
        <Tag color={"#ccc"}>데이터 없음</Tag>
    );
  }

  const currentStatus = ATTENDANCE_STATUS.find(
    status => status.value === attendanceStatus
  );
  if (!contentEtc) {
    return (
      <GRView isFlex alignItems={"center"} justifyContent={"center"}>
        <Tag color={currentStatus?.color}>{currentStatus?.label ?? " "}</Tag>
      </GRView>
    );
  }

  return (
    <Popover
      content={contentEtc}
      trigger={"hover"}
      overlayStyle={{
        width: "20rem"
      }}
    >
      <GRView isFlex alignItems={"center"} justifyContent={"center"}>
        <GRDot/>
        <Tag color={currentStatus?.color}>{currentStatus?.label ?? " "}</Tag>
      </GRView>
    </Popover>
  );
};

export default ColumAttendanceRender;
