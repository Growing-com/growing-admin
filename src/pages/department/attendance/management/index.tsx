import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import HeaderView from "@component/molecule/view/HeaderView";
import { TableColumnsType } from "antd";
import { useAttendanceRangeData } from "api/attendance/queries/useAttendanceRangeData";
import {
  tAttendanceData,
  tAttendanceItems,
  tAttendanceRangeData
} from "api/attendance/type";
import { SEX_NAME } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import { head } from "lodash";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FORMAT } from "utils/DateUtils";
import { koreanSorter } from "utils/sorter";

export const SEARCH_OPTION = [
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
  }
];

type tFilterOption = {
  text: string;
  value: string;
};

const AttendanceManagementPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<tAttendanceRangeData>();
  const [skeletonAttendanceData, setSkeletonAttendanceData] =
    useState<tAttendanceItems[]>();
  const [filteredData, setFilteredData] = useState<tAttendanceData[]>();
  const [searchName, setSearchName] = useState<string>("");

  const [codyFilterOptions, setCodyFilterOptions] = useState<tFilterOption[]>(
    []
  );
  const [leaderFilterOptions, setLeaderFilterOptions] = useState<
    tFilterOption[]
  >([]);
  const [gradeFilterOptions, setGradeFilterOptions] = useState<tFilterOption[]>(
    []
  );

  const { data: attendanceList, isFetching } = useAttendanceRangeData(filter);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      rangeDate: [dayjs().subtract(1, "M"), dayjs()],
      searchName: ""
    }
  });

  // 기간 선택 제한
  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
    const sixMonthAgo = dayjs().subtract(6, "month");
    return (
      (current && current.isAfter(dayjs())) || current.isBefore(sixMonthAgo)
    );
  };

  const onSubmit = handleSubmit(_filter => {
    const { rangeDate, searchName } = _filter;

    if (!rangeDate) return GRAlert.error("검색 기간을 선택해주세요");

    setFilter({
      startDate: dayjs(rangeDate[0]).format(DEFAULT_DATE_FORMAT),
      endDate: dayjs(rangeDate[1]).format(DEFAULT_DATE_FORMAT)
    });

    setSearchName(searchName);
    setCurrentPage(1);
  });

  const onSearchName = () => {
    let _filterUser = attendanceList;
    if (searchName) {
      _filterUser = attendanceList?.filter(user => {
        return user.name?.indexOf(searchName) !== -1;
      });
    }
    setFilteredData(_filterUser);
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const onClickSearch = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  useKeyPressEventListener("Enter", () => {
    onSubmit();
  });

  // 필터 변경에 따른 파지네이션
  const handleChange = (
    _pagination: any,
    filters: any,
    _sorter: any,
    extra: { currentDataSource: any; action: any }
  ) => {
    if (!attendanceList) return;
    if (
      filters.codyName === null &&
      filters.leaderName === null &&
      filters.grade === null
    ) {
      onSearchName();
      return;
    }
    setFilteredData(extra.currentDataSource);
  };

  // 필터 설정 함수
  useEffect(() => {
    if (!filteredData) return;
    const uniqueCodyNames = [
      ...new Set(filteredData.map(user => user.codyName))
    ];
    const _codyFilterOptions = uniqueCodyNames?.map(name => ({
      text: name ?? "",
      value: name ?? ""
    }));
    setCodyFilterOptions(_codyFilterOptions);

    const uniqueLeaderNames = [
      ...new Set(filteredData.map(user => user.leaderName))
    ];
    const filteredLeaderNames = uniqueLeaderNames.filter(
      name => !uniqueCodyNames.includes(name)
    );
    const _leaderFilterOptions = filteredLeaderNames?.map(name => ({
      text: name ?? "",
      value: name ?? ""
    }));
    setLeaderFilterOptions(_leaderFilterOptions);

    const uniqueGrade = [...new Set(filteredData.map(user => user.grade))];
    const _gradeFilterOptions = uniqueGrade
      ?.sort((a, b) => Number(a) - Number(b))
      .map(grade => ({
        text: `${grade}학년`,
        value: grade as unknown as string
      }));
    setGradeFilterOptions(_gradeFilterOptions);
  }, [filteredData]);

  useEffect(() => {
    if (attendanceList?.length === 0) return;
    onSearchName();
  }, [attendanceList, searchName]);

  // 출석 날짜 목록 설정 함수
  useEffect(() => {
    if (!attendanceList) return;
    setSkeletonAttendanceData(head(attendanceList)?.attendanceItems);
  }, [attendanceList]);

  const columns: TableColumnsType<any> = [
    {
      title: "코디",
      dataIndex: "codyName",
      key: "codyName",
      align: "center",
      width: "5rem",
      minWidth: 75,
      filters: codyFilterOptions,
      onFilter: (value, record) => record.codyName === value
    },
    {
      title: "순장",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "5rem",
      minWidth: 75,
      filters: leaderFilterOptions,
      onFilter: (value, record) => record.leaderName === value,
      filterSearch: true
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => koreanSorter(a.name, b.name),
        multiple: 1
      },
      render: (_, item) => <GRText weight={"bold"}>{item.name}</GRText>
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "5rem",
      minWidth: 60,
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem",
      minWidth: 60,
      sorter: { compare: (a, b) => a.grade - b.grade, multiple: 2 },
      filters: gradeFilterOptions,
      onFilter: (value, record) => record.grade === value
    },
    {
      title: () => {
        return (
          <GRFlexView alignItems={"center"}>
            <GRText weight={"bold"} fontSize={"b7"}>
              출석 날짜
            </GRText>
          </GRFlexView>
        );
      },
      align: "center",
      children: skeletonAttendanceData?.map(item => ({
        title: item.date,
        dataIndex: "attendanceItems",
        key: "attendanceItems",
        align: "center",
        minWidth: 100,
        render: (record: tAttendanceItems[]) => {
          const findData = record.find(r => r.date === item.date);
          return (
            <ColumAttendanceRender
              attendanceStatus={findData?.status}
              contentEtc={findData?.reason}
            />
          );
        }
      }))
    }
  ];

  return (
    <>
      <HeaderView
        title={"출석 열람"}
        subComponent={
          <GRFlexView flexDirection={"row"}>
            <GRFlexView>
              <GRFlexView
                flexDirection={"row"}
                alignItems={"center"}
                xGap={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
              >
                <GRFlexView
                  flexDirection={"row"}
                  alignItems={"center"}
                  xGap={GRStylesConfig.BASE_LONG_MARGIN}
                >
                  <GRFormTitle title={"기간"} />
                  <GRFormItem
                    type={"date"}
                    fieldName={"rangeDate"}
                    control={control}
                    pickerType={"range"}
                    disabledDate={disabledDate}
                  />
                </GRFlexView>
                <GRFlexView
                  flexDirection={"row"}
                  alignItems={"center"}
                  xGap={GRStylesConfig.BASE_LONG_MARGIN}
                >
                  <GRFormTitle title={"이름"} />
                  <GRFormItem
                    type={"text"}
                    fieldName={"searchName"}
                    control={control}
                    placeholder={"이름으로 검색하세요"}
                  />
                </GRFlexView>
              </GRFlexView>
            </GRFlexView>
            <GRTextButton onClick={onClickSearch} marginleft={2} size={"large"}>
              조회
            </GRTextButton>
          </GRFlexView>
        }
      />
      <GRContainerView>
        <GRView margintop={GRStylesConfig.BASE_LONG_MARGIN}>
          <GRTable
            isLoading={isFetching}
            rowKey={"userId"}
            columns={columns}
            data={filteredData}
            pagination={{
              total: filteredData?.length,
              current: currentPage,
              onChange: handlePaginationChange,
              defaultPageSize: 10,
              position: ["bottomCenter"]
            }}
            onChange={handleChange}
            scroll={{ x: true }}
            tableLayout={"auto"}
          />
        </GRView>
      </GRContainerView>
    </>
  );
};

export default AttendanceManagementPage;
