import GRTab from "@component/atom/GRTab";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import { NewFamilyAttendanceTable } from "@component/pages/department/management/newfamily/NewFamilyAttendanceTable";
import { NewFamilyLineOutTable } from "@component/pages/department/management/newfamily/NewFamilyLineOutTable";
import { NewFamilyLineUpModal } from "@component/pages/department/management/newfamily/NewFamilyLineUpModal";
import { NewFamilyTable } from "@component/pages/department/management/newfamily/NewFamilyTable";
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
  const [tabValue, setTabValue] = useState(NEW_FAMILY);
  const [serachText, setSerachText] = useState();
  const [isOpenLineupModal, setIsOpenLineupModal] = useState(false);

  const router = useRouter();

  const onClickCreateNewFamilyModal = async () => {
    await router.push("/department/management/newfamily/11");
  };

  const onChangeTab = value => {
    setTabValue(value);
  };
  const onClickPromote = () => {};
  const onClickNewFamilyLineUp = () => {
    setIsOpenLineupModal(true);
  };
  const onClickLineOut = () => {};

  const onChangeSearch = () => {};

  const onClickClose = () => {
    setIsOpenLineupModal(false);
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
        <GRTab
          items={option}
          onChange={onChangeTab}
          // tabBarExtraContent={

          // }
        />
        <GRFlexView
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginbottom={GRStylesConfig.BASE_MARGIN}
        >
          <GRView>
            <GRTextInput
              style={{
                height: "2.1rem"
              }}
              type={"input"}
              placeholder={"이름으로 검색하세요"}
              onChange={onChangeSearch}
            />
          </GRView>
          <GRView>
            {tabValue === NEW_FAMILY_LINE_OUT ? (
              <GRButtonText
                onClick={onClickNewFamilyLineUp}
                buttonType={"primary"}
              >
                복귀
              </GRButtonText>
            ) : (
              <>
                <GRButtonText
                  onClick={onClickPromote}
                  marginright={GRStylesConfig.BASE_MARGIN}
                  buttonType={"custom"}
                  size={"small"}
                >
                  등반
                </GRButtonText>
                <GRButtonText
                  onClick={onClickNewFamilyLineUp}
                  buttonType={"primary"}
                >
                  라인업
                </GRButtonText>
              </>
            )}
          </GRView>
        </GRFlexView>
        {tabValue === NEW_FAMILY && <NewFamilyTable />}
        {tabValue === NEW_FAMILY_ATTEND && <NewFamilyAttendanceTable />}
        {tabValue === NEW_FAMILY_LINE_OUT && <NewFamilyLineOutTable />}
      </GRContainerView>
      {isOpenLineupModal && (
        <NewFamilyLineUpModal
          open={isOpenLineupModal}
          onClickClose={onClickClose}
        />
      )}
    </>
  );
};

export default ManagementNewFamilyPage;
