import GRTable from "@component/atom/GRTable";
import GRView from "@component/atom/view/GRView";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import styled from "@emotion/styled";
import { Collapse } from "antd";
import { ColumnType } from "antd/es/table";
import { tActiveUser } from "api/account/types";
import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { Color } from "styles/colors";

const { Panel } = Collapse;

const LineUpGroupCollapse = ({ title }) => {
  const [selectedActiveUser, setSelectedActiveUser] = useState<tActiveUser[]>(
    []
  );
  const [lineUpGroupContentData, setLineUpGroupContentData] = useState([]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "lineup-table",
    // canDrop: () => {
    //   console.log("!");
    //   return true;
    // },
    drop: (item, monitor) => {
      console.log("!!!", item);
      console.log("!!", monitor.getDropResult());
      if (item.selectItem.length > 0) {
        setLineUpGroupContentData(item.selectItem);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

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
        width: "5rem"
      },
      {
        title: "성별",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        fixed: "left",
        width: "5rem",
        render: (_, record) => <ColumSexRender sexData={record?.sex} />
      }
    ],
    []
  );

  const onSelectChange = (_: React.Key[], selectedRows: tActiveUser[]) => {
    setSelectedActiveUser(selectedRows);
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <CollapseComponent
      className="customs"
      defaultActiveKey={["1"]}
      onChange={onChange}
    >
      <PanelComponent
        header={
          <div ref={drop}>
            <GRView
              isBoard={canDrop}
              backgroundColor={isOver ? Color.green100 : undefined}
            >
              {title}
            </GRView>
          </div>
        }
        key="1"
        className="custom"
        style={{ padding: 0 }}
      >
        <GRView width={30}>
          <GRTable
            rowKey={"id"}
            data={lineUpGroupContentData}
            columns={columns}
            pagination={false}
            rowSelection={{
              selectedRowKeys: selectedActiveUser.map(user => user.id),
              onChange: onSelectChange
            }}
          />
        </GRView>
      </PanelComponent>
    </CollapseComponent>
  );
};

export default LineUpGroupCollapse;

const CollapseComponent = styled(Collapse)``;

const PanelComponent = styled(Panel)`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;
