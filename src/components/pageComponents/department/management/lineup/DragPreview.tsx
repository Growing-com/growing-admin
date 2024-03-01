import { useEffect, useState } from "react";
import { useDragLayer } from "react-dnd";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

const getItemStyles = (currentOffset, initialOffset, mousePos) => {
  if (!currentOffset) {
    return {
      display: "none"
    };
  }
  const { x: mouseX, y: mouseY } = mousePos;
  const offsetX = initialOffset.x - mouseX;
  const offsetY = initialOffset.y - mouseY;
  const { x, y } = currentOffset;
  const transform = `translate(${x - offsetX}px, ${y - offsetY}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
};

const DragPreview = () => {
  const [mousePos, setMousePos] = useState({});

  const { itemType, initialOffset, isDragging, item, currentOffset } =
    useDragLayer(monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    }));

  const renderItem = (type, item) => {
    switch (type) {
      case "lineup-table":
        return <div>!!!</div>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleMouseMove = event => {
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
  console.log("item", item);

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset, initialOffset, mousePos)}>
        {renderItem(itemType, item)}
      </div>
    </div>
  );
};

export default DragPreview;
