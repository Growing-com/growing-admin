import GRTab from "@component/atom/GRTab";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import EditCodyTable from "@component/pages/department/lineup/edit/table/EditCodyTable";
import EditNewfamilyGroupLeaderTable from "@component/pages/department/lineup/edit/table/EditNewfamilyGroupLeaderTable";
import EditPastorTable from "@component/pages/department/lineup/edit/table/EditPastorTable";
import EditSmallGroupLeaderTable from "@component/pages/department/lineup/edit/table/EditSmallGroupLeaderTable";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { NextPage } from "next";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const PASTOR = "pastor";
const CODY = "cody";
const SMALL_GROUP_LEADER = "graduate";
const NEW_FAMILY_LEADER = "new_family_leader";
const option = [
  { label: "교역자", value: PASTOR },
  { label: "코디", value: CODY },
  { label: "순장", value: SMALL_GROUP_LEADER },
  { label: "새가족 순장", value: NEW_FAMILY_LEADER }
];

const LineupEditPage: NextPage = () => {
  const [tabValue, setTabValue] = useState<string>(PASTOR);
  const { currentTermData } = useCurrentTerm();

  const onChangeTab = (value: string) => {
    setTabValue(value);
  };

  return (
    <>
      <HeaderView
        title={"라인업 수정"}
        titleInfoType={"info"}
        titleInfo={
          <GRText>직분 생성 시 미배정인 지체만 선택할 수 있습니다.</GRText>
        }
        headerComponent={<div>학년</div>}
        subComponent={
          <GRView>
            <GRText
              fontSize={"b2"}
              marginright={GRStylesConfig.BASE_LONG_MARGIN}
            >
              {currentTermData?.name}
            </GRText>
            <GRText fontSize={"b6"}>
              {currentTermData?.startDate} ~ {currentTermData?.endDate}
            </GRText>
          </GRView>
        }
      />
      <GRContainerView>
        <GRTab items={option} onChange={onChangeTab} />
        {tabValue === PASTOR && <EditPastorTable />}
        {tabValue === CODY && <EditCodyTable />}
        {tabValue === SMALL_GROUP_LEADER && <EditSmallGroupLeaderTable />}
        {tabValue === NEW_FAMILY_LEADER && <EditNewfamilyGroupLeaderTable />}
      </GRContainerView>
    </>
  );
};

export default LineupEditPage;
