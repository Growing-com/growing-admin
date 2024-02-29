import React from "react";
import { useDragLayer } from "react-dnd";
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
};

export const DragItem = () => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    })
  );
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
        right: 0,
        bottom: 0
      }}
    >
      DragItem
    </div>
  );
};
