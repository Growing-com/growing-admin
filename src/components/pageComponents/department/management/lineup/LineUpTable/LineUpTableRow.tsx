import { FC, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
type tLineUpTableRow = {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  className: string;
  style: React.CSSProperties;
  selectedRowKeys: number[];
};

const LineUpTableRow: FC<tLineUpTableRow> = ({
  index,
  moveRow,
  className,
  style,
  selectedRowKeys,
  ...restProps
}) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "lineup-table",
    item: { selectItem: selectedRowKeys },
    canDrag: () => {
      return selectedRowKeys.length > 1;
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log("monitor", monitor);
      console.log("item", item);
      console.log("dropResult", dropResult);
      if (item && dropResult) {
        alert(`You dropped ${item.name}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <tr
        ref={drag}
        data-testid="dustbin"
        {...restProps}
        style={{ cursor: "move", ...style, color: "red" }}
      />
    </>
  );
};

export default LineUpTableRow;
