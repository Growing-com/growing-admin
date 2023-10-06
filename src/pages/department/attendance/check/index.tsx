import GRTab from "@component/atom/GRTab";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useAttendanceCheckMutate } from "api/attendance/mutate/useAttendanceCheckMutate";
import { tAttendance } from "api/attendance/types";
import { useTermMembersByCodyQuery } from "api/term/queries/useTermMembersByCodyQuery";
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

  const { control, handleSubmit } = useForm();

  const { cordiSelectItem } = useAccountTermInfos();

  const { data: leaderMember } = useTermMembersByCodyQuery({
    week: filterDate?.format(DEFAULT_DATE_FOMAT),
    codyId: currentTab
  });

  const { mutate: attendanceCheckMutate } = useAttendanceCheckMutate();

  const onChangeTab = useCallback((_tabIndx: string) => {
    setCurrentTab(parseInt(_tabIndx));
  }, []);

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      setFilterDate(_date);
    }
  };

  const onSubmitButton = (_item: tAttendance) => {
    if (_item) {
      const _attendance = Object.entries(_item).map(
        ([key, value]: [string, any]) => {
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
    }
  };

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
              />
            </GRFlexView>
          }
        />
        <AttendanceCheckTable
          control={control}
          attendanceDataSource={leaderMember}
        />
        <AttendancdeCheckSubmitButton onSubmit={handleSubmit(onSubmitButton)} />
      </GRContainerView>
    </>
  );
};

export default AttendanceCheck;
