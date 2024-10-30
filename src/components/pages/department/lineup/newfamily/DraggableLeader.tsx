import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import styled from "@emotion/styled";
import { tSmallGroupLeader } from 'api/term/type';
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Color } from "styles/colors";

type tDraggableLeader = {
  leader: tSmallGroupLeader;
};

const DraggableLeader: React.FC<tDraggableLeader> = ({ leader }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "newfamily-lineup",
    item: { ...leader },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  // 드래그할 때 보여줄 내용을 설정
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1, // 드래그 시 배경은 투명하게 설정
        cursor: "move",
        padding: "0rem 0.5rem 0rem 0.5rem",
      }}
    >
      <LeaderGRFlexView alignItems={"center"} paddinghorizontal={0}>
        <GRText fontSize={"b3"}>{leader.smallGroupLeaderName}</GRText>
      </LeaderGRFlexView>
    </div>
  );
};

export default DraggableLeader;

const LeaderGRFlexView = styled(GRFlexView)`
  border: 0.1rem solid ${Color.green200};
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  box-shadow: rgba(32, 200, 113, 0.1) 4px 1px 20px -5px, rgba(0,0,0, 0.1) 0px 3px 7px -3px; 
`;
