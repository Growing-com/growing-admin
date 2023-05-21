import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Pagination, PaginationProps, Table, TableProps } from 'antd'
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { Color } from 'styles/colors';
import { getMargin, tGetMargin } from 'utils';
import GRFlexView from './view/GRFlexView';

type tGRTable<T> = {
  paginationProps?: PaginationProps;
} & tGetMargin & TableProps<T>

const GRTable = <GRTableType extends {}> ({
  columns,
  dataSource,
  pagination = false,
  paginationProps,
  scroll,
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
    <ComponentContainer>
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
      {paginationProps &&
      <GRFlexView alignItems={'center'} marginTop={1}>
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
  background-color: ${Color.white};
  padding: 2rem;
  border-radius: 0.5rem;
`