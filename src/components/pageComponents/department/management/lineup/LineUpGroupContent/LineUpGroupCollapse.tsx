import { CloseCircleOutlined } from "@ant-design/icons";
import GRTable from "@component/atom/GRTable";
import GRView from "@component/atom/view/GRView";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Collapse } from "antd";
import { ColumnType } from "antd/es/table";
import { tActiveUser } from "api/account/types";
import { FC, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { Color } from "styles/colors";

const { Panel } = Collapse;

type tLineUpGroupCollapse = {
  title: string;
};

const LineUpGroupCollapse: FC<tLineUpGroupCollapse> = ({ title }) => {
  const [selectedActiveUser, setSelectedActiveUser] = useState<tActiveUser[]>(
    []
  );
  const [lineUpGroupContentData, setLineUpGroupContentData] = useState([]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "lineup-table",
    drop: (item: any, monitor) => {
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

  const onClcikDeleteIcon = (_: any) => {
    confirm("삭제하시겠습니까?");
  };

  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "name",
        key: "name",
        align: "center",
        fixed: "left"
      },
      {
        title: "학년",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        fixed: "left"
      },
      {
        title: "성별",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        fixed: "left",
        render: (_, record) => <ColumSexRender sexData={record?.sex} />
      },
      {
        title: "삭제",
        align: "center",
        render: (_, recode) => (
          <CloseCircleOutlined
            onClick={() => onClcikDeleteIcon(recode)}
            rev={undefined}
            style={{ color: Color.grey80, cursor: "pointer" }}
          />
        )
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
    <div
      ref={drop}
      style={{
        // background: canDrop ? Color.green100 : Color.white,
        border: `1px solid ${canDrop ? Color.green200 : Color.white}`,
        backgroundColor: isOver ? Color.green100 : undefined,
        borderRadius: "0.5rem",
        marginBottom: "0.5rem"
      }}
    >
      <CollapseComponent className="customs" onChange={onChange}>
        <PanelComponent
          header={<GRView>{title}</GRView>}
          key="1"
          className="custom"
          style={{ padding: 0 }}
        >
          <GRTable
            rowKey={"id"}
            data={lineUpGroupContentData}
            columns={columns}
            pagination={false}
            customCss={css`
              .ant-table-body {
                overflow-y: scroll !important;
              }
            `}
          />
        </PanelComponent>
      </CollapseComponent>
    </div>
  );
};

export default LineUpGroupCollapse;

const CollapseComponent = styled(Collapse)``;

const PanelComponent = styled(Panel)`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;
