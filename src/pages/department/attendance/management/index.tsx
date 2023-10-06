import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useAttendanceQuery } from "api/attendance/queries/useAttendanceQuery";

import { tAttendanceSearch } from "api/attendance/types";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import AttendanceFilterSearch from "./AttendanceFilterSearch";
import AttendanceSearchTable from "./AttendanceSearchTable";

const AttendanceManagementPage: NextPage = () => {
  const [filter, setFilter] = useState<tAttendanceSearch>();

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      rangeDate: [dayjs(), dayjs().subtract(1, "M")],
      searchType: "name"
    }
  });

  const { data: attendanceList } = useAttendanceQuery(filter);

  const convertParam = _filter => {
    switch (_filter?.searchType) {
      case "name":
        return { name: _filter.keyword };
      case "cordi":
        return { codyId: _filter.codyId.join(",") };
      case "grade":
        return { grade: _filter.keyword };
      case "newFamily":
        return { isNewOnly: true };
      default:
        break;
    }
  };

  const onSubmit = handleSubmit(_filter => {
    const { rangeDate } = _filter;
    setFilter({
      startDate: dayjs(rangeDate[1]).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs(rangeDate[0]).format(DEFAULT_DATE_FOMAT),
      page: 0,
      size: 20,
      ...convertParam(_filter)
    });
  });

  return (
    <>
      <HeaderView
        title={"출석 관리"}
        subComponent={
          <AttendanceFilterSearch
            onSubmit={onSubmit}
            control={control}
            searchType={watch("searchType")}
          />
        }
      />
      <GRContainerView>
        <AttendanceSearchTable attendanceList={attendanceList} />
      </GRContainerView>
    </>
  );
};

export default AttendanceManagementPage;
