import GRAlert from "@component/atom/alert/GRAlert";
import GRButton from "@component/atom/button/GRButton";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import NewfamilyAttendanceTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyAttendanceTable";
import NewfamilyInfoTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyInfoTable";
import NewfamilyLineOutTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyLineOutTable";
import NewfamilyLineUpTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyLineUpTable";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Menu, MenuProps } from "antd";
import { useUserInfoQuery } from "api/account/queries/useUserInfoQuery";
import {
  lineInNewfamily,
  lineOutNewfamily,
  promoteNewfamily,
  requestLineUpNewfamily,
  tPromoteNewfamily
} from "api/newfamily";
import { tLineOutNewFamily, tNewfamily } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { handleError } from "utils/error";

type tTabItems = {
  key: string;
  label: ReactNode;
};

const tabItems: tTabItems[] = [
  {
    key: "newfamily-tab-info",
    label: <GRFlexView alignItems="center">명단</GRFlexView>
  },
  {
    key: "newfamily-tab-attendance",
    label: <GRFlexView alignItems="center">출석</GRFlexView>
  },
  {
    key: "newfamily-tab-lineUp",
    label: <GRFlexView alignItems="center">등반 라인업</GRFlexView>
  },
  {
    key: "newfamily-tab-lineOut",
    label: <GRFlexView alignItems="center">라인아웃</GRFlexView>
  }
];

const NEW_FAMILY_INFO = "newfamily-tab-info";
const NEW_FAMILY_ATTENDANCE = "newfamily-tab-attendance";
const NEW_FAMILY_LINEOUT = "newfamily-tab-lineOut";
const NEW_FAMILY_LINEUP = "newfamily-tab-lineUp";

