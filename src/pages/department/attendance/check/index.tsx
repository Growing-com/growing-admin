import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import AttendanceCheckNormalTable from "@component/pages/department/attendance/check/AttendanceCheckNormalTable";
import AttendanceCheckStumpTable from "@component/pages/department/attendance/check/AttendanceCheckStumpTable";
import AttendanceProgressBar from "@component/pages/department/attendance/check/AttendanceProgressBar";
import { STUMP_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useCurrentTermInfoOptionQueries } from "hooks/queries/term/useCurrentTermInfoOptionQueries";
import { NextPage } from "next";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const AttendanceCheckPage: NextPage = () => {
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs().startOf("week"));
  const [stumpCheck, setStumpCheck] = useState("STUMP");
  
  const {
    currentTermCodyOptions,
    leaderByCodyOptions,
    selectedCodyId,
    setSelectedCodyId
  } = useCurrentTermInfoOptionQueries();

  // const insertDataInFormResult = (
  //   _userId: number,
  //   key: string,
  //   value: any,
  //   data: any,
  //   setData: any
  // ) => {
  //   const _formResult = data?.map(
  //     (result: { userId: number; attendItems: any[] }) => {
  //       if (_userId !== result.userId) return result;

  //       return {
  //         ...result,
  //         attendItems: [
  //           {
  //             //[{}] 이렇게 오는데 {}로 올 수 있는지 확인해야됨
  //             ...result.attendItems[0],
  //             [key]: value
  //           }
  //         ]
  //         // * {} 올 경우
  //         // attendItems: {
  //         //     ...result.attendItems,
  //         //     [key]: value
  //         //   }
  //       };
  //     }
  //   );
  //   setData(_formResult);
  // };

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      const lastSunday = dayjs(_date).startOf("week");
      setFilterDate(lastSunday);
    }
  };

  const onChangeStumpAttendance = (e: any) => {
    setStumpCheck(e.target.value);
  };

  return (
    <>
      <HeaderView title={"출석 체크"} />
      <GRContainerView>
        <GRFlexView margintop={GRStylesConfig.BASE_LONG_MARGIN}>
          <GRFlexView
            flexDirection={"row"}
            alignItems="center"
            marginbottom={GRStylesConfig.BASE_MARGIN}
          >
            <AttendanceProgressBar
              userType={"NORMAL"}
              filterDate={filterDate}
            />
            <GRFlexView
              flexDirection={"row"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <GRRadio
                options={STUMP_OPTIONS}
                onChange={onChangeStumpAttendance}
                value={stumpCheck}
              />
              <GRSelect
                marginright={GRStylesConfig.BASE_MARGIN}
                style={{ width: "8rem" }}
                options={currentTermCodyOptions}
                onChange={setSelectedCodyId}
                value={selectedCodyId}
                placeholder={"나무 선택"}
                disabled={stumpCheck === "STUMP"}
              />
              <GRDatePicker
                pickerType={"basic"}
                picker={"week"}
                defaultValue={filterDate}
                onChange={onChangeWeek}
              />
            </GRFlexView>
          </GRFlexView>
          <GRFlexView>
            {stumpCheck === "STUMP" && (
              <AttendanceCheckStumpTable
                // insertDataInFormResult={insertDataInFormResult}
                filterDate={filterDate}
              />
            )}
            {stumpCheck === "NORMAL" && (
              <AttendanceCheckNormalTable
                // insertDataInFormResult={insertDataInFormResult}
                filterDate={filterDate}
                selectedCodyId={selectedCodyId}
                leaderByCodyOptions={leaderByCodyOptions}
              />
            )}
          </GRFlexView>
        </GRFlexView>
      </GRContainerView>
    </>
  );
};

export default AttendanceCheckPage;
