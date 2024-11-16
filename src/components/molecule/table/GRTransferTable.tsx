import { css } from "@emotion/react";
import type { GetProp, TableColumnsType, TransferProps } from "antd";
import { Table, Transfer } from "antd";

type TransferItem = GetProp<TransferProps, "dataSource">[number];

export interface TableTransferProps<T> extends TransferProps<TransferItem> {
  dataSource: T[];
  leftColumns: TableColumnsType<T>;
  rightColumns: TableColumnsType<T>;
  leftWayDisable?: boolean;
  rightWayDisable?: boolean;
}

const GRTransferTable = <T,>(props: TableTransferProps<T>) => {
  const {
    leftColumns,
    rightColumns,
    rowKey,
    titles,
    leftWayDisable = false,
    rightWayDisable = false,
    ...restProps
  } = props;

  const customStyles = css`
    .ant-table-selection-extra {
      display: none; /* "Select All" 체크박스 옆의 화살표 및 텍스트 숨기기 */
    }
  `;

  return (
    <Transfer
      style={{ width: "100%" }}
      showSelectAll={false}
      selectionsIcon={""}
      titles={titles}
      css={[customStyles]}
      locale={{
        itemUnit: "명",
        itemsUnit: "명",
        notFoundContent: "목록이 비어 있습니다",
        searchPlaceholder: "이름으로 검색하세요"
      }}
      {...restProps}
    >
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys
      }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;
        const rowSelection =
          (rightWayDisable && direction === "left") ||
          (leftWayDisable && direction === "right")
            ? undefined
            : {
                onChange: (selectedRowKeys: React.Key[]) => {
                  onItemSelectAll(selectedRowKeys, "replace");
                },
                selectedRowKeys: listSelectedKeys
              };

        return (
          <Table
            rowKey={rowKey}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            scroll={{ x: true }}
            tableLayout={"auto"}
            onRow={({ key }) => ({
              onClick: () => {
                onItemSelect(key, !listSelectedKeys.includes(key));
              }
            })}
            pagination={{
              position: ["bottomCenter"],
              hideOnSinglePage: true
            }}
          />
        );
      }}
    </Transfer>
  );
};

export default GRTransferTable;
