import { QuestionCircleOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { Progress, Tooltip } from "antd";
import { tUserType } from "api/account/types";
import { useAttendanceRangeData } from "api/attendance/queries/useAttendanceRangeData";
import { useAttendanceRegisterRate } from "api/attendance/queries/useAttendanceRegisterRate";
import { Dayjs } from "dayjs";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { calculatePercentage } from "utils";
import { DEFAULT_DATE_FORMAT } from "utils/DateUtils";
import NonAttendanceModal from "./NonAttendanceModal";

type tAttendanceProgressBar = {
  userType: tUserType;
  filterDate: Dayjs;
};

const AttendanceProgressBar: React.FC<tAttendanceProgressBar> = ({
  userType,
  filterDate
}) => {
  const [isOpenNonAttendanceModal, setIsOpenNonAttendanceModal] =
    useState(false);

  const { data: registerRate } = useAttendanceRegisterRate(
    filterDate?.format(DEFAULT_DATE_FORMAT)
  );

  const onClickNonAttendance = () => {
    setIsOpenNonAttendanceModal(true);
  };

  //   const { checkStumpData } = useAttendanceCheckData(
  //     filterDate.format(DEFAULT_DATE_FORMAT)
  //   );

  const { data: userAttendanceRangeData } = useAttendanceRangeData({
    startDate: filterDate.format(DEFAULT_DATE_FORMAT),
    endDate: filterDate.format(DEFAULT_DATE_FORMAT)
  });

  const nonAttendanceUserData = userAttendanceRangeData?.filter(
      user => user.attendanceItems[0].status === "NONE" 
      //   stump => stump.attendanceItems.status === "NONE"
      ) ?? []

  //   const nonAttendanceNormalUser =

  // const totalNonAttendance = nonAttendanceStump?.concat()
  // 진행율 로직
  const totalRegistered = Number(registerRate?.totalRegistered) || 0;
  const totalNewFamiliesRegistered =
    Number(registerRate?.totalNewFamiliesRegistered) || 0;
  const totalActive = Number(registerRate?.totalActive) || 0;
  const totalNewFamilies = Number(registerRate?.totalNewFamilies) || 0;

  const attendancePercentage =
    userType === "NORMAL"
      ? calculatePercentage(
          totalRegistered - totalNewFamiliesRegistered,
          totalActive - totalNewFamilies
        )
      : calculatePercentage(totalNewFamiliesRegistered, totalNewFamilies);

  const flooredPercentage = Math.floor(attendancePercentage);

  return (
    <>
      <GRFlexView
        flexDirection={"row"}
        alignItems={"center"}
        xGap={GRStylesConfig.BASE_MARGIN}
      >
        <GRText weight={"bold"}>완료율</GRText>
        <GRView width={12}>
          <Progress
            status="active"
            percent={flooredPercentage}
            strokeColor={Color.green200}
          />
        </GRView>
        <Tooltip
          overlayStyle={{ whiteSpace: "pre-line" }}
          title={"미체크 명단"}
        >
          <QuestionCircleOutlined
            onClick={onClickNonAttendance}
            style={{
              color: Color.red100
            }}
          />
        </Tooltip>
      </GRFlexView>
      {/* 미출석 명단 모달 */}
      {isOpenNonAttendanceModal && (
        <NonAttendanceModal
          open={isOpenNonAttendanceModal}
          onClickClose={() => setIsOpenNonAttendanceModal(false)}
          nonAttendanceUserData={nonAttendanceUserData}
        />
      )}
    </>
  );
};

export default AttendanceProgressBar;
