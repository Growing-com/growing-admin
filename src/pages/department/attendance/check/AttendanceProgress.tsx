import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import { Progress, Tooltip } from "antd";
import { tAttendanceCheckItem } from "api/attendance/types";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { calculatePercentage } from "utils/indext";

const AttendanceProgress = ({
  attendanceData
}: {
  attendanceData?: tAttendanceCheckItem[];
}) => {
  const leaders: string[] = [];
  const item: { [key: string]: tAttendanceCheckItem[] } = {};

  if (!!attendanceData?.length) {
    attendanceData.forEach(attendance => {
      if (!leaders.includes(attendance.leaderName)) {
        leaders.push(attendance.leaderName);
      }

      if (attendance.status === null) {
        if (Object.keys(item).includes(attendance.leaderName)) {
          item[attendance.leaderName].push(attendance);
        } else {
          item[attendance.leaderName] = [attendance];
        }
      }
    });
  }
  const successPercent = calculatePercentage(
    Object.keys(item).length,
    leaders.length,
    true
  );

  return (
    <GRFlexView
      flexDirection={"row"}
      alignItems={"end"}
      marginbottom={GRStylesConfig.BASE_MARGIN}
    >
      <GRText weight={"bold"}>완료률</GRText>
      <GRView width={12} marginhorizontal={GRStylesConfig.BASE_MARGIN}>
        <Tooltip
          overlayStyle={{ whiteSpace: "pre-line" }}
          title={
            successPercent !== 100
              ? `미완료: ${Object.keys(item).join(",")}`
              : "완료"
          }
        >
          <Progress
            percent={successPercent}
            showInfo={false}
            css={css`
              :where(.css-dev-only-do-not-override-oss12y).ant-progress-line {
                margin-bottom: 0;
              }
              :where(
                  .css-dev-only-do-not-override-oss12y
                ).ant-progress.ant-progress-status-success
                .ant-progress-bg {
                background-color: ${Color.green200};
              }
            `}
          />
        </Tooltip>
      </GRView>
      <GRText weight={"bold"} marginright={GRStylesConfig.BASE_MARGIN}>
        {leaders.length - Object.keys(item).length} / {leaders.length}
      </GRText>
      <GRText>( 완료 순장 / 전체 순장 )</GRText>
    </GRFlexView>
  );
};

export default AttendanceProgress;
