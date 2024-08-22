import GRButtonText from "@component/atom/button/GRTextButton";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { Alert, Progress, Tooltip } from "antd";
import {
  tStatisticsAttendanceExcelOption,
  useStatisticsAttendanceExcelQuery
} from "api/statistics/queries/useStatisticsAttendanceExcelQuery";
import { useStatisticsAttendanceProgressQuery } from "api/statistics/queries/useStatisticsAttendanceProgress";
import dayjs, { Dayjs } from "dayjs";
import {
  tStatisticsName,
  useStatisticsDataToExcel
} from "hooks/useStatisticsDataToExcel";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { calculatePercentage } from "utils";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tStatisticsExcelModal = {
  onClickStatisticsExcel: () => void;
  open: boolean;
};

const StatisticsExcelModal: FC<tStatisticsExcelModal> = ({
  open,
  onClickStatisticsExcel
}) => {
  const [selectWeek, setSelectWeek] = useState<Dayjs>(dayjs());
  const [excelOption, setExcelOption] =
    useState<tStatisticsAttendanceExcelOption>();
  const [handleStatisticsDataToExcel] = useStatisticsDataToExcel();

  const { data: excelData } = useStatisticsAttendanceExcelQuery({
    options: excelOption
  });

  const { data: attendanceProgress } = useStatisticsAttendanceProgressQuery({
    termId: 1,
    week: selectWeek.format(DEFAULT_DATE_FOMAT)
  });
  const onOkClick = useCallback(() => {
    onClickStatisticsExcel?.();
  }, [onClickStatisticsExcel]);

  const onCancelClick = useCallback(() => {
    onClickStatisticsExcel?.();
  }, [onClickStatisticsExcel]);

  const attendParcent = calculatePercentage(
    attendanceProgress?.totalProgressed,
    attendanceProgress?.totalRegistered
  ).toFixed(0);
  const noAttendanceUser = useMemo(() => {
    return attendanceProgress?.notProgressedLeaders
      .map(leader => leader.name)
      .join(", ");
  }, [attendanceProgress?.notProgressedLeaders]);

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      setSelectWeek(dayjs(_date).weekday(0));
    }
  };

  useEffect(() => {
    (async () => {
      if (excelOption && !!excelData?.length) {
        let _fileName = "출석";
        let statisticsName = "attendance" as tStatisticsName;
        switch (excelOption) {
          case "gradeAttendance":
            statisticsName = "grade";
            _fileName = `텀 학년별 `;
            break;
          case "leaderAttendance":
            statisticsName = "leader";
            _fileName = `텀 순모임별`;
            break;
          case "managerAttendance":
            statisticsName = "manager";
            _fileName = `텀 나무별`;
            break;
          case "personalAttendance":
            statisticsName = "attendance";
            _fileName = `텀 출결`;
            break;
          case "newFamilyAttendance":
            statisticsName = "newFamily";
            _fileName = `텀 새가족`;
            break;
        }
        await handleStatisticsDataToExcel(_fileName, statisticsName, excelData);
        setExcelOption(undefined);
      }
    })();
  }, [excelData, excelOption, handleStatisticsDataToExcel, selectWeek]);

  return (
    <GRModal
      onOk={onOkClick}
      onCancel={onCancelClick}
      open={open}
      showFooter={false}
      title={
        <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
          <GRText weight={"bold"}>엑셀 다운로드</GRText>
        </GRFlexView>
      }
    >
      <GRFlexView paddinghorizontal={GRStylesConfig.HORIZONTAL_PADDING}>
        <GRFlexView marginbottom={GRStylesConfig.BASE_MARGIN}>
          <Tooltip
            overlayStyle={{ whiteSpace: "pre-line" }}
            title={
              noAttendanceUser?.length
                ? `미완료 나무:\n ${noAttendanceUser}`
                : "한번도 체크 안한 리더는 없습니다"
            }
            placement={"bottom"}
          >
            <GRFlexView
              flexDirection={"row"}
              marginright={GRStylesConfig.BASE_MARGIN}
            >
              <Alert
                showIcon
                message={
                  <GRText weight={"bold"} fontSize={"b7"}>
                    이번 주 출석체크 완료율
                  </GRText>
                }
                type={"info"}
                banner={true}
                style={{ backgroundColor: "transparent" }}
              />
            </GRFlexView>
            <GRFlexView marginleft={GRStylesConfig.BASE_MARGIN}>
              <Progress
                percent={Number(attendParcent)}
                size={"small"}
                status={"active"}
              />
            </GRFlexView>
          </Tooltip>
        </GRFlexView>
        <GRFlexView>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("personalAttendance")}
            block
          >
            전체 출결
          </GRButtonText>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("newFamilyAttendance")}
            block
          >
            새가족 출결
          </GRButtonText>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("leaderAttendance")}
            buttonType={"default"}
            block
          >
            순모임별 통계
          </GRButtonText>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("managerAttendance")}
            buttonType={"default"}
            block
          >
            나무별 통계
          </GRButtonText>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("gradeAttendance")}
            buttonType={"default"}
            block
          >
            학년별 통계
          </GRButtonText>
        </GRFlexView>
      </GRFlexView>
    </GRModal>
  );
};

export default StatisticsExcelModal;
