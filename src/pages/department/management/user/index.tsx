import GRTab from "@component/atom/GRTab";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import HeaderView from "@component/molecule/view/HeaderView";
import UserDispatchTable from "@component/pages/department/management/user/UserDispatchTable";
import UserGraduateTable from "@component/pages/department/management/user/UserGraduateTable";
import UserLineOutTable from "@component/pages/department/management/user/UserLineOutTable";
import UserListInfoTable from "@component/pages/department/management/user/UserListInfoTable";
import UserTermInfoBox from '@component/pages/department/management/user/UserTermInfoBox';
import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import { tUser } from "api/account/types";
import { tDispatchedUser, tLineOutUser } from "api/management/user/type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
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
  const queryClient = useQueryClient();

  const [isOpenDispatchModal, setIsOpenDispatchModal] = useState(false);
  const [isOpenGraduateModal, setIsOpenGraduateModal] = useState(false);
  const [isOpenComebackModal, setIsOpenComebackModal] = useState(false);
  const [isOpenLineOutModal, setIsOpenLineOutModal] = useState(false);
  const [isOpenLineInModal, setIsOpenLineInModal] = useState(false);
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

  const onClickCreateUser = () => {
    router.push("/department/management/user/create");
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

  const onOkDispatchClickButton = async () => {
    const userIds = selectedUser.map(item => item.userId);
    // if (_userIds) await LineinMutateAsync(_userIds);
  };

  const onOkComebackClickButton = async () => {
    const _userId = selectedDispatchedUser?.dispatchedUserId;
    // if (_userIds) await LineinMutateAsync(_userIds);
  };

  const onOkGraduateClickButton = async () => {
    const userIds = selectedUser.map(item => item.userId);
    // if (_userIds) await LineinMutateAsync(_userIds);
  };

  const onOkLineOutClickButton = async () => {
    const userIds = selectedUser.map(item => item.userId);
    // await lineOutMutateAsync({ userIds });
  };

  const onOkLineInClickButton = async () => {
    const _userId = selectedLineOutUser?.lineOutUserId;
    // if (_userId) await LineinMutateAsync(_userId);
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
          {tabValue === USER_DISPATCH && (
            <UserDispatchTable
              searchName={searchName}
              onSelect={onSelectDispatchedUser}
            />
          )}
          {tabValue === USER_GRADUATE && (
            <UserGraduateTable searchName={searchName} />
          )}
          {tabValue === USER_LINE_OUT && (
            <UserLineOutTable
              searchName={searchName}
              onSelect={onSelectLineOutUser}
            />
          )}
          {tabValue === USER_TERM_INFO && (
            <UserTermInfoBox/>
          )}
        </GRFlexView>
      </UserContainerView>
      {/* 파송 요청 모달 */}
      {isOpenDispatchModal && (
        <div>
          파송 요청 모달
          <button onClick={() => setIsOpenDispatchModal(false)}>취소</button>
        </div>
        // <GRAlertModal
        //   open={isOpenDispatchModal}
        //   description={`${selectedUser.length} 명을 라인업 요청 하시겠습니까?`}
        //   onCancelClickButton={() => setIsOpenDispatchModal(false)}
        //   onOkClickButton={onOkDispatchClickButton}
        //   subComponent={
        //     <GRText>{selectedUser.map(user => user.name).join(",")}</GRText>
        //   }
        // />
      )}
      {/* 파송 복귀 모달 */}
      {isOpenComebackModal && (
        <GRAlertModal
          open={isOpenComebackModal}
          description={`${selectedDispatchedUser?.name}을 파송 복귀 하시겠습니까?`}
          onCancelClickButton={() => setIsOpenComebackModal(false)}
          onOkClickButton={onOkComebackClickButton}
        />
      )}
      {/* 졸업 요청 모달 */}
      {isOpenGraduateModal && (
        <GRAlertModal
          open={isOpenGraduateModal}
          description={`${selectedUser.length} 명을 졸업 시키겠습니까?`}
          onCancelClickButton={() => setIsOpenGraduateModal(false)}
          onOkClickButton={onOkGraduateClickButton}
          subComponent={
            <GRText>{selectedUser.map(user => user.name).join(",")}</GRText>
          }
        />
      )}
      {/* 라인 아웃 모달 */}
      {isOpenLineOutModal && (
        <GRAlertModal
          open={isOpenLineOutModal}
          description={`${selectedUser.length} 명을 라인 아웃 하시겠습니까?`}
          onCancelClickButton={() => setIsOpenLineOutModal(false)}
          onOkClickButton={onOkLineOutClickButton}
          subComponent={
            <GRText>{selectedUser.map(user => user.name).join(",")}</GRText>
          }
        />
      )}
      {/* 라인인 모달 */}
      {isOpenLineInModal && (
        <GRAlertModal
          open={isOpenLineInModal}
          description={`${selectedLineOutUser?.name}을 복귀 하시겠습니까?`}
          onCancelClickButton={() => setIsOpenLineInModal(false)}
          onOkClickButton={onOkLineInClickButton}
        />
      )}
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
