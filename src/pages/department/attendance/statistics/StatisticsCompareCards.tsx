import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import { useStatisticsAttendanceSummaryQuery } from "api/statistics/queries/useStatisticsAttendanceSummaryQuery";
import dayjs from "dayjs";
import { useCallback } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

const customBox = css`
  /* border: 0.1rem solid ${Color.grey100}; */
  /* box-shadow: rgba(32, 200, 113, 0.1) 4px 1px 20px -5px, rgba(0,0,0, 0.1) 0px 3px 7px -3px; */
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  border-radius: 1rem;
`;
const LAST_MONDAY = -6; // 저번주 월요일
const LAST_SUNDAY = 0; // 저번주 일요일

const THIS_MONDAY = 1; // 이번주 월요일
const THIS_SUNDAY = 7; // 이번주 일요일

const StatisticsCompareCards = () => {
  const LAST_SUNDAY_TEXT = dayjs()
    .weekday(LAST_SUNDAY)
    .format(DEFAULT_DATE_FOMAT);
  const { data: statisticsAttendanceSummaryData } =
    useStatisticsAttendanceSummaryQuery({
      startDate: dayjs().weekday(THIS_MONDAY).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs().weekday(THIS_SUNDAY).format(DEFAULT_DATE_FOMAT)
    });

  const { data: statisticsAttendanceLastSummaryData } =
    useStatisticsAttendanceSummaryQuery({
      startDate: dayjs().weekday(LAST_MONDAY).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs().weekday(LAST_SUNDAY).format(DEFAULT_DATE_FOMAT)
    });

  const renderRate = useCallback((thisRange?: number, lastRange?: number) => {
    const isMinus = (thisRange ?? 0) - (lastRange ?? 0);
    if (isMinus < 0) {
      return (
        <GRView>
          <GRText color={Color.red100} weight={"bold"}>
            {isMinus} <ArrowDownOutlined rev={undefined} />
          </GRText>
        </GRView>
      );
    }
    return (
      <GRView>
        <GRText color={Color.blue100} weight={"bold"}>
          +{isMinus}
          <ArrowUpOutlined rev={undefined} />
        </GRText>
      </GRView>
    );
  }, []);

  return (
    <GRView marginbottom={2}>
      <GRText weight={"bold"} fontSize={"b4"} marginbottom={1}>
        ⚡️ 지난주 대비
      </GRText>
      <GRFlexView flexDirection={"row"} marginbottom={1}>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            전체 인원
          </GRText>
          <GRView>
            <GRText fontSize={"h6"}>
              {statisticsAttendanceSummaryData?.totalRegistered}
            </GRText>
            <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              {statisticsAttendanceLastSummaryData?.totalRegistered} ({" "}
              {LAST_SUNDAY_TEXT} )
            </GRText>
          </GRView>
          {renderRate(
            statisticsAttendanceSummaryData?.totalRegistered,
            statisticsAttendanceLastSummaryData?.totalRegistered
          )}
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            결석율
          </GRText>
          <GRView>
            <GRText fontSize={"h6"}>
              {statisticsAttendanceSummaryData?.totalAttendance}
            </GRText>
            <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              {statisticsAttendanceLastSummaryData?.totalAttendance} ({" "}
              {LAST_SUNDAY_TEXT} )
            </GRText>
          </GRView>
          {renderRate(
            statisticsAttendanceSummaryData?.totalAttendance,
            statisticsAttendanceLastSummaryData?.totalAttendance
          )}
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            새등록
          </GRText>
          <GRView>
            <GRText fontSize={"h6"}>
              {statisticsAttendanceSummaryData?.newComerRegistered}
            </GRText>
            <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              {statisticsAttendanceLastSummaryData?.newComerRegistered} ({" "}
              {LAST_SUNDAY_TEXT} )
            </GRText>
          </GRView>
          {renderRate(
            statisticsAttendanceSummaryData?.newComerRegistered,
            statisticsAttendanceLastSummaryData?.newComerRegistered
          )}
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            새가족 출석율
          </GRText>
          <GRView>
            <GRText fontSize={"h6"}>
              {statisticsAttendanceSummaryData?.newComerAttendance}
            </GRText>
            <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              {statisticsAttendanceLastSummaryData?.newComerAttendance} ({" "}
              {LAST_SUNDAY_TEXT} )
            </GRText>
          </GRView>
          {renderRate(
            statisticsAttendanceSummaryData?.newComerAttendance,
            statisticsAttendanceLastSummaryData?.newComerAttendance
          )}
        </GRFlexView>
      </GRFlexView>
    </GRView>
  );
};

export default StatisticsCompareCards;
