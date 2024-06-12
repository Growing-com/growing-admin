import GRTable from "@component/atom/GRTable";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { ColumnType } from "antd/es/table";
import { tUseAttendanceQueryResposne } from "api/attendance";
import { useAttendanceQuery } from "api/attendance/queries/useAttendanceQuery";
import { tAttendanceSearch } from "api/attendance/types";
import { useMemo, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import GRButtonText from "@component/atom/button/GRTextButton";
import { NEWFAMILY_DUMP_ATTENDANCE_DATA } from "./newfamilyDumpData";
import ColumDateTitleAttendanceRender from "@component/templates/table/ColumDateTitleAttendanceRender";
import { getSundayRangeDate } from "utils/DateUtils";
import { ATTEND_STATUS } from "common/enum";
import GRText from "@component/atom/text/GRText";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import dayjs, { Dayjs } from "dayjs";

export const accountDumpData = [
  {
    name: "이종민",
    age: 18,
    gender: "남",
    status: "리더",
    role: "관리자",
    leader: "조예인",
    phoneNumber: "010-5485-9349"
  },
  {
    name: "아이유",
    age: 10,
    gender: "여",
    status: "조원",
    role: "",
    leader: "조예인",
    phoneNumber: "010-5485-9349"
  }
];

export const NewFamilyAttendanceTable = (
  onClickPromote,
  onClickNewFamilyLineUp
) => {
  const [filter, setFilter] = useState<tAttendanceSearch>({
    startDate: "2023-11-02",
    endDate: "2023-12-01",
    page: 0,
    size: 10,
    codyId: 6
  });
  const { data: attendanceList, isFetching } = useAttendanceQuery(filter);
  const searchWeek = useMemo(
    () => getSundayRangeDate(filter?.startDate, filter?.endDate),
    [filter]
  );
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());

  const columns: ColumnType<tUseAttendanceQueryResposne>[] = [
    {
      title: "이름",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: "8rem",
      render: (_, recode) => (
        <ColumLinkText
          text={recode.userName}
          onClick={() => onClickLinkText(recode)}
        />
      )
    },
    {
      title: "출석수",
      dataIndex: "attendance",
      key: "attendance",
      align: "center",
      width: "5rem",
      render: (_, record) => {
        const attendanceLen = record.attendanceItems.filter(
          item => item.status === ATTEND_STATUS.ATTEND
        ).length;
        return <GRText>{attendanceLen}</GRText>;
      }
    },
    {
      title: "결석수",
      dataIndex: "absence",
      key: "absence",
      align: "center",
      fixed: "left",
      width: "5rem",
      render: (_, record) => {
        const attendanceLen = record.attendanceItems.filter(
          item => item.status === ATTEND_STATUS.ABSENT
        ).length;
        return <GRText>{attendanceLen}</GRText>;
      }
    },
    {
      ...(ColumDateTitleAttendanceRender({
        attendanceList: NEWFAMILY_DUMP_ATTENDANCE_DATA,
        weeks: searchWeek
      }) as tUseAttendanceQueryResposne)
    }
  ];

  const onChangeSearch = () => {};

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      setFilterDate(_date);
    }
  };

  return (
    <>
      <GRFlexView
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginbottom={GRStylesConfig.BASE_MARGIN}
      >
        <GRFlexView
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <GRView marginright={GRStylesConfig.BASE_MARGIN}>
            <GRTextInput
              type={"input"}
              placeholder={"이름으로 검색하세요"}
              onChange={onChangeSearch}
            />
          </GRView>
          <GRDatePicker
            pickerType={"range"}
            picker={"date"}
            defaultValue={filterDate}
            onChange={onChangeWeek}
          />
        </GRFlexView>
        <GRView>
          <GRButtonText
            onClick={onClickPromote}
            marginright={GRStylesConfig.BASE_MARGIN}
            buttonType={"custom"}
            size={"small"}
          >
            등반
          </GRButtonText>
          <GRButtonText onClick={onClickNewFamilyLineUp} buttonType={"primary"}>
            라인업
          </GRButtonText>
        </GRView>
      </GRFlexView>
      <GRTable
        columns={columns}
        data={NEWFAMILY_DUMP_ATTENDANCE_DATA}
        pagination={{
          total: NEWFAMILY_DUMP_ATTENDANCE_DATA?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
      />
    </>
  );
};
