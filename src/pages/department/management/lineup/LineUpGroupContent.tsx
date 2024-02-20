import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { Collapse, Table } from "antd";
import { ExpandIconPosition } from "antd/es/collapse/Collapse";
import { ColumnType } from "antd/es/table";
import { useMemo, useState } from "react";

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
      <CollapseComponent
        className="customs"
        defaultActiveKey={["1"]}
        onChange={onChange}
      >
        <PanelComponent
          header="This is panel header 1"
          key="1"
          className="custom"
        >
          <GRView>
            <Table
              dataSource={[
                { leaderName: "순장", userName: "이름", grade: "학년" }
              ]}
              columns={columns}
            />
          </GRView>
        </PanelComponent>
      </CollapseComponent>
      <CollapseComponent defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="This is panel header 1" key="1"></Panel>
      </CollapseComponent>
    </GRFlexView>
  );
};

export default LineUpGroupContent;

const CollapseComponent = styled(Collapse)`
  .ant-collapse {
    .ant-collapse-content > .ant-collapse-content-box {
      padding: 0;
    }
  }
  .customs {
    .ant-collapse-content-box {
      padding: 0;
    }
  }
`;

const PanelComponent = styled(Panel)`
  /* .ant-collapse {
    .ant-collapse-content > .ant-collapse-content-box {
      padding: 0;
    }
  } */
  .custom {
    .ant-collapse-content > .ant-collapse-content-box {
      padding: 0;
    }
  }
`;
