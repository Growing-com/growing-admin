import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import { Popover } from "antd";
import { tAttendanceStatus } from "api/attendance/types";
import { ATTENDANCE_STATUS } from "config/const";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
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
        <MinusCircleOutlined
          rev={undefined}
          style={{ marginRight: `${GRStylesConfig.BASE_MARGIN}rem` }}
        />
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
        <PlusCircleOutlined
          rev={undefined}
          style={{ marginRight: `${GRStylesConfig.BASE_MARGIN}rem` }}
        />
        <GRText>{currentStatus?.label ?? " "}</GRText>
      </GRButtonText>
    );
  }

  return (
    <Popover content={contentEtc} trigger={"click"}>
      <GRButtonText buttonType={"default"}>
        <PlusCircleOutlined
          rev={undefined}
          style={{ marginRight: `${GRStylesConfig.BASE_MARGIN}rem` }}
        />
        <GRText>{currentStatus?.label ?? ""}</GRText>
      </GRButtonText>
    </Popover>
  );
};

export default ColumAttendanceRender;
