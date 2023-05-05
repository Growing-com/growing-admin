import { css } from '@emotion/react';
import { Table, TableProps } from 'antd'
import { getMargin, tGetMargin } from 'utils';

type tGRTable<DataSourceType> = {

} & tGetMargin & TableProps<DataSourceType>

const GRTable =<DataSourceType extends {}> ({
  columns,
  dataSource,
  pagination,
  ...props
}: tGRTable<DataSourceType>) => {
  const _margin = getMargin(props);
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      css={css`
        ${_margin};
      `}
    />
  )
}

export default GRTable;
