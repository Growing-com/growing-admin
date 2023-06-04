import { css } from "@emotion/react";
import { Pagination, PaginationProps, Table, TableProps } from "antd";
import { ReactNode, useMemo } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import GRFlexView from "./view/GRFlexView";
import GRView from "./view/GRView";

type tGRTable<T> = {
  paginationProps?: PaginationProps;
  headerComponent?: ReactNode;
  isHoverTable?: boolean;
} & tGetMargin &
  TableProps<T>;

const GRTable = <GRTableType extends object>({
  columns,
  dataSource,
  pagination = false,
  paginationProps,
  scroll,
  headerComponent,
  isHoverTable = true,
  ...props
}: tGRTable<GRTableType>) => {
  const _margin = getMargin(props);

  const _tableStyles = useMemo(
    () => css`
      thead:hover {
        background: ${!isHoverTable && `#20293c !important`};
      }

      .ant-table-tbody > tr.ant-table-row:hover > td {
        background: ${!isHoverTable && `white !important`};
      }
    `,
    [isHoverTable]
  );

  return (
    <>
      <GRView marginBottom={GRStylesConfig.BASE_MARGIN}>
        {headerComponent}
      </GRView>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        scroll={scroll}
        css={css`
          ${_margin};
          ${_tableStyles}
        `}
      />
      {paginationProps && (
        <GRFlexView alignItems={"center"} marginTop={1}>
          <Pagination showSizeChanger={false} {...paginationProps} />
        </GRFlexView>
      )}
    </>
  );
};

export default GRTable;
