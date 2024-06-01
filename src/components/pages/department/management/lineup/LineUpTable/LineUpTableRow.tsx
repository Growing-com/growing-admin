import { tActiveUser } from "api/account/types";
import { FC, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
type tLineUpTableRow = {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  className: string;
  style: React.CSSProperties;
  selectedUser: tActiveUser[];
};

const LineUpTableRow: FC<tLineUpTableRow> = ({
  index,
  moveRow,
  className,
  style,
  selectedUser,
  ...restProps
}) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "lineup-table",
    item: { selectItem: selectedUser },
    canDrag: () => {
      return selectedUser.length > 0;
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
        style={{ cursor: "move", ...style }}
      />
    </>
  );
};

export default LineUpTableRow;
