import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { css } from "@emotion/react";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import React from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const UserTermInfoBox: React.FC = () => {
  const { currentTermDutyCount, currentTermData } = useCurrentTerm();

  return (
    <GRFlexView yGap={1} style={{ width: "100%" }}>
      <GRView>
        <GRText fontSize={"h5"} marginright={1}>
          {currentTermData?.name}
        </GRText>
        <GRText fontSize={"b4"}>
          {currentTermData?.startDate} ~ {currentTermData?.endDate}
        </GRText>
      </GRView>
      <GRFlexView
        isBoard
        width={17}
        paddinghorizontal={2}
        paddingvertical={1}
        marginleft={GRStylesConfig.BASE_MARGIN}
        marginbottom={GRStylesConfig.BASE_LONG_MARGIN}
        yGap={0.5}
        css={css`
          box-shadow: ${GRStylesConfig.BOX_SHOWDOW};
        `}
      >
        <DutyCountBox
          name={"교역자"}
          data={currentTermDutyCount?.pastorCount}
        />
        <DutyCountBox name={"코디"} data={currentTermDutyCount?.codyCount} />
        <DutyCountBox
          name={"순장"}
          data={currentTermDutyCount?.smallGroupLeaderCount}
        />
        <DutyCountBox
          name={"새가족 순장"}
          data={currentTermDutyCount?.newFamilyGroupLeaderCount}
        />
        <DutyCountBox
          name={"순원"}
          data={
            Number(currentTermDutyCount?.smallGroupMemberCount) +
            Number(currentTermDutyCount?.newFamilyMemberCount)
          }
        />
        <DutyCountBox
          name={"새가족"}
          data={currentTermDutyCount?.newFamilyCount}
        />
        <DutyCountBox
          name={"미배정"}
          data={currentTermDutyCount?.notPlacedCount}
        />
        <DutyCountBox
          name={"총 인원"}
          data={currentTermDutyCount?.totalCount}
        />
      </GRFlexView>
    </GRFlexView>
  );
};

export default UserTermInfoBox;

type DutyCountBoxProps = {
  name: string;
  data: number | undefined;
};

const DutyCountBox: React.FC<DutyCountBoxProps> = ({ name, data }) => {
  return (
    <GRFlexView flexDirection={"row"} alignItems={"end"}>
      <GRFlexView alignItems={"end"}>
        <GRText fontSize={"b3"} marginright={2}>
          {name}:
        </GRText>
      </GRFlexView>
      <GRView width={4}>
        <GRFlexView
          flexDirection={"row"}
          alignItems={"end"}
          justifyContent={"end"}
          flex={0.5}
        >
          <GRText fontSize={"b1"} weight={"bold"} marginright={0.5}>
            {data}
          </GRText>
          <GRText fontSize={"b3"}>명</GRText>
        </GRFlexView>
      </GRView>
    </GRFlexView>
  );
};
