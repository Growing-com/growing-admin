import GRText from "@component/atom/text/GRText";
import { tSmallGroupLeaders } from "api/term";
import { useEffect } from 'react';
import { useDrag } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

type tDraggableLeader = {
  leader: tSmallGroupLeaders
}

const DraggableLeader: React.FC<tDraggableLeader> = ({ leader }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "test-Dragging",
    item: { leader },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }}
    >
      <GRText fontSize={"b3"}>{leader.smallGroupLeaderName}</GRText>
    </div>
  );
};

export default DraggableLeader;
