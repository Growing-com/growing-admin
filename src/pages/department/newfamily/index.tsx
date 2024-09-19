import GRButton from "@component/atom/button/GRButton";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import NewfamilyAttendanceTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyAttendanceTable";
import NewfamilyInfoTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyInfoTable";
import NewfamilyLineOutTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyLineOutTable";
import NewfamilyLineUpTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyLineUpTable";
import styled from "@emotion/styled";
import { Menu, MenuProps } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Color } from "styles/colors";

type tTabItems = {
  key: string;
  label: ReactNode;
};

const NEW_FAMILY_INFO = "newfamily-tab-info";
const NEW_FAMILY_ATTENDANCE = "newfamily-tab-attendance";
const NEW_FAMILY_LINEOUT = "newfamily-tab-lineOut";
const NEW_FAMILY_LINEUP = "newfamily-tab-lineUp";

const NewfamilyPage: NextPage = () => {
  const router = useRouter();

  const [searchName, setSearchName] = useState("");
  const [tabValue, setTabValue] = useState<string>(NEW_FAMILY_INFO);


  const onClickCreateNewFamily = async () => {
    await router.push("/department/newfamily/create");
  };

  const onClickTabMenu: MenuProps["onClick"] = e => {
    setTabValue(e.key);
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
      key: "newfamily-tab-lineOut",
      label: <GRFlexView alignItems="center">라인 인 아웃</GRFlexView>
    },
    {
      key: "newfamily-tab-lineUp",
      label: <GRFlexView alignItems="center">등반 라인업</GRFlexView>
    }
  ];

  const tabComponents: { [key: string]: React.FC<{ searchName: string }> } = {
    [NEW_FAMILY_INFO]: NewfamilyInfoTable,
    [NEW_FAMILY_ATTENDANCE]: NewfamilyAttendanceTable,
    [NEW_FAMILY_LINEOUT]: NewfamilyLineOutTable,
    [NEW_FAMILY_LINEUP]: NewfamilyLineUpTable
  };

  const newfamilyTable = (tab: string) => {
    const Component = tabComponents[tab];
    return Component ? (
      <Component searchName={searchName} />
    ) : (
      <NewfamilyInfoTable searchName={searchName} />
    );
  };

  return (
    <>
      <HeaderView
        title={"새가족 관리"}
        backgroundColor={Color.black200}
        titleColor={Color.white}
        headerComponent={
          <GRButton
            onClick={onClickCreateNewFamily}
            buttonType={"default"}
            buttonSize={"large"}
            borderRadius={"8px"}
          >
            등록
          </GRButton>
        }
      />
      <GRFlexView flexDirection={"row"}>
        <NewfamilyTabMenu
          items={tabItems}
          selectedKeys={[tabValue]}
          onClick={onClickTabMenu}
        />
        <GRFlexView paddingleft={3} >{newfamilyTable(tabValue)}</GRFlexView>
      </GRFlexView>
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
      background-color: ${Color.grey100} !important;
    }
  }

  .ant-menu-item-selected {
    background-color: ${Color.grey160} !important;
  }
`;
