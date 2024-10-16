import GRTab from "@component/atom/GRTab";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import HeaderView from "@component/molecule/view/HeaderView";
import NewfamilyAttendanceCheckTable from "@component/pages/department/newfamily/attendance/NewfamilyAttendanceCheckTable";
import NewfamilyAttendanceTable from "@component/pages/department/newfamily/attendance/NewfamilyAttendanceTable";
import NewfamilyLineUpTable from "@component/pages/department/newfamily/attendance/NewfamilyLineUpTable";
import { NewFamilyPromoteModal } from "@component/pages/department/newfamily/attendance/modal/NewfamilyPromoteModal";
import styled from "@emotion/styled";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNewfamiliesAttendances,
  lineOutNewfamily,
  requestLineUpNewfamily
} from "api/newfamily";
import { tNewfamily, tNewfamilyAttendances } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import dayjs, { Dayjs } from "dayjs";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { NextPage } from "next";
import { useMemo, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { handleError } from "utils/error";

const NEW_FAMILY_ATTENDANCE = "attendance";
const NEW_FAMILY_ATTENDANCE_CHECK = "attendance_check";
const NEW_FAMILY_LINE_UP = "line_up";
const option = [
  { label: "출석 현황", value: NEW_FAMILY_ATTENDANCE },
  { label: "출석 체크", value: NEW_FAMILY_ATTENDANCE_CHECK },
  { label: "라인업 및 등반", value: NEW_FAMILY_LINE_UP }
];

const NewfamilyAttendancePage: NextPage = () => {
  const queryClient = useQueryClient();

  const [isOpenLineupRequestModal, setIsOpenLineupRequestModal] =
    useState(false);
  const [isOpenPromoteModal, setIsOpenPromoteModal] = useState(false);
  const [isOpenLineOutModal, setIsOpenLineOutModal] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [tabValue, setTabValue] = useState<string>(NEW_FAMILY_ATTENDANCE);

  const [selectedNewFamily, setSelectedNewFamily] = useState<tNewfamily[]>([]);

  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());

  const [newfamilyGroupAttendanceData, setNewfamilyGroupAttendanceData] =
    useState<tNewfamilyAttendances[]>([]);
  const [currentGroupId, setCurrentGroupId] = useState<string>("0");

  const { currentTermNewFamilyLeaderOptions } = useCurrentTerm();
  const newfamilyLeaderTabOption = useMemo(
    () => [{ label: "전체", value: "0" }, ...currentTermNewFamilyLeaderOptions],
    [currentTermNewFamilyLeaderOptions]
  );

  const onChangeTab = (value: string) => {
    resetSelection();
    setSearchName("");
    setFilterDate(dayjs().startOf("week"));
    setTabValue(value);
    setCurrentGroupId("0");
  };

  const { mutateAsync: lineUpRequestMutateAsync } = useMutation(
    requestLineUpNewfamily,
    {
      onError: error => {
        handleError(error, "라인업 요청 오류");
      },
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_UP_REQUEST]);
        setIsOpenLineupRequestModal(false);
        resetSelection();
        GRAlert.success("라인업 요청 완료");
      }
    }
  );

  const { mutateAsync: lineOutMutateAsync } = useMutation(lineOutNewfamily, {
    onError: error => {
      handleError(error, "라인아웃 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_UP_REQUEST]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_OUT]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_ATTENDANCE]);
      setIsOpenLineOutModal(false);
      GRAlert.success("라인아웃 완료");
    }
  });

  const onChangeSearch = (_text: string) => {
    setSearchName(_text);
  };

  const onChangeWeek = (_date: Dayjs | null) => {
    if (_date) {
      const lastSunday = dayjs(_date).startOf("week");
      setFilterDate(lastSunday);
    }
  };

  const onChangeLeaderTab = (_groupId: string) => {
    setCurrentGroupId(_groupId);
  };

  const onClickLineUpRequest = () => {
    if (selectedNewFamily.length === 0) {
      return GRAlert.error("선택된 새가족이 없습니다");
    }
    setIsOpenLineupRequestModal(true);
  };

  const onClickLineOut = () => {
    if (selectedNewFamily.length === 0) {
      return GRAlert.error("선택된 새가족이 없습니다");
    }
    setIsOpenLineOutModal(true);
  };

  const onClickPromote = () => {
    if (selectedNewFamily.length === 0) {
      return GRAlert.error("선택된 새가족이 없습니다");
    }
    setIsOpenPromoteModal(true);
  };

  const onOkLineUpRequestClickButton = async () => {
    const newFamilyIds = selectedNewFamily.map(item => item.newFamilyId);
    await lineUpRequestMutateAsync({ newFamilyIds });
  };

  const onOkLineOutClickButton = async () => {
    const newFamilyIds = selectedNewFamily.map(item => item.newFamilyId);
    await lineOutMutateAsync({ newFamilyIds });
  };

  const onSelectChange = (_: React.Key[], selectedRows: any[]) => {
    setSelectedNewFamily(selectedRows);
  };

  const resetSelection = () => {
    setSelectedNewFamily([]);
  };

  const { data: newFamilyGroupAttendanceData } = useQuery(
    [queryKeys.NEW_FAMILY_ATTENDANCE, currentGroupId],
    async () => {
      if (currentGroupId === "0") {
        return await getNewfamiliesAttendances();
      }
      return await getNewfamiliesAttendances({
        newFamilyGroupId: Number(currentGroupId)
      });
    },
    {
      select: _data => _data.content,
      onSuccess: data => setNewfamilyGroupAttendanceData(data)
    }
  );

  return (
    <>
      <HeaderView title={"새가족 출석"} />
      <NewfamilyContainerView>
        <GRTab items={option} onChange={onChangeTab} />
        <GRFlexView style={{ width: "100%", overflowX: "auto" }}>
          <GRFlexView
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            marginbottom={GRStylesConfig.BASE_MARGIN}
          >
            <GRView marginright={GRStylesConfig.BASE_MARGIN}>
              <GRTextInput
                type={"input"}
                placeholder={"이름으로 검색하세요"}
                onChange={onChangeSearch}
                value={searchName}
              />
            </GRView>
            {tabValue === NEW_FAMILY_ATTENDANCE && (
              <GRFlexView flexDirection={"row"} justifyContent={"end"}>
                <GRView marginright={GRStylesConfig.BASE_MARGIN}>
                  <GRTextButton
                    onClick={onClickLineUpRequest}
                    buttonType={"custom"}
                  >
                    라인업 요청
                  </GRTextButton>
                </GRView>
                <GRView>
                  <GRTextButton onClick={onClickLineOut} buttonType={"custom"}>
                    라인 아웃
                  </GRTextButton>
                </GRView>
              </GRFlexView>
            )}
            {tabValue === NEW_FAMILY_LINE_UP && (
              <GRFlexView flexDirection={"row"} justifyContent={"end"}>
                <GRView marginright={GRStylesConfig.BASE_MARGIN}>
                  <GRTextButton onClick={onClickPromote} buttonType={"custom"}>
                    등반
                  </GRTextButton>
                </GRView>
                <GRView>
                  <GRTextButton onClick={onClickLineOut} buttonType={"custom"}>
                    라인 아웃
                  </GRTextButton>
                </GRView>
              </GRFlexView>
            )}
            {tabValue === NEW_FAMILY_ATTENDANCE_CHECK && (
              <GRDatePicker
                pickerType={"basic"}
                picker={"week"}
                defaultValue={filterDate}
                onChange={onChangeWeek}
              />
            )}
          </GRFlexView>
          {/* 출석 현황 탭 */}
          {tabValue === NEW_FAMILY_ATTENDANCE && (
            <NewfamilyAttendanceTable
              searchName={searchName}
              selectedNewFamily={selectedNewFamily}
              onSelect={onSelectChange}
              tabProps={{
                newfamilyGroupAttendanceData,
                newfamilyLeaderTabOption,
                onChangeLeaderTab
              }}
            />
          )}
          {/* 출석 체크 탭 */}
          {tabValue === NEW_FAMILY_ATTENDANCE_CHECK && (
            <NewfamilyAttendanceCheckTable
              searchName={searchName}
              filterDate={filterDate}
              tabProps={{
                newfamilyGroupAttendanceData,
                newfamilyLeaderTabOption,
                onChangeLeaderTab
              }}
            />
          )}
          {/* 라인업 요청 탭 */}
          {tabValue === NEW_FAMILY_LINE_UP && (
            <NewfamilyLineUpTable
              searchName={searchName}
              selectedNewFamily={selectedNewFamily}
              onSelect={onSelectChange}
            />
          )}
        </GRFlexView>
      </NewfamilyContainerView>
      {/* 라인업 요청 모달 */}
      {isOpenLineupRequestModal && (
        <GRAlertModal
          open={isOpenLineupRequestModal}
          description={`${selectedNewFamily.length} 명을 라인업 요청 하시겠습니까?`}
          onCancelClickButton={() => setIsOpenLineupRequestModal(false)}
          onOkClickButton={onOkLineUpRequestClickButton}
          subComponent={
            <GRText>
              {selectedNewFamily.map(family => family.name).join(",")}
            </GRText>
          }
        />
      )}
      {/* 등반 모달 */}
      {isOpenPromoteModal && (
        <NewFamilyPromoteModal
          open={isOpenPromoteModal}
          onClickClose={() => setIsOpenPromoteModal(false)}
          selectedNewFamily={selectedNewFamily}
        />
      )}
      {/* 라인 아웃 모달 */}
      {isOpenLineOutModal && (
        <GRAlertModal
          open={isOpenLineOutModal}
          description={`${selectedNewFamily.length} 명을 라인 아웃 하시겠습니까?`}
          onCancelClickButton={() => setIsOpenLineOutModal(false)}
          onOkClickButton={onOkLineOutClickButton}
          subComponent={
            <GRText>
              {selectedNewFamily.map(family => family.name).join(",")}
            </GRText>
          }
        />
      )}
    </>
  );
};

export default NewfamilyAttendancePage;

const NewfamilyContainerView = styled.div`
  background-color: ${Color.white};
  padding: 0.5rem 3rem 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  margin-bottom: 0.5rem;
`;
