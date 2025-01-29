import { CloseOutlined } from "@ant-design/icons";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { tNewfamilyLineUpSmallGroup } from "api/term/type";
import { Color } from "styles/colors";

type tTemporarySmallGroupLeaderNamesRender = {
  temporarySmallGroupIds: number[];
  smallGroups: tNewfamilyLineUpSmallGroup[];
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
  ): tNewfamilyLineUpSmallGroup[] => {
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
            justifyContent={"center"}
            alignItems={"center"}
            xGap={0.1}
            key={leader.smallGroupId}
          >
            <GRView isBoard paddinghorizontal={0.2}>
              <GRText fontSize={"b7"}>{leader.codyName}</GRText>
            </GRView>
            <GRFlexView flexDirection={"row"} alignItems={"center"}>
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
                <CloseOutlined />
              </GRText>
            </GRFlexView>
          </GRFlexView>
        ))
      ) : (
        <GRText fontSize={"b6"}>순장 후보들</GRText>
      )}
    </GRFlexView>
  );
};

export default TemporarySmallGroupLeaderNamesRender;
