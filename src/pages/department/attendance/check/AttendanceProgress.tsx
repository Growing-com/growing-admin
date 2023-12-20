import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { Progress } from "antd";
import GRStylesConfig from "styles/GRStylesConfig";

const AttendanceProgress = () => {
  return (
    <GRFlexView flexDirection={"row"} alignItems={"center"}>
      <GRText weight={"bold"}>완료률</GRText>
      <GRView width={15} marginhorizontal={GRStylesConfig.BASE_MARGIN}>
        <Progress percent={60} success={{ percent: 30 }} showInfo={false} />
      </GRView>
      <GRText>2 / 6</GRText>
      <GRText>( 완료 순장 / 전체 순장 )</GRText>
    </GRFlexView>
  );
};

export default AttendanceProgress;
