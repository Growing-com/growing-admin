import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { Card, Collapse } from "antd";
import { CollapseProps, ExpandIconPosition } from "antd/es/collapse/Collapse";
import Table, { ColumnType } from "antd/es/table";
import React, { useMemo, useState } from "react";

import { text } from "stream/consumers";
const { Panel } = Collapse;

const LineUpGroupContent = () => {
  const [expandIconPosition, setExpandIconPosition] =
    useState<ExpandIconPosition>("start");

  const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "순장",
        dataIndex: "leaderName",
        key: "leaderName",
        align: "center",
        width: "5rem",
        render: _value => <GRText>{_value}</GRText>
      },
      {
        title: "이름",
        dataIndex: "userName",
        key: "userName",
        align: "center",
        width: "5rem"
      },
      {
        title: "학년",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        width: "5rem"
      }
    ],
    []
  );

  return (
    <GRFlexView>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="This is panel header 1" key="1">
          <GRView>
            <Table
              dataSource={[
                { leaderName: "순장", userName: "이름", grade: "학년" }
              ]}
              columns={columns}
            />
          </GRView>
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="This is panel header 1" key="1"></Panel>
      </Collapse>
    </GRFlexView>
  );
};

export default LineUpGroupContent;
