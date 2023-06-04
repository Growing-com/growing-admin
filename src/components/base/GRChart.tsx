import type { ChartData, LayoutPosition } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import { FC, useMemo } from "react";

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
  data: ChartData;
  title: string;
  legendPos: LayoutPosition;
  showLegend?: boolean;
  /** @description 반응형으로 할거면 false, 아니면 true @defalut false  */
  responsive?: boolean;
};

const GRChart: FC<tGRChart> = ({
  chartType = "bar",
  title,
  legendPos,
  showLegend = false,
  responsive = false
}) => {
  const options = useMemo(
    () => ({
      responsive,
      plugins: {
        legend: {
          display: showLegend,
          position: legendPos
        },
        title: {
          display: !!title,
          text: title
        }
      }
    }),
    [responsive, showLegend, legendPos, title]
  );
  if (chartType === "bar") {
    // return <Bar options={options} data={data} />;
  }
  return <></>;
};

export default GRChart;
