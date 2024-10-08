import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRRadio from "@component/atom/dataEntry/GRRadio";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, RadioChangeEvent, TableColumnsType, Tooltip } from "antd";
import { tAttendanceStatus } from "api/attendance/type";
import {
  getNewfamiliesAttendances,
  postNewfamilyAttendanceCheck
} from "api/newfamily";
import {
  tAttendanceCheckItems,
  tNewfamilyAttendances
} from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { ATTENDANCE_CHECK_STATUS, SEX_NAME } from "config/const";
import { Dayjs } from "dayjs";
import { head } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_DATE_FORMAT } from "utils/DateUtils";
import { koreanSorter } from "utils/sorter";
import AttendanceCheckSubmitButton from "../AttendanceCheckSubmitButton";

const TOOLTIP_INFO = `* Tab: 이동 \n * Tab + Shift: 이전으로 이동 \n * 방향키: 선택 가능`;

type tNewfamilyAttendanceCheckTable = {
  searchName: string;
  filterDate: Dayjs;
};

const NewfamilyAttendanceCheckTable: React.FC<
  tNewfamilyAttendanceCheckTable
> = ({ searchName, filterDate }) => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [formResult, setFormResult] = useState<tNewfamilyAttendances[]>([]);
  const [isCompleteCheck, setIsCompleteCheck] = useState(false);

  const { mutateAsync: newfamilyAttendanceCheckMutate } = useMutation(
    postNewfamilyAttendanceCheck,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_ATTENDANCE]);
        GRAlert.success("출석체크 완료");
      }
    }
  );

  const { data: newFamilyAttendanceData } = useQuery(
    [queryKeys.NEW_FAMILY_ATTENDANCE],
    async () => await getNewfamiliesAttendances(),
    {
      select: _data => _data.content
    }
  );

  const insertDataInFormResult = useCallback(
    (_newFamilyId: number, key: string, value: any) => {
      const _formResult = formResult?.map(result => {
        if (_newFamilyId === result.newFamilyId) {
          return {
            ...result,
            attendanceCheckItems: {
              ...result.attendanceCheckItems,
              [key]: value
            }
          };
        }
        return result;
      });
      setFormResult(_formResult);
    },
    [formResult]
  );

  const onChangeAttendStatus = useCallback(
    (_newFamilyId: number, e: RadioChangeEvent) => {
      insertDataInFormResult(_newFamilyId, "status", e.target.value);
    },
    [insertDataInFormResult]
  );

  const onChangeAttendReason = useCallback(
    (_newFamilyId: number, e: string) => {
      insertDataInFormResult(_newFamilyId, "reason", e);
    },
    [insertDataInFormResult]
  );

  const columns: TableColumnsType<any> = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      minWidth: 53
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "5rem",
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
      sorter: (a, b) => a.grade - b.grade
    },
    {
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "6rem",
      sorter: (a, b) => {
        return koreanSorter(
          a.newFamilyGroupLeaderName,
          b.newFamilyGroupLeaderName
        );
      },
      minWidth: 53
    },
    {
      title: () => {
        return (
          <>
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
          </>
        );
      },
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, recode) => (
        <GRRadio
          options={ATTENDANCE_CHECK_STATUS}
          onChange={_status =>
            onChangeAttendStatus(recode.newFamilyId, _status)
          }
          value={recode.attendanceCheckItems?.status}
        />
      )
    },
    {
      title: "기타 사항",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      render: (_, recode) => (
        <GRView>
          <GRTextInput
            style={{
              height: "2.1rem"
            }}
            value={recode.attendanceCheckItems?.reason}
            type={"textarea"}
            onChange={_reason =>
              onChangeAttendReason(recode.newFamilyId, _reason)
            }
          />
        </GRView>
      )
    }
  ];

  // 검색 로직
  useEffect(() => {
    if (newFamilyAttendanceData?.length) {
      let _filterNewFamily = newFamilyAttendanceData;
      if (searchName) {
        _filterNewFamily = newFamilyAttendanceData.filter(newFamily => {
          return newFamily.name?.indexOf(searchName) !== -1;
        });
      }
      setFormResult(_filterNewFamily);
    } else {
      setFormResult([]);
    }
  }, [newFamilyAttendanceData, searchName]);

  const validateAttendanceCheck = () => {
    for (const item of formResult) {
      if (
        !item.attendanceCheckItems?.status ||
        item.attendanceCheckItems?.status === "NONE"
      ) {
        GRAlert.error(`${item.name}의 출석을 선택해주세요`);
        return false;
      }
    }
    return true;
  };

  const handleOnSubmitButton = async () => {
    if (!validateAttendanceCheck()) {
      return;
    }
    setIsLoading(true);
    const _formAttendanceCheckItems = formResult
      .map(item => item.attendanceCheckItems)
      .filter((item): item is tAttendanceCheckItems => item !== undefined);

    try {
      await newfamilyAttendanceCheckMutate({
        date: filterDate.format(DEFAULT_DATE_FORMAT),
        attendanceItems: _formAttendanceCheckItems
      });
    } catch (e: any) {
      GRAlert.error(`출석 체크 실패, 다시 시도해주세요 ${e?.message ?? ""}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  /** 아래는 선택한 날짜에 해당하는 데이터가 없을 경우 기본 셋팅, 있을 경우 form에 적용하는 로직 */
  useEffect(() => {
    if (!newFamilyAttendanceData) {
      return;
    }

    // 선택한 날짜에 해당하는 데이터 찾기
    const filterDateFormatted = filterDate.format(DEFAULT_DATE_FORMAT);
    const _selectDate = head(newFamilyAttendanceData)?.attendanceItems.filter(
      item => item.date === filterDateFormatted
    );

    // _selectDate가 없으면 기본 셋팅
    if (!_selectDate || _selectDate.length === 0) {
      const defaultFormResult = newFamilyAttendanceData.map(item => ({
        ...item,
        attendanceCheckItems: {
          newFamilyId: item.newFamilyId,
          status: "NONE" as tAttendanceStatus,
          reason: ""
        }
      }));

      setFormResult(defaultFormResult);
      return;
    } else if (_selectDate) {
      const updatedData = newFamilyAttendanceData.map(item => {
        // 각 item의 attendanceItems에서 업데이트 진행
        const matchingItem = item.attendanceItems.find(
          attendanceItem => attendanceItem.date === filterDateFormatted
        );

        if (!matchingItem) {
          return item; // matchingItem이 없으면 기존 item 반환
        }

        // matchingItem이 존재하면 attendanceCheckItems 업데이트
        return {
          ...item,
          attendanceCheckItems: {
            newFamilyId: item.newFamilyId,
            status: matchingItem.status,
            reason: matchingItem.reason
          }
        };
      });

      setFormResult(updatedData); // 업데이트된 데이터로 상태 설정
    }
  }, [newFamilyAttendanceData, filterDate]);

  // button diabled 변수 설정
  useEffect(() => {
    if (formResult.length) {
      const checkFinish = formResult.filter(
        form => form.attendanceCheckItems?.status === "NONE"
      );
      setIsCompleteCheck(checkFinish.length === 0);
    }
  }, [formResult]);

  return (
    <>
      <GRTable
        isLoading={isLoading}
        rowKey={"newFamilyId"}
        columns={columns}
        data={formResult}
        pagination={{
          total: formResult?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
        scroll={{ x: true }}
        tableLayout={"auto"}
      />
      <AttendanceCheckSubmitButton
        onSubmit={handleOnSubmitButton}
        disabled={!isCompleteCheck}
      />
    </>
  );
};

export default NewfamilyAttendanceCheckTable;
