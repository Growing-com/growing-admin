import GRFlexView from "@component/atom/view/GRFlexView";
import styled from "@emotion/styled";
import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { concat } from "lodash";
import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { DUMP_DATA } from "./DUPM_data";

const LineUpContent = () => {
  const [dropData, setDropDate] = useState([]);
  console.log("dropData", dropData);
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

  const DragableBodyRow = props => {
    console.log("DragableBodyRow_props", props);
    // props
    // children: {$$typeof: Symbol(react.element), type: {…}, key: 'sex', ref: null, props: {…}, …}
    // data-row-key: 331
    // onClick
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
      accept: "board",
      canDrop: () => {
        console.log("!");
        return true;
      },
      drop: () => {
        console.log("!!");
        const _newData = {
          name: "종민",
          grade: 1,
          sex: "M",
          id: props["data-row-key"]
        };
        setDropDate(concat(dropData, [_newData]));
      },
      collect: monitor => ({})
    }));

    return (
      <tr
        ref={drop}
        data-testid="dustbin"
        style={{ cursor: "move", color: "red" }}
        {...props}
      />
    );
  };

  // const expandedRowRender = (record, index, indent, expanded) => {
  const expandedRowRender = props => {
    console.log("props", props);
    const expandcolumns: ColumnType<any>[] = [
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
    ];
    // const datasource = [];
    const datasource = dropData.filter(_data => {
      return _data.id === props.id;
    });
    return (
      <Table
        columns={expandcolumns}
        dataSource={datasource}
        pagination={false}
      />
    );
  };

  return (
    <GRFlexView>
      <Table
        rowKey={"id"}
        columns={columns}
        expandable={{
          expandedRowRender: expandedRowRender,
          defaultExpandedRowKeys: ["0"]
        }}
        components={{
          body: { row: DragableBodyRow }
        }}
        dataSource={DUMP_DATA}
        size="small"
      />
    </GRFlexView>
  );
};

const Content = styled.div`
  border: 0.1rem solid black;
  margin: 0.5rem;
  width: 10rem;
  height: 10rem;
`;

export default LineUpContent;
