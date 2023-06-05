import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  LayoutPosition,
  Legend,
  LinearScale,
  Scale,
  Title,
  Tooltip
} from "chart.js";
import { FC, useMemo } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type tGRChart = {
  chartType?: "bar";
  data: ChartData<"bar">;
  title?: string;
  legendPos: LayoutPosition;
  showLegend?: boolean;
  /** @description 반응형으로 할거면 false, 아니면 true @defalut false  */
  responsive?: boolean;
};

const GRChart: FC<tGRChart> = ({
  chartType = "bar",
  title,
  data,
  legendPos,
  showLegend = false,
  responsive = true
}) => {
  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      responsive,
      interaction: {
        mode: "index" as const,
        intersect: false
      },
      plugins: {
        legend: {
          display: showLegend,
          position: legendPos
        },
        title: {
          display: !!title,
          text: title
        }
      },
      scales: {
        x: {
          // 여기서 x는 이 축의 id인데요, 이 안에서 axis 속성만 x로 지정해놓으시면 id를 x가 아니라 다른 이름으로 설정해도 무관합니다.

          // afterTickToLabelConversion을 이용하여
          // x축 값이 어떻게 표시될지 설정할 수 있어요!
          afterDataLimits: (scale: Scale) => {
            // y축의 최대값은 데이터의 최대값에 딱 맞춰져서 그려지므로
            // y축 위쪽 여유공간이 없어 좀 답답한 느낌이 들 수 있는데요,
            // 이와 같이 afterDataLimits 콜백을 사용하여 y축의 최대값을 좀 더 여유있게 지정할 수 있습니다!
            scale.max = scale.max * 1;
          },
          grid: {
            // x축을 기준으로 그려지는 선(세로선)에 대한 설정입니다.
            display: true, // 선이 아예 안 그려지게 됩니다.
            drawTicks: true, // 눈금 표시 여부를 지정합니다.
            tickLength: 10, // 눈금 길이를 지정합니다.
            color: "#aea2a2b5" // 눈금 및 선의 색상을 지정합니다.
          },
          axis: "x", // x축(가로축)인지 y축(세로축)인지 표시합니다.

          position: "bottom",
          // top으로 설정하면 가로축이 차트 상단에 그려지게 됩니다!
          ticks: {
            // minRotation: 45, // x축 값의 회전 각도를 설정할 수 있어요.
            padding: 0 // x축 값의 상하 패딩을 설정할 수 있어요.
          }
        },
        y: {
          // 'y'라는 id를 가진 y축에 대한 설정
          // type: isLinear ? 'linear' : 'logarithmic',
          // type: "linear",
          // 리니어 스케일뿐만 아니라 로그 스케일로도 표시할 수 있습니다.
          grid: {
            // 가로선 설정
            color: "#917d7d86"
          },
          afterDataLimits: (scale: Scale) => {
            // y축의 최대값은 데이터의 최대값에 딱 맞춰져서 그려지므로
            // y축 위쪽 여유공간이 없어 좀 답답한 느낌이 들 수 있는데요,
            // 이와 같이 afterDataLimits 콜백을 사용하여 y축의 최대값을 좀 더 여유있게 지정할 수 있습니다!
            scale.max = scale.max * 1.2;
          },
          axis: "y", // 이 축이 y축임을 명시해줍니다.
          display: true, // 축의 가시성 여부도 설정할 수 있습니다.
          position: "left", // 축이 왼쪽에 표시될지, 오른쪽에 표시될지 정할 수 있습니다.
          title: {
            // 이 축의 단위 또는 이름도 title 속성을 이용하여 표시할 수 있습니다.
            display: true,
            align: "end",
            color: "#808080",
            font: {
              size: 12,
              family: "'Noto Sans KR', sans-serif",
              weight: "300"
            },
            text: "단위: 명"
          }
        }
      }
    }),
    [responsive, showLegend, legendPos, title]
  );
  if (chartType === "bar") {
    return <Bar options={options} data={data} />;
  }
  return <></>;
};

export default GRChart;
