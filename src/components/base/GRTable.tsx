import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Pagination, PaginationProps, Table, TableProps } from 'antd'
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { Color } from 'styles/colors';
import { getMargin, tGetMargin } from 'utils';
import GRFlexView from './view/GRFlexView';

type tGRTable = {
  paginationProps?: PaginationProps;
} & tGetMargin & TableProps<RecordType>

const GRTable: FC<tGRTable> = ({
  columns,
  dataSource,
  pagination = false,
  paginationProps,
  ...props
}) => {
  const _margin = getMargin(props);

  const borderColor = useMemo(() => Color.grey100, []);
  const border = useMemo(() => `0.1rem solid ${borderColor}`, [borderColor]);
  const fontColor = useMemo(() => Color.grey70, []);
  const borderRadius = 1.2;

  const tableStyles = useMemo(
    () => css`
        .ant-table-container {
            border: ${border};
            border-top-right-radius: ${borderRadius}rem;
            border-top-left-radius: ${borderRadius}rem;
            border-bottom-right-radius: ${props.footer ? 0 : borderRadius}rem;
            border-bottom-left-radius: ${props.footer ? 0 : borderRadius}rem;

            table {
                border-collapse: collapse;

                .ant-table-thead {
                    tr {
                        .ant-table-cell {
                            border-right: ${border};
                            font-weight: bold;
                            color: ${fontColor};
                            background-color: ${Color.green100};

                            ::before {
                                display: none;
                            }

                            :first-of-type {
                                border-top-left-radius: ${borderRadius}rem;
                            }

                            :last-of-type {
                                border-right: none;

                            }
                        }

                        .ant-table-cell.ant-table-cell-scrollbar {
                            border-top-left-radius: 0;
                            border-top-right-radius: ${borderRadius}rem;
                        }
                    }
                }

                .ant-table-tbody {
                    .ant-table-row {
                        cursor: pointer;

                        .ant-table-cell {
                            border-top: ${border};
                            border-right: ${border};
                            border-bottom: ${border};
                            color: ${fontColor};

                            :last-of-type {
                                border-right: none;
                            }
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
        }
    `,
    [border, fontColor, props.footer]
  );

  return (
    <ComponentContainer>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        css={css`
          ${tableStyles}
          ${_margin};
        `}
      />
      {paginationProps &&
      <GRFlexView alignItems={'center'} marginTop={2}>
        <Pagination
          showSizeChanger={false}
          {...paginationProps}
        />
      </GRFlexView>}
    </ComponentContainer>
  )
}

export default GRTable;

const ComponentContainer = styled.div`
`