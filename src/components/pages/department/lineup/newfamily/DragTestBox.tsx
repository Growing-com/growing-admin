import GRText from '@component/atom/text/GRText';
import GRFlexView from '@component/atom/view/GRFlexView';
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { tSmallGroupLeaders } from "api/term";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { Color } from "styles/colors";

const DragTestBox: React.FC = () => {
  const [droppedLeaders, setDroppedLeaders] = useState<tSmallGroupLeaders[]>(
    []
  );

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "test-Dragging",
    drop: (item: tSmallGroupLeaders) => {
      console.log("Dropped item:", item); // Dropped item 확인
      setDroppedLeaders(prevLeaders => [...prevLeaders, item]);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  return (
    <TestGRView>
      <button onClick={() => console.log(droppedLeaders)}>
        droppedLeaders
      </button>
      <div
        ref={drop}
        style={{
          borderRadius: "0.5rem",
          marginBottom: "0.5rem",
          backgroundColor: isOver ? Color.green100 : "white",
          border: `1px solid ${canDrop ? "green" : "lightgray"}`,
        }}
      >
        <DropGRView>
            <GRText>드랍 박스</GRText>
        </DropGRView>
      </div>
    </TestGRView>
  );
};

export default DragTestBox;

const TestGRView = styled(GRView)`
  min-height: 10rem;
`;

const DropGRView = styled(GRFlexView)`
    width: 100%;
    height: 100%;
`
