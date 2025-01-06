import GRTab from "@component/atom/GRTab";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import HeaderView from "@component/molecule/view/HeaderView";
import NewfamilyInfoTable from "@component/pages/department/newfamily/management/NewfamilyInfoTable";
import NewfamilyLineOutTable from "@component/pages/department/newfamily/management/NewfamilyLineOutTable";
import NewfamilyPromotedTable from "@component/pages/department/newfamily/management/NewfamilyPromotedTable";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lineInNewfamily } from "api/newfamily";
import { tLineOutNewFamily } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { handleError } from "utils/error";

const NEW_FAMILY_INFO = "info";
const NEW_FAMILY_PROMOTED = "promoted";
const NEW_FAMILY_LINE_OUT = "line_out";
const option = [
  { label: "명단", value: NEW_FAMILY_INFO },
  { label: "등반자", value: NEW_FAMILY_PROMOTED },
  { label: "라인아웃", value: NEW_FAMILY_LINE_OUT }
];

const NewfamilyManagementPage: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isOpenLineInModal, setIsOpenLineInModal] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [tabValue, setTabValue] = useState<string>(NEW_FAMILY_INFO);

  const [selectedLineOutNewFamily, setSelectedLineOutNewFamily] =
    useState<tLineOutNewFamily>();

  const onChangeTab = (value: string) => {
    setSearchName("");
    setTabValue(value);
  };

  const { mutateAsync: LineinMutateAsync } = useMutation({
    mutationFn: lineInNewfamily,
    onError: error => {
      handleError(error, "복귀 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.NEW_FAMILY]
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.NEW_FAMILY_LINE_OUT]
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.NEW_FAMILY_ATTENDANCE]
      });
      setIsOpenLineInModal(false);
      GRAlert.success("복귀 완료");
    }
  });

  const onClickCreateNewFamily = () => {
    router.push("/department/newfamily/management/create");
  };

  const onChangeSearch = (_text: string) => {
    setSearchName(_text);
  };

  const onClickLineIn = async () => {
    if (!selectedLineOutNewFamily) {
      return GRAlert.error("선택된 이탈자가 없습니다");
    }
    setIsOpenLineInModal(true);
  };

  const onOkLineInClickButton = async () => {
    const _newFamilyId = selectedLineOutNewFamily?.lineOutNewFamilyId;
    if (_newFamilyId) await LineinMutateAsync(_newFamilyId);
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
        headerComponent={
          <GRTextButton
            onClick={onClickCreateNewFamily}
            buttonType={"primary"}
            size={"large"}
          >
            새가족 등록
          </GRTextButton>
        }
      />
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
            {tabValue === NEW_FAMILY_LINE_OUT && (
              <GRTextButton onClick={onClickLineIn} buttonType={"custom"}>
                복귀
              </GRTextButton>
            )}
          </GRFlexView>
          {/* 인포 탭 */}
          {tabValue === NEW_FAMILY_INFO && (
            <NewfamilyInfoTable searchName={searchName} />
          )}
          {/* 등반자 탭 */}
          {tabValue === NEW_FAMILY_PROMOTED && (
            <NewfamilyPromotedTable searchName={searchName} />
          )}
          {/* 라인 아웃 탭 */}
          {tabValue === NEW_FAMILY_LINE_OUT && (
            <NewfamilyLineOutTable
              searchName={searchName}
              onSelectLineOut={onSelectLineOut}
            />
          )}
        </GRFlexView>
      </NewfamilyContainerView>
      {/* 복귀 모달 */}
      <GRAlertModal
        open={isOpenLineInModal}
        description={`${selectedLineOutNewFamily?.name}을 복귀 하시겠습니까?`}
        onCancelClickButton={() => setIsOpenLineInModal(false)}
        onOkClickButton={onOkLineInClickButton}
      />
    </>
  );
};

export default NewfamilyManagementPage;

const NewfamilyContainerView = styled.div`
  background-color: ${Color.white};
  padding: 0.5rem 3rem 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  margin-bottom: 0.5rem;
`;
