import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import { useStatisticsAttendanceSummaryQuery } from "api/statistics/queries/useStatisticsAttendanceSummaryQuery";
import { useTermUserStatistics } from "api/term/queries/useTermUserStatistics";
import { useCallback } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { getWeekDataFromToday } from "utils/DateUtils";

const customBox = css`
  /* border: 0.1rem solid ${Color.grey100}; */
  /* box-shadow: rgba(32, 200, 113, 0.1) 4px 1px 20px -5px, rgba(0,0,0, 0.1) 0px 3px 7px -3px; */
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  border-radius: 1rem;
`;

const StatisticsCompareSummaryCards = () => {
  const { data: statisticsUserSummaryData } = useTermUserStatistics({
    week: getWeekDataFromToday.lastSunday
  });
  const { data: statisticsUserLastSummaryData } = useTermUserStatistics({
    week: getWeekDataFromToday.lastlastSunday
  });
  const { data: statisticsAttendanceSummaryData } =
    useStatisticsAttendanceSummaryQuery({
      startDate: getWeekDataFromToday.lastSunday,
      endDate: getWeekDataFromToday.thisSaturday
    });

  const { data: statisticsAttendanceLastSummaryData } =
    useStatisticsAttendanceSummaryQuery({
      startDate: getWeekDataFromToday.lastlastSunday,
      endDate: getWeekDataFromToday.lastSaturday
    });

  const renderRate = useCallback((thisRange?: number, lastRange?: number) => {
    const isMinus = (thisRange ?? 0) - (lastRange ?? 0);
    if (isMinus < 0) {
      return (
        <GRView margin={GRStylesConfig.BASE_MARGIN}>
          <GRText fontSize={"b8"} color={Color.red100} weight={"bold"}>
            <ArrowDownOutlined rev={undefined} /> {isMinus}
          </GRText>
        </GRView>
      );
    }
    return (
      <GRView margin={GRStylesConfig.BASE_MARGIN}>
        <GRText fontSize={"b8"} color={Color.blue100} weight={"bold"}>
          <ArrowUpOutlined rev={undefined} /> +{isMinus}
        </GRText>
      </GRView>
    );
  }, []);

  return (
    <GRView marginbottom={2}>
      <GRText weight={"bold"} fontSize={"b4"} marginbottom={1}>
        ⚡️ 지난주 대비
        <GRText
          fontSize={"b7"}
          marginleft={GRStylesConfig.BASE_MARGIN}
          color={Color.grey80}
        >
          {getWeekDataFromToday.lastSunday}
        </GRText>
      </GRText>
      <GRFlexView flexDirection={"row"} marginbottom={1}>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            전체 인원
          </GRText>
          <GRFlexView flexDirection={"row"} alignItems={"end"}>
            <GRText fontSize={"h6"}>
              {statisticsUserSummaryData?.totalRegistered}
              <GRText fontSize={"b5"} marginleft={GRStylesConfig.BASE_PADDING}>
                명
              </GRText>
            </GRText>
            {renderRate(
              statisticsUserSummaryData?.totalRegistered,
              statisticsUserLastSummaryData?.totalRegistered
            )}
          </GRFlexView>
          {/* <GRText
            fontSize={"b7"}
            marginleft={GRStylesConfig.BASE_MARGIN}
            color={Color.grey80}
          >
            {statisticsAttendanceLastSummaryData?.totalRegistered} ({" "}
            {LAST_SUNDAY_TEXT} )
          </GRText> */}
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            출석인원 ( 출석 + 온라인 )
          </GRText>
          <GRFlexView flexDirection={"row"} alignItems={"end"}>
            <GRText fontSize={"h6"}>
              {statisticsAttendanceSummaryData?.totalAttendance}
              <GRText fontSize={"b5"} marginleft={GRStylesConfig.BASE_PADDING}>
                명
              </GRText>
            </GRText>
            {renderRate(
              statisticsAttendanceSummaryData?.totalAttendance,
              statisticsAttendanceLastSummaryData?.totalAttendance
            )}
          </GRFlexView>
          {/* <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              {statisticsAttendanceLastSummaryData?.totalAttendance} ({" "}
              {LAST_SUNDAY_TEXT} )
            </GRText> */}
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            새등록
          </GRText>
          <GRFlexView flexDirection={"row"} alignItems={"end"}>
            <GRText fontSize={"h6"}>
              {statisticsUserSummaryData?.totalNewRegistered}
              <GRText fontSize={"b5"} marginleft={GRStylesConfig.BASE_PADDING}>
                명
              </GRText>
            </GRText>
            {renderRate(
              statisticsUserSummaryData?.totalNewRegistered,
              statisticsUserLastSummaryData?.totalNewRegistered
            )}
          </GRFlexView>
          {/* <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              {statisticsAttendanceLastSummaryData?.newComerRegistered} ({" "}
              {LAST_SUNDAY_TEXT} )
            </GRText> */}
        </GRFlexView>
        <GRFlexView padding={1} marginright={1} css={customBox}>
          <GRText fontSize={"b6"} color={Color.grey80} weight={"bold"}>
            새가족 출석인원
          </GRText>
          <GRFlexView flexDirection={"row"} alignItems={"end"}>
            <GRText fontSize={"h6"}>
              {statisticsAttendanceSummaryData?.newComerAttendance}
              <GRText fontSize={"b5"} marginleft={GRStylesConfig.BASE_PADDING}>
                명
              </GRText>
            </GRText>
            {renderRate(
              statisticsAttendanceSummaryData?.newComerAttendance,
              statisticsAttendanceLastSummaryData?.newComerAttendance
            )}
          </GRFlexView>
          {/* <GRText
              fontSize={"b7"}
              marginleft={GRStylesConfig.BASE_MARGIN}
              color={Color.grey80}
            >
              {statisticsAttendanceLastSummaryData?.newComerAttendance} ({" "}
              {LAST_SUNDAY_TEXT} )
            </GRText> */}
        </GRFlexView>
      </GRFlexView>
    </GRView>
  );
};

export default StatisticsCompareSummaryCards;
