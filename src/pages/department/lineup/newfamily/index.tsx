import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import DragPreview from "@component/pages/department/lineup/DragPreview";
import DraggableLeader from "@component/pages/department/lineup/newfamily/DraggableLeader";
import LineupNewfamilySelectBox from "@component/pages/department/lineup/newfamily/LineupNewfamilySelectBox";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";

import { NextPage } from "next";
import { useMemo } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

const LineupNewfamilyPage: NextPage = () => {
  const { currentTermSmallGroupLeaders } = useCurrentTerm();

  const smallGroupProp = useMemo(() => {
    if (currentTermSmallGroupLeaders)
      return currentTermSmallGroupLeaders.flatMap(
        item => item.smallGroupLeaders
      );
  }, [currentTermSmallGroupLeaders]);

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
      <LineupContainer>
        <DragPreview />
        <GRFlexView yGap={1} style={{ overflow: "auto" }}>
          <GRText fontSize={"h9"} weight={"bold"}>
            리더
          </GRText>
          <GRFlexView flexDirection={"row"}>
            {/* 코디 렌더링 */}
            {currentTermSmallGroupLeaders &&
            currentTermSmallGroupLeaders?.length > 0 ? (
              currentTermSmallGroupLeaders.map(group => (
                <GRFlexView
                  key={`${group.codyName}`}
                  alignItems={"center"}
                  yGap={0.5}
                >
                  <CodyGRView alignItems={"center"} paddinghorizontal={1}>
                    <CodyGRFlexView alignItems={"center"} paddingvertical={0.5}>
                      <GRText fontSize={"b6"}>{group.codyName}</GRText>
                    </CodyGRFlexView>
                  </CodyGRView>
                  {/* 리더 렌더링 */}
                  <LeaderGRFlexView yGap={1} xGap={0.1}>
                    {group.smallGroupLeaders.map(leader => (
                      <DraggableLeader
                        leader={leader}
                        key={leader.smallGroupId}
                      />
                    ))}
                  </LeaderGRFlexView>
                </GRFlexView>
              ))
            ) : (
              <div> 데이터 받아오는 중 </div>
            )}
          </GRFlexView>
        </GRFlexView>
      </LineupContainer>
      <LineupContainer>
        <LineupNewfamilySelectBox smallGroups={smallGroupProp || []} />
      </LineupContainer>
    </>
  );
};

export default LineupNewfamilyPage;

const CodyGRView = styled(GRView)`
  width: 100%;
`;

const CodyGRFlexView = styled(GRFlexView)`
  border: 0.1rem solid ${Color.grey100};
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
`;

const LeaderGRFlexView = styled(GRFlexView)`
  width: 100%;
`;

const LineupContainer = styled.div`
  background-color: ${Color.white};
  padding: 1.5rem 3rem 1.5rem 3rem;
  border-radius: 0.5rem;
  box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
  margin-bottom: 0.5rem;
`;
