import GRFlexView from "@component/atom/view/GRFlexView";
import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useMemo } from "react";
import { DUMP_DATA } from "./DUPM_data";

const LineUpTable = () => {
  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "name",
        key: "name",
        align: "center",
        fixed: "left",
        width: "8rem"
      },
      {
        title: "학년",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        fixed: "left",
        width: "5rem"
      },
      {
        title: "성별",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        fixed: "left",
        width: "5rem"
      }
    ],
    []
  );

  // const DragableBodyRow = ({
  //   index,
  //   moveRow,
  //   className,
  //   style,
  //   ...restProps
  // }) => {
  //   // props
  //   // children: {$$typeof: Symbol(react.element), type: {…}, key: 'sex', ref: null, props: {…}, …}
  //   // data-row-key: 331
  //   // onClick
  //   const [{ isDragging }, drag] = useDrag(() => ({
  //     type: "board",
  //     item: { name: "3" },
  //     end: (item, monitor) => {
  //       const dropResult = monitor.getDropResult();
  //       console.log("monitor", monitor);
  //       console.log("item", item);
  //       console.log("dropResult", dropResult);
  //       if (item && dropResult) {
  //         alert(`You dropped ${item.name}!`);
  //       }
  //     },
  //     collect: monitor => ({
  //       isDragging: monitor.isDragging(),
  //       handlerId: monitor.getHandlerId()
  //     })
  //   }));
  //   return (
  //     <tr
  //       ref={drag}
  //       data-testid="dustbin"
  //       {...restProps}
  //       style={{ cursor: "move", ...style, color: "red" }}
  //     />
  //   );
  // };

  return (
    <GRFlexView>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={DUMP_DATA}
        components={{
          body: {
            // row: DragableBodyRow
            // row: props => {
            //   console.log("props", props);
            //   const { children, ...restProps } = props;
            //   return (
            //     <tr {...restProps}>
            //       {children instanceof Array
            //         ? children.map(child => {
            //             const { children, key, ...restProps } = child;
            //             return key === "dragHandle" ? (
            //               <td {...restProps}>{child}</td>
            //             ) : (
            //               <td {...restProps}>{child}</td>
            //             );
            //           })
            //         : children}
            //     </tr>
            //   );
            // }
          }
        }}
      />
    </GRFlexView>
  );
};

export default LineUpTable;