const NewfamilyPage: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [searchName, setSearchName] = useState("");
  const [tabValue, setTabValue] = useState<string>(NEW_FAMILY_INFO);
  const [selectedNewFamily, setSelectedNewFamily] = useState<tNewfamily[]>([]);
  const [selectedLineOutNewFamily, setSelectedLineOutNewFamily] =
    useState<tLineOutNewFamily>();

  const { data: userInfo, refetch } = useUserInfoQuery();

  const { mutateAsync: lineUpRequestMutateAsync } = useMutation(
    requestLineUpNewfamily,
    {
      onError: error => {
        handleError(error, "라인업 요청 오류");
      },
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_UP_REQUEST]);
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
      GRAlert.success("라인아웃 완료");
    }
  });

  const { mutateAsync: promoteMutateAsync } = useMutation(promoteNewfamily, {
    onError: error => {
      handleError(error, "등반 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_UP_REQUEST]);
      // TODO: 출석 데이터 쿼리 삭제

      GRAlert.success("등반 완료");
    }
  });

  const { mutateAsync: LineinMutateAsync } = useMutation(lineInNewfamily, {
    onError: error => {
      handleError(error, "복귀 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_OUT]);
      GRAlert.success("복귀 완료");
    }
  });

  const onClickCreateNewFamily = () => {
    router.push("/department/newfamily/create");
  };

  const onClickTabMenu: MenuProps["onClick"] = e => {
    resetSelection();
    setSearchName("");
    setTabValue(e.key);
  };

  const onChangeSearch = (_text: string) => {
    setSearchName(_text);
  };

  const onClickLineUpRequest = async () => {
    if (selectedNewFamily.length === 0) {
      return GRAlert.error("선택된 새가족이 없습니다");
    }

    const newFamilyIds = selectedNewFamily.map(item => item.newFamilyId);
    await lineUpRequestMutateAsync({ newFamilyIds });
  };

  const onClickLineOut = async () => {
    if (selectedNewFamily.length === 0) {
      return GRAlert.error("선택된 새가족이 없습니다");
    }

    const newFamilyIds = selectedNewFamily.map(item => item.newFamilyId);
    await lineOutMutateAsync({ newFamilyIds });
  };

  const validatePromote = (selectedNewFamily: tNewfamily[]) => {
    selectedNewFamily.map(item => {
      const { name, smallGroupLeaderName, promoteDate } = item;
      console.log(name, smallGroupLeaderName, promoteDate);
      if (smallGroupLeaderName === null) {
        GRAlert.error(`${name}은 라인업이 되어야 합니다.`);
        return false;
      }
      if (promoteDate === undefined) {
        GRAlert.error(`${name}의 등반일을 선택해주세요.`);
        return false;
      }
    });

    return true;
  };

  const onClickPromote = () => {
    if (selectedNewFamily.length === 0) {
      return GRAlert.error("선택된 새가족이 없습니다");
    }

    console.log("등반");
    if (!validatePromote(selectedNewFamily)) {
      console.log("검증실패");
      return;
    }
    const newFamiliesData: tPromoteNewfamily[] = [];
    const newfamilyPromoteData = selectedNewFamily.map(
      ({ newFamilyId, promoteDate }) => ({ newFamilyId, promoteDate })
    );

    // promoteMutateAsync
  };

  const onClickLineIn = async () => {
    if (!selectedLineOutNewFamily) {
      return GRAlert.error("선택된 이탈자가 없습니다");
    }

    const _newFamilyId = selectedLineOutNewFamily?.lineOutNewFamilyId;
    if (_newFamilyId) await LineinMutateAsync(_newFamilyId);
  };

  const onSelectChange = (_: React.Key[], selectedRows: any[]) => {
    setSelectedNewFamily(selectedRows);
  };

  const onSelectLineOut = (_: React.Key[], selectedRows: any[]) => {
    if (selectedRows.length !== 0) {
      setSelectedLineOutNewFamily(selectedRows[0]);
    }
  };

  const resetSelection = () => {
    setSelectedNewFamily([]);
  };

  return (
    <>
      {/* <button onClick={() => console.log(userInfo)}>userInfo</button> */}
      <HeaderView
        title={"새가족 관리"}
        titleColor={Color.white}
        headerComponent={
          <GRButton
            onClick={onClickCreateNewFamily}
            buttonType={"default"}
            buttonSize={"large"}
          >
            등록
          </GRButton>
        }
      />
      <GRContainerView>
        <GRFlexView flexDirection={"row"}>
          <NewfamilyTabMenu
            items={tabItems}
            selectedKeys={[tabValue]}
            onClick={onClickTabMenu}
          />
          <GRFlexView paddingleft={3}>
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
              {tabValue == NEW_FAMILY_ATTENDANCE && (
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
                    <GRTextButton
                      onClick={onClickLineOut}
                      buttonType={"custom"}
                    >
                      라인 아웃
                    </GRTextButton>
                  </GRView>
                </GRFlexView>
              )}
              {tabValue === NEW_FAMILY_LINEUP && (
                <GRFlexView flexDirection={"row"} justifyContent={"end"}>
                  <GRView marginright={GRStylesConfig.BASE_MARGIN}>
                    <GRTextButton
                      onClick={onClickPromote}
                      buttonType={"custom"}
                    >
                      등반
                    </GRTextButton>
                  </GRView>
                  <GRView>
                    <GRTextButton
                      onClick={onClickLineOut}
                      buttonType={"custom"}
                    >
                      라인 아웃
                    </GRTextButton>
                  </GRView>
                </GRFlexView>
              )}
              {tabValue === NEW_FAMILY_LINEOUT && (
                <GRTextButton onClick={onClickLineIn} buttonType={"custom"}>
                  복귀
                </GRTextButton>
              )}
            </GRFlexView>
            {/* 인포 탭 */}
            {tabValue === NEW_FAMILY_INFO && (
              <NewfamilyInfoTable searchName={searchName} />
            )}
            {/* 출석 탭 */}
            {tabValue === NEW_FAMILY_ATTENDANCE && (
              <NewfamilyAttendanceTable
                searchName={searchName}
                selectedNewFamily={selectedNewFamily}
                onSelect={onSelectChange}
              />
            )}
            {/* 라인업 요청 탭 */}
            {tabValue === NEW_FAMILY_LINEUP && (
              <NewfamilyLineUpTable
                searchName={searchName}
                selectedNewFamily={selectedNewFamily}
                onSelect={onSelectChange}
              />
            )}
            {/* 라인 아웃 탭 */}
            {tabValue === NEW_FAMILY_LINEOUT && (
              <NewfamilyLineOutTable
                searchName={searchName}
                onSelectLineOut={onSelectLineOut}
              />
            )}
          </GRFlexView>
        </GRFlexView>
      </GRContainerView>
    </>
  );
};

export default NewfamilyPage;

const NewfamilyTabMenu = styled(Menu)`
  height: "100%";

  .ant-menu-item {
    height: 2rem !important;
    line-height: 2rem !important;
    :hover {
      // background-color: ${Color.grey100} !important;
    }
  }

  .ant-menu-item-selected {
    background-color: ${Color.black100} !important;
  }
`;
