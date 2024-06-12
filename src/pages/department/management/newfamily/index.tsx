import GRTab from "@component/atom/GRTab";
import GRButtonText from "@component/atom/button/GRTextButton";
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
  const [searchText, setSearchText] = useState();
  const [isOpenLineupModal, setIsOpenLineupModal] = useState(false);
  const [isOpenPromoteModal, setIsOpenPromoteModal] = useState(false);
  const [selectedNewFamily, setSelectedNewFamily] = useState([]);

  const router = useRouter();

  const onClickCreateNewFamilyModal = async () => {
    await router.push("/department/management/newfamily/create");
  };

  const onChangeTab = value => {
    setTabValue(value);
  };

  const onClickPromote = _newFamily => {
    setIsOpenPromoteModal(true);
    setSelectedNewFamily(_newFamily);
  };

  const onClickNewFamilyLineUp = _newFamily => {
    setIsOpenLineupModal(true);
    setSelectedNewFamily(_newFamily);
  };

  const onClickLineOut = () => {};

  const onChangeSearch = () => {};

  const onClickClose = () => {
    setIsOpenLineupModal(false);
  };

  const onCancelClickButton = () => {
    setSelectedNewFamily([]);
    setIsOpenPromoteModal(false);
  };

  const onOkClickButton = () => {};

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
        {tabValue === NEW_FAMILY && (
          <NewFamilyTable
            onClickPromote={onClickPromote}
            onClickNewFamilyLineUp={onClickNewFamilyLineUp}
          />
        )}
        {tabValue === NEW_FAMILY_ATTEND && (
          <NewFamilyAttendanceTable
            onClickPromote={onClickPromote}
            onClickNewFamilyLineUp={onClickNewFamilyLineUp}
          />
        )}
        {tabValue === NEW_FAMILY_LINE_OUT && (
          <NewFamilyLineOutTable
            onClickNewFamilyLineUp={onClickNewFamilyLineUp}
          />
        )}
      </GRContainerView>
      {isOpenLineupModal && (
        <NewFamilyLineUpModal
          open={isOpenLineupModal}
          onClickClose={onClickClose}
          selectNewFamily={selectedNewFamily}
        />
      )}
      {isOpenPromoteModal && (
        <GRAlertModal
          open={isOpenPromoteModal}
          description={`${selectedNewFamily.length} 명의 새가족을 등반하시겠습니까?`}
          onCancelClickButton={onCancelClickButton}
          onOkClickButton={onOkClickButton}
        />
      )}
    </>
  );
};

export default ManagementNewFamilyPage;
