import { Table } from 'antd'

export default function GRTable({
  columns,
  dataSource
}) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
    />
  )
}
