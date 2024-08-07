import GRTab from "@component/atom/GRTab";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";

import HeaderView from "@component/molecule/view/HeaderView";
import { NewFamilyAttendanceTable } from "@component/pages/department/management/newfamily/NewFamilyAttendanceTable";
import { NewFamilyLineOutTable } from "@component/pages/department/management/newfamily/NewFamilyLineOutTable";
import { NewFamilyLineUpModal } from "@component/pages/department/management/newfamily/NewFamilyLineUpModal";
import { NewFamilyTable } from "@component/pages/department/management/newfamily/NewFamilyTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queryKeys";
import { lineOutNewFamily, lineOutRollBackNewFamily } from "apiV2/newFamily";
import { tLineOutNewFamilyV2, tNewFamilyV2 } from "apiV2/newFamily/type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const NEW_FAMILY = "all";
const NEW_FAMILY_ATTEND = "attend";
const NEW_FAMILY_LINE_OUT = "line_out";
const option = [
  { label: "새가족", value: NEW_FAMILY },
  { label: "출석", value: NEW_FAMILY_ATTEND },
  { label: "라인아웃", value: NEW_FAMILY_LINE_OUT }
];

const ManagementNewFamilyPage: NextPage = () => {
  const queryClient = useQueryClient();

  const [tabValue, setTabValue] = useState(NEW_FAMILY);
  const [isOpenLineupModal, setIsOpenLineupModal] = useState(false);
  const [isOpenLineOutModal, setIsOpenLineOutModal] = useState(false);
  const [isOpenRollBackModal, setIsOpenRollBackModal] = useState(false);

  const [searchName, setSearchName] = useState("");

  const [selectedNewFamily, setSelectedNewFamily] = useState<tNewFamilyV2[]>(
    []
  );
  const [selectedLineOutNewFamily, setSelectedLineOutNewFamily] =
    useState<tLineOutNewFamilyV2>();

  const router = useRouter();

  /** 라인 아웃 mutate */
  const { mutateAsync: lineOutNewFamilyMutateAsync } = useMutation(
    lineOutNewFamily,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_V2]);
        setIsOpenLineOutModal(false);
      }
    }
  );

  /** 복귀 mutate */
  const { mutateAsync: lineOutRollBackNewFamilyMutateAsync } = useMutation(
    lineOutRollBackNewFamily,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_OUT_V2]);
        setIsOpenRollBackModal(false);
      }
    }
  );

  const onClickCreateNewFamilyModal = async () => {
    await router.push("/department/management/newfamily/create");
  };

  const onChangeTab = (value: string) => {
    setSelectedNewFamily([]);
    setSearchName("");
    setTabValue(value);
  };

  const onClickLineOut = () => {
    if (!selectedNewFamily.length) {
      return alert("선택된 새가족이 없습니다.");
    }
    setIsOpenLineOutModal(true);
  };

  const onClickRollback = () => {
    if (!selectedLineOutNewFamily) {
      return alert("선택된 이탈자가 없습니다.");
    }
    setIsOpenRollBackModal(true);
  };

  const onClickLineUp = () => {
    setIsOpenLineupModal(true);
  };

  const onChangeSearch = (_text: string) => {
    setSearchName(_text);
  };

  const onClickClose = () => {
    setIsOpenLineupModal(false);
  };

  const onOkLineOutClickButton = async () => {
    if (selectedNewFamily.length === 0) {
      return alert("선택된 새가족이 없습니다");
    }
    await Promise.all(
      selectedNewFamily.map(
        async family => await lineOutNewFamilyMutateAsync(family.newFamilyId)
      )
    );
  };

  const onOkRollBackClickButton = async () => {
    if (!selectedLineOutNewFamily) {
      return alert("선택된 이탈자가 없습니다");
    }
    await lineOutRollBackNewFamilyMutateAsync({
      lineOutNewFamilyId: selectedLineOutNewFamily.lineOutNewFamilyId,
      data: { newFamilyGroupId: 1 }
    });
  };

  const onSelectChange = (_: React.Key[], selectedRows: any[]) => {
    setSelectedNewFamily(selectedRows);
  };

  const onSelectLineOut = (_: React.Key[], selectedRows: any[]) => {
    if (selectedRows.length !== 0) {
      setSelectedLineOutNewFamily(selectedRows[0]);
    }
  };

  return (
    <>
      <HeaderView
        title={"새가족 관리"}
        showIcon={false}
        headerComponent={
          <GRButtonText
            onClick={onClickCreateNewFamilyModal}
            buttonType={"default"}
            size={"large"}
          >
            지체 등록
          </GRButtonText>
        }
      />
      <GRContainerView>
        <GRTab items={option} onChange={onChangeTab} />
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
          {(tabValue == NEW_FAMILY || tabValue == NEW_FAMILY_ATTEND) && (
            <GRFlexView flexDirection={"row"} justifyContent={"end"}>
              <GRView marginright={GRStylesConfig.BASE_MARGIN}>
                <GRButtonText onClick={onClickLineOut} buttonType={"custom"}>
                  라인 아웃
                </GRButtonText>
              </GRView>
              <GRView>
                <GRButtonText onClick={onClickLineUp} buttonType={"primary"}>
                  라인업
                </GRButtonText>
              </GRView>
            </GRFlexView>
          )}
          {tabValue === NEW_FAMILY_LINE_OUT && (
            <GRButtonText
              onClick={onClickRollback}
              buttonType={"custom"}
              size={"small"}
            >
              복귀
            </GRButtonText>
          )}
        </GRFlexView>
        {/* 새가족 탭 */}
        {tabValue === NEW_FAMILY && (
          <NewFamilyTable
            selectedNewFamily={selectedNewFamily}
            onSelect={onSelectChange}
            searchName={searchName}
          />
        )}
        {/* 출석 탭 */}
        {tabValue === NEW_FAMILY_ATTEND && (
          <NewFamilyAttendanceTable
            selectedNewFamily={selectedNewFamily}
            onSelect={onSelectChange}
            searchName={searchName}
          />
        )}
        {/* 라인 아웃 탭 */}
        {tabValue === NEW_FAMILY_LINE_OUT && (
          <NewFamilyLineOutTable onSelectLineOut={onSelectLineOut} searchName={searchName}/>
        )}
      </GRContainerView>
      {isOpenLineupModal && (
        <NewFamilyLineUpModal
          open={isOpenLineupModal}
          onClickClose={onClickClose}
          selectNewFamily={selectedNewFamily}
        />
      )}
      {/* 라인아웃 모달 */}
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
      {/* 복귀 모달 */}
      {isOpenRollBackModal && (
        <GRAlertModal
          open={isOpenRollBackModal}
          description={`${selectedLineOutNewFamily?.name}을 복귀 하시겠습니까?`}
          onCancelClickButton={() => setIsOpenRollBackModal(false)}
          onOkClickButton={onOkRollBackClickButton}
        />
      )}
    </>
  );
};

export default ManagementNewFamilyPage;
