import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { DUTY } from "config/const";
import { useMemo, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { DUMP_DATA } from "../DUPM_data";
import LineUpTableRow from "./LineUpTableRow";

const LineUpTable = () => {
  const [selectedActiveUser, setSelectedActiveUser] = useState<any[]>([]);

  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "name",
        key: "name",
        align: "center",
        fixed: "left",
        width: "3rem"
      },
      {
        title: "학년",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        fixed: "left",
        width: "3rem"
      },
      {
        title: "성별",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        fixed: "left",
        width: "3rem",
        render: (_, record) => <ColumSexRender sexData={record?.sex} />
      },
      {
        title: "직전 텀",
        children: [
          {
            title: "직분",
            key: "duty",
            dataIndex: "tags",
            align: "center",
            width: "3rem",
            render: (_: any, item: any) => {
              if (!item?.duty) return;
              const _duty = DUTY.find(duty => duty.key === item.duty);
              return (
                <Tag color={_duty?.color} key={`duty_key_${_duty?.key}`}>
                  {_duty?.value ?? ""}
                </Tag>
              );
            }
          },
          {
            title: "순",
            key: "tree",
            dataIndex: "tree",
            align: "center",
            width: "3rem",
            render: () => <div>우상욱</div>
          },
          {
            title: "나무",
            key: "tree",
            dataIndex: "tree",
            align: "center",
            width: "3rem",
            render: () => <div>이지우</div>
          },
          {
            title: "출석율",
            key: "tree",
            dataIndex: "tree",
            align: "center",
            width: "3rem",
            render: () => <div>A</div>
          }
        ]
      },
      {
        title: "비고",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        fixed: "left",
        width: "3rem",
        render: () => <div>군파송</div>
      }
    ],
    []
  );

  const onSelectChange = (_: React.Key[], selectedRows: any[]) => {
    setSelectedActiveUser(selectedRows);
  };

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
  //   const [{ isDragging }, drag, preview] = useDrag(() => ({
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
  //     <>
  //       <LineUpTableRow />
  //     </>
  //   );
  // };

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
      <GRView marginbottom={GRStylesConfig.BASE_LONG_MARGIN}>
        <GRText weight={"bold"}>전체 인원</GRText>
      </GRView>
      <GRTable
        rowKey={"id"}
        columns={columns}
        data={DUMP_DATA}
        rowSelection={{
          selectedRowKeys: selectedActiveUser.map(user => user.id),
          onChange: onSelectChange
        }}
        components={{
          body: {
            row: (props: any) => (
              <LineUpTableRow selectedUser={selectedActiveUser} {...props} />
            )
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
