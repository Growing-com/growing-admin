import { css } from "@emotion/react";
import { Pagination, PaginationProps, Table, TableProps } from "antd";
import { ReactNode } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import GRFlexView from "./view/GRFlexView";
import GRView from "./view/GRView";

type tGRTable<T> = {
  paginationProps?: PaginationProps;
  headerComponent?: ReactNode;
} & tGetMargin &
  TableProps<T>;

const GRTable = <GRTableType extends object>({
  columns,
  dataSource,
  pagination = false,
  paginationProps,
  scroll,
  headerComponent,
  ...props
}: tGRTable<GRTableType>) => {
  const _margin = getMargin(props);

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
