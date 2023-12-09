import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import { Popover } from "antd";
import { tAttendanceStatus } from "api/attendance/types";
import { ATTENDANCE_STATUS } from "config/const";
import { FC } from "react";
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
      <GRButtonText buttonType={"default"} style={{ cursor: "default" }}>
        <GRText>미완료</GRText>
      </GRButtonText>
    );
  }

  const currentStatus = ATTENDANCE_STATUS.find(
    status => status.value === attendanceStatus
  );
  if (!contentEtc) {
    return (
      <GRButtonText buttonType={"default"} disabled={true}>
        <GRText>{currentStatus?.label ?? " "}</GRText>
      </GRButtonText>
    );
  }

  return (
    <Popover
      content={contentEtc}
      trigger={"click"}
      overlayStyle={{
        width: "20rem"
      }}
    >
      <GRButtonText buttonType={"default"}>
        <GRText>{currentStatus?.label ?? ""}</GRText>
      </GRButtonText>
    </Popover>
  );
};

export default ColumAttendanceRender;
