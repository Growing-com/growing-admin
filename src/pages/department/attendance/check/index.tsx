import GRTab from "@component/atom/GRTab";
import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import { tOptions } from "@component/atom/dataEntry/type";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import AttendanceCheckTable from "@component/pageComponents/department/attendance/check/AttendanceCheckTable";
import AttendanceProgress from "@component/pageComponents/department/attendance/check/AttendanceProgress";
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

const AttendanceCheck = () => {
  const [currentTab, setCurrentTab] = useState<tOptions>();
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());
  const [checkData, setCheckData] = useState<tAttendanceCheckItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { cordiSelectItem } = useAccountTermInfos();
  const { setSelectedCodyId, termLeaderOptions, selectedCodyId } =
    useTermInfoOptionQueries();

  const {
    data: attendanceCheckData,
    isFetching,
    refetch
  } = useAttendanceCheckQuery({
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
    if (cordiSelectItem.length) {
      setSelectedCodyId(Number(head(cordiSelectItem)?.value));
    }
  }, [cordiSelectItem, setSelectedCodyId]);

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
      setIsLoading(true);
      try {
        await attendanceCheckMutate({
          week: dayjs(filterDate).format(DEFAULT_DATE_FOMAT),
          attendances: _attendance
        });
        refetch();
      } catch (e: any) {
        GRAlert.error(`출석 체크 실패, 다시 시도해주세요 ${e?.message ?? ""}`);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    },
    [attendanceCheckMutate, filterDate, refetch]
  );

  return (
    <>
      <HeaderView
        title={"출석 체크"}
        titleInfo={`${dayjs()
          .weekday(3)
          .format(
            DEFAULT_DATE_FOMAT
          )} 수요일 23:59 까지 출석 체크 부탁드립니다.`}
        showIcon={false}
      />
      <GRContainerView>
        <GRFlexView alignItems={"flex-start"} flexDirection={"row"}>
          <AttendanceProgress attendanceData={attendanceCheckData} />
          <GRSelect
            marginright={GRStylesConfig.BASE_MARGIN}
            style={{ width: "8rem" }}
            options={cordiSelectItem}
            onChange={onChangeSelectCordi}
            value={selectedCodyId}
            placeholder={"나무 선택"}
          />
          <GRDatePicker
            pickerType={"basic"}
            picker={"week"}
            defaultValue={filterDate}
            onChange={onChangeWeek}
          />
        </GRFlexView>
        <GRTab
          items={termLeaderOptions}
          onChange={onChangeTab}
          // tabBarExtraContent={

          // }
        />
        <AttendanceCheckTable
          isLoading={isFetching || isLoading}
          attendanceDataSource={checkData}
          onSubmit={handleOnSubmitButton}
        />
      </GRContainerView>
    </>
  );
};

export default AttendanceCheck;
