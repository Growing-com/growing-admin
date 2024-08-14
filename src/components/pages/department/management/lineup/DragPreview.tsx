import GRText from "@component/atom/text/GRText";
import GRView from "@component/atom/view/GRView";
import { Identifier } from "dnd-core";
import { useEffect, useState } from "react";
import { XYCoord, useDragLayer } from "react-dnd";

type tCoord = XYCoord | null;

const getItemStyles = (
  currentOffset: tCoord,
  initialOffset: tCoord,
  mousePos: tCoord
) => {
  if (!currentOffset || !mousePos || !initialOffset) {
    return {
      display: "none"
    };
  }
  const { x: mouseX, y: mouseY } = mousePos;
  const offsetX = initialOffset.x - mouseX;
  const offsetY = initialOffset.y - mouseY;
  const { x, y } = currentOffset;
  const transform = `translate(${x - offsetX}px, ${y - offsetY - 10}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
};

const DragPreview = () => {
  const [mousePos, setMousePos] = useState<tCoord>({ x: 0, y: 0 });

  const { itemType, initialOffset, isDragging, item, currentOffset } =
    useDragLayer(monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    }));

  const renderItem = (type: Identifier | null, item: any) => {
    switch (type) {
      case "lineup-table":
        const _firstName = item.selectItem[0];

        return (
          <GRView>
            <GRText>
              {_firstName.name} 외 이동 +{item.selectItem.length} 명
            </GRText>
          </GRView>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isDragging) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
      }}
    >
      <div style={getItemStyles(currentOffset, initialOffset, mousePos)}>
        {renderItem(itemType, item)}
      </div>
    </div>
  );
};

export default DragPreview;