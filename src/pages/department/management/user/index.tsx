import GRTab from "@component/atom/GRTab";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import HeaderView from "@component/molecule/view/HeaderView";
import UserDispatchTable from "@component/pages/department/management/user/UserDispatchTable";
import UserGraduateTable from "@component/pages/department/management/user/UserGraduateTable";
import UserLineOutTable from "@component/pages/department/management/user/UserLineOutTable";
import UserListInfoTable from "@component/pages/department/management/user/UserListInfoTable";
import UserTermInfoBox from "@component/pages/department/management/user/UserTermInfoBox";
import UserDetailModal from "@component/pages/department/management/user/modal/UserDetailModal";
import UserDispatchModal from "@component/pages/department/management/user/modal/UserDispatchModal";
import UserGraduateModal from "@component/pages/department/management/user/modal/UserGraduateModal";
import UserLineOutModal from "@component/pages/department/management/user/modal/UserLineOutModal";
import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import { tUser } from "api/account/types";
import useComebackMutate from "api/management/user/mutate/useComebackMutate";
import useLineInMutate from "api/management/user/mutate/useLineInMutate";
import { tDispatchedUser, tLineOutUser } from "api/management/user/type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

const USER_LIST_INFO = "list_info";
const USER_DISPATCH = "dispatch";
const USER_GRADUATE = "graduate";
const USER_LINE_OUT = "line_out";
const USER_TERM_INFO = "term_info";
const option = [
  { label: "명단", value: USER_LIST_INFO },
  { label: "파송자", value: USER_DISPATCH },
  { label: "졸업자", value: USER_GRADUATE },
  { label: "라인아웃", value: USER_LINE_OUT },
  { label: "정보", value: USER_TERM_INFO }
];

const ManagementUserPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const queryClient = useQueryClient();

  const [isOpenDispatchModal, setIsOpenDispatchModal] = useState(false);
  const [isOpenGraduateModal, setIsOpenGraduateModal] = useState(false);
  const [isOpenComebackModal, setIsOpenComebackModal] = useState(false);
  const [isOpenLineOutModal, setIsOpenLineOutModal] = useState(false);
  const [isOpenLineInModal, setIsOpenLineInModal] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [tabValue, setTabValue] = useState<string>(USER_LIST_INFO);
  const [selectedUser, setSelectedUser] = useState<tUser[]>([]);

  const [selectedLineOutUser, setSelectedLineOutUser] =
    useState<tLineOutUser>();
  const [selectedDispatchedUser, setSelectedDispatchedUser] =
    useState<tDispatchedUser>();

  const onChangeTab = (value: string) => {
    setSearchName("");
    setTabValue(value);
    resetSelection();
  };

  const { lineInMutate } = useLineInMutate(() => setIsOpenLineInModal(false));
  const { comebackMutate } = useComebackMutate(() =>
    setIsOpenComebackModal(false)
  );

  const onClickCreateUser = () => {
    setIsOpenDetailModal(true);
  };

  const onChangeSearch = (_text: string) => {
    setSearchName(_text);
  };

  const onClickDispatch = () => {
    if (selectedUser.length === 0) {
      return GRAlert.error("선택된 지체가 없습니다");
    }
    setIsOpenDispatchModal(true);
  };

  const onClickComeback = () => {
    if (!selectedDispatchedUser) {
      return GRAlert.error("선택된 파송자가 없습니다");
    }
    setIsOpenComebackModal(true);
  };

  const onClickGraduate = () => {
    if (selectedUser.length === 0) {
      return GRAlert.error("선택된 지체가 없습니다");
    }
    setIsOpenGraduateModal(true);
  };

  const onClickLineOut = () => {
    if (selectedUser.length === 0) {
      return GRAlert.error("선택된 지체가 없습니다");
    }
    setIsOpenLineOutModal(true);
  };

  const onClickLineIn = async () => {
    if (!selectedLineOutUser) {
      return GRAlert.error("선택된 이탈자가 없습니다");
    }
    setIsOpenLineInModal(true);
  };

  const onOkComebackClickButton = async () => {
    const _userId = selectedDispatchedUser?.dispatchedUserId;
    if (_userId) await comebackMutate(_userId);
  };

  const onOkLineInClickButton = async () => {
    const _userId = selectedLineOutUser?.lineOutUserId;
    if (_userId) await lineInMutate(_userId);
  };

  const onSelectChange = (_: React.Key[], selectedRows: any[]) => {
    setSelectedUser(selectedRows);
  };

  const onSelectLineOutUser = (_: React.Key[], selectedRows: any[]) => {
    if (selectedRows.length !== 0) {
      setSelectedLineOutUser(selectedRows[0]);
    }
  };

  const onSelectDispatchedUser = (_: React.Key[], selectedRows: any[]) => {
    if (selectedRows.length !== 0) {
      setSelectedDispatchedUser(selectedRows[0]);
    }
  };

  const resetSelection = () => {
    setSelectedUser([]);
  };

  const closeDetailModal = () => {
    router.push("/department/management/user");
    setIsOpenDetailModal(false);
  };

  useEffect(() => {
    if (!userId) return;
    setIsOpenDetailModal(true);
  }, [userId]);

  return (
    <>
      <HeaderView
        title={"지체 관리"}
        headerComponent={
          <GRTextButton
            onClick={onClickCreateUser}
            buttonType={"primary"}
            size={"large"}
          >
            지체 등록
          </GRTextButton>
        }
      />
      <UserContainerView>
        <GRTab items={option} onChange={onChangeTab} />
        <GRFlexView style={{ width: "100%", overflowX: "auto" }}>
          <GRFlexView
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            marginbottom={GRStylesConfig.BASE_MARGIN}
          >
            {tabValue !== USER_TERM_INFO && (
              <GRView marginright={GRStylesConfig.BASE_MARGIN}>
                <GRTextInput
                  type={"input"}
                  placeholder={"이름으로 검색하세요"}
                  onChange={onChangeSearch}
                  value={searchName}
                />
              </GRView>
            )}

            {tabValue === USER_LIST_INFO && (
              <GRFlexView
                flexDirection={"row"}
                justifyContent={"end"}
                xGap={GRStylesConfig.BASE_MARGIN}
              >
                <GRTextButton onClick={onClickDispatch} buttonType={"custom"}>
                  파송
                </GRTextButton>
                <GRTextButton onClick={onClickGraduate} buttonType={"custom"}>
                  졸업
                </GRTextButton>
                <GRTextButton onClick={onClickLineOut} buttonType={"warning"}>
                  라인 아웃
                </GRTextButton>
              </GRFlexView>
            )}
            {tabValue === USER_DISPATCH && (
              <GRTextButton onClick={onClickComeback} buttonType={"custom"}>
                파송 복귀
              </GRTextButton>
            )}
            {tabValue === USER_LINE_OUT && (
              <GRTextButton onClick={onClickLineIn} buttonType={"custom"}>
                복귀
              </GRTextButton>
            )}
          </GRFlexView>
          {/* 인포 탭 */}
          {tabValue === USER_LIST_INFO && (
            <UserListInfoTable
              searchName={searchName}
              onSelect={onSelectChange}
              selectedUser={selectedUser}
            />
          )}
          {/* 파송자 탭 */}
          {tabValue === USER_DISPATCH && (
            <UserDispatchTable
              searchName={searchName}
              onSelect={onSelectDispatchedUser}
            />
          )}
          {/* 졸업 탭 */}
          {tabValue === USER_GRADUATE && (
            <UserGraduateTable searchName={searchName} />
          )}
          {/* 라인아웃 탭 */}
          {tabValue === USER_LINE_OUT && (
            <UserLineOutTable
              searchName={searchName}
              onSelect={onSelectLineOutUser}
            />
          )}
          {/* 정보 탭 */}
          {tabValue === USER_TERM_INFO && <UserTermInfoBox />}
        </GRFlexView>
      </UserContainerView>
      {/* 파송 요청 모달 */}
      <UserDispatchModal
        open={isOpenDispatchModal}
        selectedUser={selectedUser}
        onClickClose={() => setIsOpenDispatchModal(false)}
        resetSelection={resetSelection}
      />
      {/* 파송 복귀 모달 */}
      <GRAlertModal
        open={isOpenComebackModal}
        description={`${selectedDispatchedUser?.name}을 파송 복귀 하시겠습니까?`}
        onCancelClickButton={() => setIsOpenComebackModal(false)}
        onOkClickButton={onOkComebackClickButton}
      />
      {/* 졸업 요청 모달 */}
      <UserGraduateModal
        open={isOpenGraduateModal}
        selectedUser={selectedUser}
        onClickClose={() => setIsOpenGraduateModal(false)}
      />
      {/* 라인 아웃 모달 */}
      <UserLineOutModal
        open={isOpenLineOutModal}
        selectedUser={selectedUser}
        onClickClose={() => setIsOpenLineOutModal(false)}
      />
      {/* 라인인 모달 */}
      <GRAlertModal
        open={isOpenLineInModal}
        description={`${selectedLineOutUser?.name}을 복귀 하시겠습니까?`}
        onCancelClickButton={() => setIsOpenLineInModal(false)}
        onOkClickButton={onOkLineInClickButton}
      />
      {/* 유저 생성 , 수정 모달 */}
      <UserDetailModal
        open={isOpenDetailModal}
        onClickClose={closeDetailModal}
      />
    </>
  );
};

const UserContainerView = styled.div`
  background-color: ${Color.white};
  padding: 0.5rem 3rem 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  margin-bottom: 0.5rem;
`;

export default ManagementUserPage;
