import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import ColumLinkText from "@component/molecule/table/ColumLinkText";
import { ColumnType } from "antd/es/table";
import { tAttendanceItem } from "api/attendance/types";
import { tTermNewFamily } from "api/term/types";
import { ATTEND_STATUS } from "common/enum";
import { Dayjs } from "dayjs";
import { FC, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { NEWFAMILY_DUMP_ATTENDANCE_DATA } from "./newfamilyDumpData";

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

type tNewFamilyAttendanceTable = {
  onClickPromote: (newFamily: tTermNewFamily[]) => void;
  onClickNewFamilyLineUp: (newFamily: tTermNewFamily[]) => void;
};

type tNewFamilyAttendanceTableColums = {
  userName: string;
  attendanceItems: tAttendanceItem[];
};

export const NewFamilyAttendanceTable: FC<tNewFamilyAttendanceTable> = ({
  onClickPromote,
  onClickNewFamilyLineUp
}) => {
  // const [filter, setFilter] = useState<tAttendanceSearch>({
  //   startDate: "2023-11-02",
  //   endDate: "2023-12-01",
  //   page: 0,
  //   size: 10,
  //   codyId: 6
  // });
  // const { data: attendanceList, isFetching } = useAttendanceQuery(filter);
  // const searchWeek = useMemo(
  //   () => getSundayRangeDate(filter?.startDate, filter?.endDate),
  //   [filter]
  // );
  const [filterDate, setFilterDate] = useState<Dayjs>();
  const [selectedNewFamily, setSelectedNewFamily] = useState<tTermNewFamily[]>(
    []
  );

  const onSearch = () => {};

  const columns: ColumnType<tNewFamilyAttendanceTableColums>[] = [
    {
      title: "이름",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: "8rem",
      render: (_, recode) => (
        <ColumLinkText text={recode.userName} onClick={onSearch} />
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
    }
    // {
    //   ...(ColumDateTitleAttendanceRender({
    //     attendanceList: NEWFAMILY_DUMP_ATTENDANCE_DATA,
    //     weeks: searchWeek
    //   }) as tUseAttendanceQueryResposne)
    // }
  ];

  const onChangeSearch = () => {};

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      setFilterDate(_date);
    }
  };

  const onSelectChange = (_: React.Key[], selectedRows: any[]) => {
    setSelectedNewFamily(selectedRows);
  };

  const onClickSubPromote = () => {
    if (selectedNewFamily.length === 0) {
      alert("등반할 새가족을 선택해주세요.");
      return;
    }
    onClickPromote(selectedNewFamily);
  };

  const onClickSubNewFamilyLineUp = () => {
    if (selectedNewFamily.length === 0) {
      alert("라인업 할 새가족을 선택해주세요.");
      return;
    }
    onClickNewFamilyLineUp(selectedNewFamily);
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
          {/* <GRDatePicker
            pickerType={"range"}
            picker={"date"}
            defaultValue={filterDate}
            onChange={onChangeWeek}
          /> */}
        </GRFlexView>
        <GRView>
          <GRButtonText
            onClick={onClickSubPromote}
            marginright={GRStylesConfig.BASE_MARGIN}
            buttonType={"custom"}
            size={"small"}
          >
            등반
          </GRButtonText>
          <GRButtonText
            onClick={onClickSubNewFamilyLineUp}
            buttonType={"primary"}
          >
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
        rowSelection={{
          selectedRowKeys: selectedNewFamily.map(newFamily => newFamily.userId),
          onChange: onSelectChange
        }}
      />
    </>
  );
};
