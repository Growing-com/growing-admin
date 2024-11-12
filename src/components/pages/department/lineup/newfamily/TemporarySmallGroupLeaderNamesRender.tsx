import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { tSmallGroupLeader } from "api/term/type";
import { Color } from "styles/colors";

type tTemporarySmallGroupLeaderNamesRender = {
  temporarySmallGroupIds: number[];
  smallGroups: tSmallGroupLeader[];
  deleteTemporaryData: (_newFamilyId: number, value: number) => void;
  newFamilyId: number;
};

const TemporarySmallGroupLeaderNamesRender: React.FC<
  tTemporarySmallGroupLeaderNamesRender
> = ({
  temporarySmallGroupIds,
  smallGroups,
  deleteTemporaryData,
  newFamilyId
}) => {
  const getSmallGroupLeaderForm = (
    smallGroupIds: number[]
  ): tSmallGroupLeader[] => {
    return smallGroupIds?.map(id => {
      const leader = smallGroups.find(leader => leader.smallGroupId === id);
      return (
        leader || {
          codyName: `${id} 리더 코디`,
          smallGroupId: id,
          smallGroupLeaderName: `${id} 리더`
        }
      );
    });
  };

  const temporaryGroupLeader = getSmallGroupLeaderForm(temporarySmallGroupIds);

  return (
    <GRFlexView flexDirection={"row"} justifyContent={"center"} xGap={0.5}>
      {temporaryGroupLeader?.length > 0 ? (
        temporaryGroupLeader.map(leader => (
          <GRFlexView
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            xGap={0.1}
            key={leader.smallGroupId}
          >
            <GRText fontSize={"b7"}>{leader.codyName}</GRText>
            <GRText fontSize={"b4"} marginright={0.1}>
              {leader.smallGroupLeaderName}
            </GRText>
            <GRText
              color={Color.red100}
              weight={"bold"}
              onClick={() =>
                deleteTemporaryData(newFamilyId, leader.smallGroupId)
              }
              style={{ cursor: "pointer" }}
            >
              X
            </GRText>
          </GRFlexView>
        ))
      ) : (
        <GRText fontSize={"b6"}>순장 후보들</GRText>
      )}
    </GRFlexView>
  );
};

export default TemporarySmallGroupLeaderNamesRender;
