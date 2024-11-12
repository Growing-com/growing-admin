import { tSmallGroup } from "api/term/type";
import { useDrop } from "react-dnd";
import { Color } from "styles/colors";

type tDropCell = {
  onDrop: (item: tSmallGroup) => void;
  children: React.ReactNode;
};

const DropCell: React.FC<tDropCell> = ({ onDrop, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "newfamily-lineup",
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div
      ref={drop}
      style={{
        borderRadius: "0.5rem",
        backgroundColor: isOver ? Color.green100 : "white",
        border: `1px solid ${canDrop ? Color.green200 : Color.white}`,
        height: "100%", // 테이블 셀의 높이를 채우도록 설정
        padding: "1rem 0rem 1rem 0rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {children}
    </div>
  );
};

export default DropCell;
