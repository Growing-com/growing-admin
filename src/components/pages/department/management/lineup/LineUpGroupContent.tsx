import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { Collapse } from "antd";
import { ExpandIconPosition } from "antd/es/collapse/Collapse";
import { ColumnType } from "antd/es/table";
import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import GRStylesConfig from "styles/GRStylesConfig";

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

  const onClickAddGroup = () => {};

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "board",
    canDrop: () => {
      console.log("!");
      return true;
    },
    drop: (item, monitor) => {
      console.log("!!!", item);
      console.log("!!", monitor.getDropResult());
      const _newData = {
        name: "종민",
        grade: 1,
        sex: "M"
      };
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <GRFlexView>
      <GRView
        isFlex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginbottom={GRStylesConfig.BASE_MARGIN}
      >
        <GRText weight={"bold"} marginright={0.5}>
          그룹
        </GRText>
        <GRButtonText onClick={onClickAddGroup} buttonType={"default"}>
          그룹 추가
        </GRButtonText>
      </GRView>
      <GRFlexView>
        <CollapseComponent
          className="customs"
          defaultActiveKey={["1"]}
          onChange={onChange}
        >
          <PanelComponent
            header={
              <div ref={drop}>
                <GRView>훈련생</GRView>
              </div>
            }
            key="1"
            className="custom"
            style={{ padding: 0 }}
            showArrow={false}
          >
            <GRView width={30}>
              <GRTable
                data={[{ leaderName: "순장", userName: "이름", grade: "학년" }]}
                columns={columns}
                pagination={false}
              />
            </GRView>
          </PanelComponent>
        </CollapseComponent>
      </GRFlexView>
    </GRFlexView>
  );
};

export default LineUpGroupContent;

const CollapseComponent = styled(Collapse)``;

const PanelComponent = styled(Panel)`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;
