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
  data?: Array<T>;
  fontSize?: number;
  headerFontSize?: number;
} & tGetMargin &
  TableProps<T>;

const BASE_SCROLL = {
  y: "40vh"
};

const GRTable = <GRTableType extends object>({
  columns,
  data,
  pagination = false,
  paginationProps,
  scroll,
  headerComponent,
  isHoverTable = true,
  fontSize = 0.8,
  headerFontSize = 0.7,
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

      .ant-table table {
        font-size: ${fontSize}rem;
      }
      .ant-table-thead {
        tr {
          .ant-table-cell {
            font-size: ${fontSize}rem;
            padding: ${headerFontSize}rem;
          }
        }
      }
    `,
    [fontSize, isHoverTable]
  );

  return (
    <>
      <GRView marginbottom={GRStylesConfig.BASE_MARGIN}>
        {headerComponent}
      </GRView>
      <Table
        columns={columns}
        dataSource={data ?? []}
        pagination={pagination}
        scroll={scroll ?? BASE_SCROLL}
        css={css`
          ${_margin};
          ${_tableStyles}
        `}
        {...props}
      />
      {paginationProps && (
        <GRFlexView alignItems={"center"} margintop={1}>
          <Pagination showSizeChanger={false} {...paginationProps} />
        </GRFlexView>
      )}
    </>
  );
};

export default GRTable;
