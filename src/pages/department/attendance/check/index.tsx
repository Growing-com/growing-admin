import GRTab from "@component/atom/GRTab";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useAttendanceCheckMutate } from "api/attendance/mutate/useAttendanceCheckMutate";
import { useGetTermMembersByCodyQuery } from "api/term/queries/useGetTermMembersByCodyQuery";
import { ATTENDANCE_STATUS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import useAccountTermInfos from "hooks/domain/term/useAccountTermInfos";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { DEFAULT_FOMAT } from "utils/DateUtils";
import AttendancdeCheckSubmitButton from "./AttendancdeCheckSubmitButton";
import AttendanceCheckTable from "./AttendanceCheckTable";

const INIT_TAB = "0";
const AttendanceCheck = () => {
  const [currentTab, setCurrentTab] = useState(INIT_TAB);
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());
  const [selectTeam, setSelectTeam] = useState();

  const { control, watch, handleSubmit } = useForm();

  const { cordiSelectItem } = useAccountTermInfos();
  const { data: cordiMember } = useGetTermMembersByCodyQuery({
    termId: 1,
    codyId: 2
  });

  const { mutate: attendanceCheckMutate } = useAttendanceCheckMutate();

  console.log("cordiMember", cordiMember);
  const onChangeTab = useCallback((_tabIndx: string) => {
    console.log("_tabIndex", _tabIndx);
    setCurrentTab(_tabIndx);
  }, []);

  const onClickAttend = () => {
    console.log("onClickAttend");
  };

  const onSubmitButton = _item => {
    console.log("_item", _item);
    // "teamMemberId": 1,
    // "teamId": 1,
    // "status": "ATTEND"
    if (_item) {
      const _attendance = Object.entries(_item).map(([key, value]) => {
        const aa = {
          teamMemberId: key,
          teamId: 1,
          status: ATTENDANCE_STATUS.find(
            _status => _status.value === value.status
          )?.value,
          etc: value?.etc ?? ""
        };
        console.log("aa", aa);
        return aa;
      });

      attendanceCheckMutate({
        week: dayjs(filterDate).format(DEFAULT_FOMAT),
        attendances: _attendance
      });
      console.log("_attendance ", _attendance);
    }
  };

  return (
    <>
      <HeaderView
        title={"출석 체크"}
        titleInfo={"2023-05-17 수요일 00:00 까지 출석 체크가 가능합니다."}
      />
      <GRContainerView>
        <GRTab
          items={cordiSelectItem}
          defaultActiveKey={currentTab}
          onChange={onChangeTab}
          tabBarExtraContent={
            <GRFlexView alignItems={"flex-start"}>
              <GRDatePicker picker={"week"} defaultValue={filterDate} />
            </GRFlexView>
          }
        />
        <AttendanceCheckTable
          control={control}
          attendanceDataSource={cordiMember}
        />
        <AttendancdeCheckSubmitButton onSubmit={handleSubmit(onSubmitButton)} />
      </GRContainerView>
    </>
  );
};

export default AttendanceCheck;
