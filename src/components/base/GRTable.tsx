import { css } from "@emotion/react";
import { Pagination, PaginationProps, Table, TableProps } from "antd";
import { ReactNode, useMemo } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import getMargin, { type tGetMargin } from "styles/css/getMargin";
import GRFlexView from "./view/GRFlexView";
import GRView from "./view/GRView";

type tGRTable<T> = {
  paginationProps?: PaginationProps;
  headerComponent?: ReactNode;
} & tGetMargin &
  TableProps<T>;

const GRTable = <GRTableType extends {}>({
  columns,
  dataSource,
  pagination = false,
  paginationProps,
  scroll,
  headerComponent,
  ...props
}: tGRTable<GRTableType>) => {
  const _margin = getMargin(props);

  const borderColor = useMemo(() => Color.grey100, []);
  const border = useMemo(() => `0.1rem solid ${borderColor}`, [borderColor]);
  const fontColor = useMemo(() => Color.grey70, []);
  const borderRadius = 1.2;

  const tableStyles = useMemo(
    () => css`
      /* .ant-table-container {
            table {
                border-collapse: collapse;

                .ant-table-thead {
                    tr {
                        .ant-table-cell {
                            font-weight: bold;
                            color: ${fontColor};
                            background-color: #27fbbc33;

                            ::before {
                                display: none;
                            }

                            :last-of-type {
                                border-right: none;

                            }
                        }
                       
                    }
                }

                .ant-table-tbody {
                    .ant-table-row {
                        cursor: pointer;

                        .ant-table-cell {

                            border-bottom: ${border};
                            color: ${fontColor};
                        }

                        :last-of-type .ant-table-cell {
                            border-bottom: none;
                        }
                    }
                }
            }
        }

        .ant-table-footer {
            padding: 0;
        } */
    `,
    [border, fontColor]
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
          ${tableStyles}
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
