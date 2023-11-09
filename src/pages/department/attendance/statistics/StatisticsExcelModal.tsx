import GRButtonText from "@component/atom/button/GRTextButton";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
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
import { DEFAULT_DATE_FOMAT, DEFAULT_EXCEL_DATE_FOMAT } from "utils/DateUtils";
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
        let _fileName = "출석 정보";
        let statisticsName = "attendance" as tStatisticsName;
        switch (excelOption) {
          case "gradeAttendance":
            statisticsName = "grade";
            _fileName = `텀 학년별 정보 `;
            break;
          case "leaderAttendance":
            statisticsName = "leader";
            _fileName = `텀 순모임별 정보 ${selectWeek.format(
              DEFAULT_EXCEL_DATE_FOMAT
            )}`;
            break;
          case "managerAttendance":
            statisticsName = "manager";
            _fileName = `텀 나무별 정보 ${selectWeek.format(
              DEFAULT_EXCEL_DATE_FOMAT
            )}`;
            break;
          case "personalAttendance":
            statisticsName = "attendance";
            _fileName = `텀 출결 정보 ${selectWeek.format(
              DEFAULT_EXCEL_DATE_FOMAT
            )}`;
            break;
        }
        await handleStatisticsDataToExcel(
          _fileName,
          statisticsName,
          excelData,
          true
        );
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
    >
      <GRFlexView paddinghorizontal={GRStylesConfig.HORIZONTAL_PADDING}>
        <GRFlexView
          flexDirection={"row"}
          marginbottom={GRStylesConfig.BASE_MARGIN}
        >
          <GRFlexView marginright={GRStylesConfig.BASE_MARGIN}>
            <GRText>출석체크 완료율</GRText>
            <Progress
              percent={Number(attendParcent)}
              size={"small"}
              status={"active"}
            />
          </GRFlexView>
          <GRFlexView marginleft={GRStylesConfig.BASE_MARGIN}>
            <GRText>출력 날짜</GRText>
            <GRDatePicker
              pickerType={"basic"}
              picker={"week"}
              value={selectWeek}
              onChange={onChangeWeek}
            />
          </GRFlexView>
        </GRFlexView>
        <GRFlexView>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("personalAttendance")}
            buttonType={"default"}
            block
          >
            출결
          </GRButtonText>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("leaderAttendance")}
            buttonType={"default"}
            block
          >
            순모임별
          </GRButtonText>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("managerAttendance")}
            buttonType={"default"}
            block
          >
            나무별
          </GRButtonText>
          <GRButtonText
            marginvertical={GRStylesConfig.BASE_MARGIN}
            onClick={() => setExcelOption("gradeAttendance")}
            buttonType={"default"}
            block
          >
            학년
          </GRButtonText>
        </GRFlexView>
      </GRFlexView>
    </GRModal>
  );
};

export default StatisticsExcelModal;
