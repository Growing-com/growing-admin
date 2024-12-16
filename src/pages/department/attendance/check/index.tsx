import GRTab from "@component/atom/GRTab";
import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import AttendanceCheckSubmitButton from "@component/pages/department/newfamily/AttendanceCheckSubmitButton";
import { Alert, TableColumnsType, Tooltip } from "antd";
import { RadioChangeEvent } from "antd/lib";
import useAttendanceCheckMutate from "api/attendance/mutate/useAttendanceCheckMutate";
import { useAttendanceCheckData } from "api/attendance/queries/useAttendanceCheckData";
import { tAttendanceCheckData } from "api/attendance/type";
import { ATTENDANCE_CHECK_STATUS, SEX_NAME, TOOLTIP_INFO } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useCurrentTermInfoOptionQueries } from "hooks/queries/term/useCurrentTermInfoOptionQueries";
import { head } from "lodash";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FORMAT } from "utils/DateUtils";

const AttendanceCheckPage: NextPage = () => {
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs().startOf("week"));
  const [currentLeaderTab, setCurrentLeaderTab] = useState<string>();

  const [checkData, setCheckData] = useState<tAttendanceCheckData[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleteCheck, setIsCompleteCheck] = useState(false);

  const {
    currentTermCodyOptions,
    leaderByCodyOptions,
    selectedCodyId,
    setSelectedCodyId
  } = useCurrentTermInfoOptionQueries();

  const { data: checkGroupData } = useAttendanceCheckData(
    filterDate.format(DEFAULT_DATE_FORMAT),
    selectedCodyId
  );

  const { currentTermId } = useCurrentTerm();
  const { groupUserAttendanceMutate } = useAttendanceCheckMutate();

  const insertDataInFormResult = (_userId: number, key: string, value: any) => {
    const _formResult = checkData?.map(result => {
      if (_userId !== result.userId) return result;

      return {
        ...result,
        attendItems: [
          {
            //[{}] 이렇게 오는데 {}로 올 수 있는지 확인해야됨
            ...result.attendItems[0],
            [key]: value
          }
        ]
        // * {} 올 경우
        // attendItems: {
        //     ...result.attendItems,
        //     [key]: value
        //   }
      };
    });
    setCheckData(_formResult);
  };

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      const lastSunday = dayjs(_date).startOf("week");
      setFilterDate(lastSunday);
    }
  };

  const onChangeTab = (_tabIndx: string) => {
    const leaderName = leaderByCodyOptions.find(
      leader => leader.value === _tabIndx
    )?.label;
    setCurrentLeaderTab(leaderName);
  };

  const onChangeAttendStatus = useCallback(
    (_userId: number, e: RadioChangeEvent) => {
      insertDataInFormResult(_userId, "status", e.target.value);
    },
    [insertDataInFormResult]
  );

  const onChangeAttendReason = useCallback(
    (_userId: number, e: string) => {
      insertDataInFormResult(_userId, "reason", e);
    },
    [insertDataInFormResult]
  );

  const validateAttendanceCheck = () => {
    if (!checkData) return;
    for (const item of checkData) {
      if (
        !item.attendItems[0].status ||
        item.attendItems[0].status === "NONE"
        // * {} 올 경우
        // !item.attendItems?.status ||
        // item.attendItems?.status === "NONE"
      ) {
        GRAlert.error(`${item.name}의 출석을 선택해주세요`);
        return false;
      }
    }
    return true;
  };

  const handleOnSubmitButton = async () => {
    if (!validateAttendanceCheck()) return;

    setIsLoading(true);
    const _formAttendanceCheckItems =
      checkData
        ?.map(item => ({
          userId: item.userId,
          status: item.attendItems[0].status,
          reason: item.attendItems[0].reason
          // * {} 올 경우
          // status: item.attendItems.status,
          // reason: item.attendItems.reason
        }))
        .filter(item => item !== undefined) ?? [];

    if (!currentTermId) return GRAlert.error("현재 텀 정보가 없습니다.");
    if (!selectedCodyId) return GRAlert.error("코디 아이디가 없습니다.");

    try {
      await groupUserAttendanceMutate({
        date: filterDate.format(DEFAULT_DATE_FORMAT),
        termId: currentTermId,
        codyId: selectedCodyId,
        attendanceItems: _formAttendanceCheckItems
      });
    } catch (e: any) {
      GRAlert.error(`출석 체크 실패, 다시 시도해주세요 ${e?.message ?? ""}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  // 처음 렌더링 때 탭 설정
  useEffect(() => {
    if (leaderByCodyOptions) {
      const leaderName = head(leaderByCodyOptions)?.label;
      setCurrentLeaderTab(leaderName);
    }
  }, [leaderByCodyOptions]);

  // 순장에 맞는 데이터만 보여줌
  useEffect(() => {
    let _findAttendance = checkGroupData;
    if (currentLeaderTab) {
      _findAttendance = checkGroupData?.filter(
        checkData => checkData.leaderName === currentLeaderTab
      );
    }
    setCheckData(_findAttendance);
  }, [checkGroupData, currentLeaderTab]);

  // button diabled 변수 설정
  useEffect(() => {
    if (checkData?.length) {
      const checkFinish = checkData.filter(
        form => form.attendItems[0].status === "NONE"
        // * {} 올 경우
        // form => form.attendItems?.status === "NONE"
      );
      setIsCompleteCheck(checkFinish.length === 0);
    }
  }, [checkData]);

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
                    출석
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
      dataIndex: "status",
      key: "status",
      align: "center",
      minWidth: 110,
      render: (_, recode) => (
        <GRRadio
          options={ATTENDANCE_CHECK_STATUS}
          onChange={_status => onChangeAttendStatus(recode.userId, _status)}
          // * {} 올 경우
          // value={recode.attendItems?.status}
          value={recode.attendItems[0].status}
        />
      )
    },
    {
      title: "기타 사항",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      minWidth: 110,
      render: (_, recode) => (
        <GRView>
          <GRTextInput
            style={{
              height: "2.1rem"
            }}
            type={"textarea"}
            value={recode.attendItems[0].reason}
            // * {} 올 경우
            // value={recode.attendItems?.reason}
            onChange={_reason => onChangeAttendReason(recode.userId, _reason)}
          />
        </GRView>
      )
    }
  ];

  return (
    <>
      <HeaderView title={"출석 체크"} />
      <GRContainerView>
        <GRFlexView margintop={GRStylesConfig.BASE_LONG_MARGIN}>
          <GRFlexView
            flexDirection={"row"}
            justifyContent={"end"}
            marginbottom={GRStylesConfig.BASE_MARGIN}
          >
            <GRSelect
              marginright={GRStylesConfig.BASE_MARGIN}
              style={{ width: "8rem" }}
              options={currentTermCodyOptions}
              onChange={setSelectedCodyId}
              value={selectedCodyId}
              placeholder={"나무 선택"}
            />
            <GRDatePicker
              pickerType={"basic"}
              picker={"week"}
              defaultValue={filterDate}
              onChange={onChangeWeek}
            />
          </GRFlexView>
          <GRFlexView>
            <GRTab items={leaderByCodyOptions} onChange={onChangeTab} />
            <GRTable
              isLoading={isLoading}
              rowKey={"userId"}
              columns={columns}
              data={checkData}
              pagination={{
                total: checkData?.length,
                defaultPageSize: 15,
                position: ["bottomCenter"],
                hideOnSinglePage: true
              }}
              scroll={{ x: true }}
              tableLayout={"auto"}
            />
            <AttendanceCheckSubmitButton
              onSubmit={handleOnSubmitButton}
              disabled={!isCompleteCheck}
            />
          </GRFlexView>
        </GRFlexView>
      </GRContainerView>
    </>
  );
};

export default AttendanceCheckPage;
