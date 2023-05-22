import GRButton from "@component/base/button/GRButton";
import GRFlexView from "@component/base/view/GRFlexView";
import HeaderView from "@component/templates/view/HeaderView";

const  AttendanceStatistics = () => {
  return (
    <HeaderView 
      title={"출석 통계"}
      headerComponent={
          <GRButton>그래프 보기</GRButton>
        }
    />
  )
}

export default AttendanceStatistics;
