import GRButtonText from "@component/atom/button/GRTextButton";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { Progress } from "antd";
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
import { FC, useCallback, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import { calculatePercentage } from "utils/indext";

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
          <GRFlexView
            flexDirection={"row"}
            marginright={GRStylesConfig.BASE_MARGIN}
          >
            <GRText>이번 주 출석체크 완료율</GRText>
          </GRFlexView>
          <GRFlexView marginleft={GRStylesConfig.BASE_MARGIN}>
            <Progress
              percent={Number(attendParcent)}
              size={"small"}
              status={"active"}
            />
          </GRFlexView>
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
