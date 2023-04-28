import { Table } from 'antd'

function GRTable({
  columns,
  dataSource,
  pagination
}) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
    />
  )
}

export default GRTable;
