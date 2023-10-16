import GRTab from "@component/atom/GRTab";
import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useAttendanceCheckMutate } from "api/attendance/mutate/useAttendanceCheckMutate";
import { useAttendanceCheckQuery } from "api/attendance/queries/useAttendanceCheckQuery";
import { tAttendance } from "api/attendance/types";
import { ATTENDANCE_STATUS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import useAccountTermInfos from "hooks/domain/term/useAccountTermInfos";
import { head } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import AttendancdeCheckSubmitButton from "./AttendancdeCheckSubmitButton";
import AttendanceCheckTable from "./AttendanceCheckTable";

const AttendanceCheck = () => {
  const [currentTab, setCurrentTab] = useState<number>();
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());

  const { control, handleSubmit, reset } = useForm();

  const { cordiSelectItem } = useAccountTermInfos();

  const { data: attendanceCheckData, isFetching } = useAttendanceCheckQuery({
    week: filterDate?.format(DEFAULT_DATE_FOMAT),
    codyId: currentTab
  });

  const { mutate: attendanceCheckMutate } = useAttendanceCheckMutate();

  const onChangeTab = useCallback(
    (_tabIndx: string) => {
      reset();
      setCurrentTab(parseInt(_tabIndx));
    },
    [reset]
  );

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      reset();
      setFilterDate(_date);
    }
  };

  const handleOnSumbitButton = handleSubmit(_item => {
    if (_item) {
      try {
        const _attendance = Object.entries(_item).map(
          ([key, value]: [string, any]) => {
            if (!value.status) throw new Error("출석을 모두 선택해 주세요");
            return {
              teamMemberId: key,
              teamId: currentTab,
              status: ATTENDANCE_STATUS.find(
                _status => _status.value === value.status
              )?.value,
              etc: value?.etc ?? ""
            };
          }
        );
        attendanceCheckMutate({
          week: dayjs(filterDate).format(DEFAULT_DATE_FOMAT),
          attendances: _attendance as unknown as tAttendance[]
        });
      } catch (e: any) {
        GRAlert.error(e?.message ?? "Error");
      }
    }
  });

  useEffect(() => {
    if (cordiSelectItem.length) {
      const _initCordi = head(cordiSelectItem);
      setCurrentTab(_initCordi?.value as number);
    }
  }, [cordiSelectItem]);

  return (
    <>
      <HeaderView
        title={"출석 체크"}
        titleInfo={`${dayjs()
          .weekday(4)
          .format(
            DEFAULT_DATE_FOMAT
          )} 수요일 00:00 까지 출석 체크가 가능합니다.`}
      />
      <GRContainerView>
        <GRTab
          items={cordiSelectItem}
          onChange={onChangeTab}
          tabBarExtraContent={
            <GRFlexView alignItems={"flex-start"}>
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
          control={control}
          attendanceDataSource={attendanceCheckData}
        />
        <AttendancdeCheckSubmitButton onSubmit={handleOnSumbitButton} />
      </GRContainerView>
    </>
  );
};

export default AttendanceCheck;
