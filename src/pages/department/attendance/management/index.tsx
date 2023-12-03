import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useAttendanceQuery } from "api/attendance/queries/useAttendanceQuery";

import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import { tAttendanceSearch } from "api/attendance/types";
import dayjs from "dayjs";
import useAccountTermInfos from "hooks/domain/term/useAccountTermInfos";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import { NextPage } from "next";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import AttendanceSearchTable from "./AttendanceSearchTable";

const SEARCH_OPTION = [
  {
    label: "이름",
    value: "name"
  },
  {
    label: "나무",
    value: "cordi"
  },
  {
    label: "학년",
    value: "grade"
  },
  {
    label: "새가족",
    value: "newFamily"
  }
];

const AttendanceManagementPage: NextPage = () => {
  const [filter, setFilter] = useState<tAttendanceSearch>();

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      rangeDate: [dayjs().subtract(1, "M"), dayjs()],
      searchType: "name"
    }
  });
  const { data: attendanceList, isFetching } = useAttendanceQuery(filter);

  const convertParam = (_filter: {
    rangeDate?: dayjs.Dayjs[];
    searchType: any;
    keyword?: any;
    codyId?: any;
  }) => {
    switch (_filter?.searchType) {
      case "name":
        return { name: _filter?.keyword };
      case "cordi":
        return { codyId: _filter?.codyId.join(",") };
      case "grade":
        return { grade: _filter?.keyword };
      case "newFamily":
        return { isNewOnly: true };
      default:
        break;
    }
  };

  const onSubmit = handleSubmit(_filter => {
    const { rangeDate } = _filter;
    setFilter({
      startDate: dayjs(rangeDate[0]).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs(rangeDate[1]).format(DEFAULT_DATE_FOMAT),
      page: 1,
      size: 10,
      ...convertParam(_filter)
    });
  });

  const { cordiSelectItem } = useAccountTermInfos();

  const renderPlaceHolder = useMemo(() => {
    switch (watch("searchType")) {
      case "name":
        return "이름으로 검색하세요. 예) 홍, 홍길, 홍길동";
      case "grade":
        return "학년으로 검색하세요";
      default:
        return "검색어를 작성해 주세요";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("searchType")]);

  const onClickSearch = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  const onChangeAttendancePagination = useCallback(
    (page: number, pageSize: number) => {
      if (filter) {
        setFilter({
          ...filter,
          size: pageSize,
          page
        });
      }
    },
    [filter]
  );

  useKeyPressEventListener("Enter", () => {
    onSubmit();
  });

  return (
    <>
      <HeaderView
        title={"출석 열람"}
        subComponent={
          <GRFlexView flexDirection={"row"}>
            <GRFlexView>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRText
                  weight={"bold"}
                  fontSize={"b5"}
                  width={5}
                  marginbottom={1}
                >
                  기간
                </GRText>
                <GRFormItem
                  type={"date"}
                  fieldName={"rangeDate"}
                  control={control}
                  pickerType={"range"}
                />
                <GRText
                  marginleft={1}
                  weight={"bold"}
                  fontSize={"b5"}
                  width={5}
                  marginbottom={1}
                >
                  검색 조건
                </GRText>
                <GRFormItem
                  type={"select"}
                  fieldName={"searchType"}
                  control={control}
                  options={SEARCH_OPTION}
                  placeholder={"조건을 선택해주세요"}
                />
              </GRFlexView>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRText
                  weight={"bold"}
                  fontSize={"b5"}
                  width={5}
                  marginbottom={1}
                >
                  조건
                </GRText>
                <GRFormItem
                  mode={"multiple"}
                  type={"select"}
                  fieldName={"codyId"}
                  control={control}
                  options={cordiSelectItem}
                  placeholder={"나무를 선택해주세요"}
                  isShow={watch("searchType") === "cordi"}
                  showSearch
                  optionFilterProp={"label"}
                />
                <GRFormItem
                  type={"text"}
                  fieldName={"keyword"}
                  control={control}
                  placeholder={renderPlaceHolder}
                  isShow={watch("searchType") !== "cordi"}
                  disabled={watch("searchType") === "newFamily"}
                />
              </GRFlexView>
            </GRFlexView>
            <GRView>
              <GRButtonText
                onClick={onClickSearch}
                marginleft={2}
                size={"large"}
              >
                조회
              </GRButtonText>
            </GRView>
          </GRFlexView>
        }
      />
      <GRContainerView>
        <AttendanceSearchTable
          filter={filter}
          isLoading={isFetching}
          attendanceList={attendanceList?.content}
          attendanceListSize={attendanceList?.size}
          attendanceListTotal={attendanceList?.total}
          attendanceListPage={filter?.page}
          onChangePage={onChangeAttendancePagination}
        />
      </GRContainerView>
    </>
  );
};

export default AttendanceManagementPage;
