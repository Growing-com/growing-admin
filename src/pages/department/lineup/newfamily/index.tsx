import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from '@component/atom/view/GRView';
import DragTestBox from "@component/pages/department/lineup/newfamily/DragTestBox";
import DraggableLeader from "@component/pages/department/lineup/newfamily/DraggableLeader";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useTerm from "hooks/api/term/useTerm";
import { termSmallGroupLeadersDumpData } from "mocks/data/termSmallGroupLeadersDumpData";

import { NextPage } from "next";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

const LineupNewfamilyPage: NextPage = () => {
  const { termSmallGroupLeader } = useTerm({
    termId: 1
  });
  const dummydata = termSmallGroupLeadersDumpData;

  return (
    <>
      <GRFlexView
        borderRadius={GRStylesConfig.BASE_MARGIN}
        paddinghorizontal={3}
        paddingvertical={2}
        marginbottom={GRStylesConfig.BASE_MARGIN}
        backgroundColor="white"
        css={css`
          box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
        `}
      >
        <GRText fontSize={"h9"} weight={"bold"}>
          새가족 라인업
        </GRText>
      </GRFlexView>
      <button onClick={() => console.log(dummydata)}>dummydata</button>
      <LeadersContainer>
        <GRFlexView yGap={1}>
          <GRText fontSize={"h9"} weight={"bold"}>
            리더
          </GRText>
          <GRFlexView flexDirection={"row"}>
            {/* 코디 렌더링 */}
            {dummydata.map(group => (
              <GRFlexView
                key={`${group.codyName}`}
                alignItems={"center"}
                yGap={0.5}
              >
                <CodyContainerGRFlexView
                  alignItems={"center"}
                  paddinghorizontal={1}
                >
                  <CodyGRFlexView alignItems={"center"} paddingvertical={0.5}>
                    <GRText fontSize={"b6"}>{group.codyName}</GRText>
                  </CodyGRFlexView>
                </CodyContainerGRFlexView>
                {/* 리더 렌더링 */}
                <GRFlexView yGap={1}>
                  {group.smallGroupLeaders.map(leader => (
                    <DraggableLeader
                      leader={leader}
                      key={leader.smallGroupId}
                    />
                  ))}
                </GRFlexView>
              </GRFlexView>
            ))}
          </GRFlexView>
        </GRFlexView>
      </LeadersContainer>
      <GRContainerView>
        <DragTestBox />
      </GRContainerView>
    </>
  );
};

export default LineupNewfamilyPage;

const CodyContainerGRFlexView = styled(GRView)`
  width: 100%;
`;

const CodyGRFlexView = styled(GRFlexView)`
  border: 0.1rem solid ${Color.grey100};
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
`;

const LineupflexView = styled(GRFlexView)`
  height: 85vh;
`;

const LeadersContainer = styled.div`
  background-color: ${Color.white};
  padding: 1.5rem 3rem 1.5rem 3rem;
  border-radius: 0.5rem;
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  margin-bottom: 0.5rem;
`;
