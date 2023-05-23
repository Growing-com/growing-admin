import GRButton from "@component/base/button/GRButton";
import GRText from "@component/base/text/GRText";
import GRContainerView from "@component/base/view/GRContainerView";
import GRFlexView from "@component/base/view/GRFlexView";
import HeaderView from "@component/templates/view/HeaderView";

const  AttendanceStatistics = () => {
  return (
    <>
      <HeaderView 
        title={"출석 통계"}
        headerComponent={
            <GRButton>그래프 보기</GRButton>
          }
      />
      <GRContainerView>
        <GRFlexView>
          <GRText>날짜</GRText>

        </GRFlexView>
      </GRContainerView>
    </>
  )
}

export default AttendanceStatistics;
