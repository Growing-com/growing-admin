import ColumAttendanceRender from "./ColumAttendanceRender";

const ColumDateTitleRender = () => {
  const _attendanceItems = attendanceList?.[0].attendanceItems;
  if (_attendanceItems?.length) {
    const a = _attendanceItems.map(item => {
      return {
        title: item.week,
        dataIndex: item.week,
        key: item.week,
        align: "center",
        render: () => {
          return (
            <ColumAttendanceRender
              attendanceStatus={item.status}
              contentEtc={item.etc}
            />
          );
        }
      };
    });
    return a;
  }
  return [];
};

export default ColumDateTitleRender;
