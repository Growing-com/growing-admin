import GRTable from "@component/atom/GRTable";
import GRAlert from '@component/atom/alert/GRAlert';
import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from '@component/atom/view/GRView';
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import ColumAttendanceRender from "@component/molecule/table/ColumAttendanceRender";
import HeaderView from "@component/molecule/view/HeaderView";
import { Alert, TableColumnsType, Tooltip } from "antd";
import { useAttendanceRangeData } from "api/attendance/queries/useAttendanceRangeData";
import {
  tAttendanceData,
  tAttendanceItems,
  tAttendanceRangeData
} from "api/attendance/type";
import { SEX_NAME, TOOLTIP_INFO } from "config/const";
import dayjs from "dayjs";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import { head } from "lodash";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FORMAT } from "utils/DateUtils";

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

const AttendanceManagementPage: NextPage = () => {
  const [filter, setFilter] = useState<tAttendanceRangeData>();
  const [skeletonAttendanceData, setSkeletonAttendanceData] =
    useState<tAttendanceItems[]>();
  const [filteredData, setFilteredData] = useState<tAttendanceData[]>();

  const { data: attendanceList, isFetching } = useAttendanceRangeData(filter);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      rangeDate: [dayjs().subtract(1, "M"), dayjs()],
      searchName: ""
    }
  });

  const onSubmit = handleSubmit(_filter => {
    const { rangeDate, searchName } = _filter;

    if (!rangeDate) return GRAlert.error("검색 기간을 선택해주세요");

    setFilter({
      startDate: dayjs(rangeDate[0]).format(DEFAULT_DATE_FORMAT),
      endDate: dayjs(rangeDate[1]).format(DEFAULT_DATE_FORMAT)
    });
    
    // 이름 검색 로직
    let _filteredData = attendanceList
    if(searchName) {
      _filteredData = attendanceList?.filter(user => user.name?.indexOf(searchName) !== -1);
    }
    setFilteredData(_filteredData)
  });

  const onClickSearch = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  useKeyPressEventListener("Enter", () => {
    onSubmit();
  });

  useEffect(() => {
    if (attendanceList?.length === 0) return;
    setFilteredData(attendanceList);
  }, [attendanceList]);

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
      minWidth: 75
    },
    {
      title: "순장",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "5rem",
      minWidth: 75
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      minWidth: 75,
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
      minWidth: 60
    },
    {
      title: () => {
        return (
          <Tooltip
            overlayStyle={{ whiteSpace: "pre-line" }}
            title={TOOLTIP_INFO}
          >
            <GRFlexView alignItems={"center"}>
              <Alert
                showIcon
                message={
                  <GRText weight={"bold"} fontSize={"b7"}>
                    출석 날짜
                  </GRText>
                }
                type={"info"}
                banner={true}
                style={{ backgroundColor: "transparent" }}
              />
            </GRFlexView>
          </Tooltip>
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
            defaultPageSize: 10,
            position: ["bottomCenter"],
            hideOnSinglePage: true
          }}
          scroll={{ x: true }}
          tableLayout={"auto"}
        />
        </GRView>
      </GRContainerView>
    </>
  );
};

export default AttendanceManagementPage;
