import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useMemo, useState } from "react";
import { useDrag } from "react-dnd";
import GRStylesConfig from "styles/GRStylesConfig";
import { DUMP_DATA } from "./DUPM_data";

const LineUpTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const DragableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
  }) => {
    // props
    // children: {$$typeof: Symbol(react.element), type: {…}, key: 'sex', ref: null, props: {…}, …}
    // data-row-key: 331
    // onClick
    const [{ isDragging }, drag, preview] = useDrag(() => ({
      type: "board",
      item: { name: "3" },
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

    return (
      <>
        <div ref={preview}>count {selectedRowKeys.length}</div>
        <tr
          ref={drag}
          data-testid="dustbin"
          {...restProps}
          style={{ cursor: "move", ...style, color: "red" }}
        />
      </>
    );
  };

  // useEffect(() => {
  //   // This gets called after every render, by default
  //   // (the first one, and every one after that)

  //   // Use empty image as a drag preview so browsers don't draw it
  //   // and we can draw whatever we want on the custom drag layer instead.
  //   preview(getEmptyImage(), {
  //     // IE fallback: specify that we'd rather screenshot the node
  //     // when it already knows it's being dragged so we can hide it with CSS.
  //     captureDraggingState: true
  //   });
  //   // If you want to implement componentWillUnmount,
  //   // return a function from here, and React will call
  //   // it prior to unmounting.
  //   // return () => console.log('unmounting...');
  // }, []);

  return (
    <GRFlexView marginright={GRStylesConfig.BASE_LONG_MARGIN}>
      <GRView marginbottom={GRStylesConfig.BASE_MARGIN}>
        <GRText weight={"bold"}>전체 인원</GRText>
      </GRView>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={DUMP_DATA}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        components={{
          body: {
            row: DragableBodyRow
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
