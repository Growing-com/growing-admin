import GRTab from "@component/atom/GRTab";
import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import { tOptions } from "@component/atom/dataEntry/type";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useAttendanceCheckMutate } from "api/attendance/mutate/useAttendanceCheckMutate";
import { useAttendanceCheckQuery } from "api/attendance/queries/useAttendanceCheckQuery";
import { tAttendance, tAttendanceCheckItem } from "api/attendance/types";
import dayjs, { Dayjs } from "dayjs";
import useAccountTermInfos from "hooks/domain/term/useAccountTermInfos";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { head } from "lodash";
import { useCallback, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import AttendanceCheckTable from "./AttendanceCheckTable";

const AttendanceCheck = () => {
  const [currentTab, setCurrentTab] = useState<tOptions>();
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());
  const [checkData, setCheckData] = useState<tAttendanceCheckItem[]>();

  const { cordiSelectItem } = useAccountTermInfos();
  const { setSelectedCodyId, termLeaderOptions, selectedCodyId } =
    useTermInfoOptionQueries();

  const { data: attendanceCheckData, isFetching } = useAttendanceCheckQuery({
    week: filterDate?.format(DEFAULT_DATE_FOMAT),
    codyId: selectedCodyId
  });

  const { mutateAsync: attendanceCheckMutate } = useAttendanceCheckMutate();

  const onChangeTab = useCallback(
    (_tabIndx: string) => {
      const leaderName = termLeaderOptions.find(
        leader => leader.value === _tabIndx
      );
      setCurrentTab(leaderName);
    },
    [termLeaderOptions]
  );

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      setFilterDate(_date);
    }
  };

  const onChangeSelectCordi = useCallback(
    (_selectCordi: number) => {
      setSelectedCodyId(_selectCordi);
    },
    [setSelectedCodyId]
  );

  useEffect(() => {
    if (termLeaderOptions) {
      const leaderName = head(termLeaderOptions);
      setCurrentTab(leaderName);
    }
  }, [termLeaderOptions]);

  useEffect(() => {
    let _findAttendance = attendanceCheckData;
    if (currentTab?.label) {
      _findAttendance = attendanceCheckData?.filter(
        checkData => checkData.leaderName === currentTab.label
      );
    }
    setCheckData(_findAttendance);
  }, [attendanceCheckData, currentTab]);

  const handleOnSubmitButton = useCallback(
    async (_attendance: tAttendance[]) => {
      try {
        await attendanceCheckMutate({
          week: dayjs(filterDate).format(DEFAULT_DATE_FOMAT),
          attendances: _attendance
        });
      } catch (e: any) {
        GRAlert.error(`출석 체크 실패, 다시 시도해주세요 ${e?.message ?? ""}`);
      }
    },
    [attendanceCheckMutate, filterDate]
  );

  return (
    <>
      <HeaderView
        title={"출석 체크"}
        titleInfo={`${dayjs()
          .weekday(4)
          .format(
            DEFAULT_DATE_FOMAT
          )} 수요일 00:00 까지 출석 체크 부탁드립니다.`}
      />
      <GRContainerView>
        <GRTab
          items={termLeaderOptions}
          onChange={onChangeTab}
          tabBarExtraContent={
            <GRFlexView
              alignItems={"flex-start"}
              flexDirection={"row"}
              marginbottom={GRStylesConfig.BASE_MARGIN}
            >
              <GRSelect
                marginright={GRStylesConfig.BASE_MARGIN}
                style={{ width: "8rem" }}
                options={cordiSelectItem}
                onChange={onChangeSelectCordi}
                placeholder={"나무 선택"}
              />
              <GRDatePicker
                pickerType={"basic"}
                picker={"week"}
                defaultValue={filterDate}
                onChange={onChangeWeek}
                disabledDate={current => {
                  const customDate = dayjs().format(DEFAULT_DATE_FOMAT);
                  return (
                    current && current > dayjs(customDate, DEFAULT_DATE_FOMAT)
                  );
                }}
              />
            </GRFlexView>
          }
        />
        <AttendanceCheckTable
          isLoading={isFetching}
          attendanceDataSource={checkData}
          onSubmit={handleOnSubmitButton}
        />
      </GRContainerView>
    </>
  );
};

export default AttendanceCheck;
