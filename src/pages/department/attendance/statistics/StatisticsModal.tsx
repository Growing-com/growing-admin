import GRChart from "@component/base/GRChart";
import GRModal from "@component/base/modal/GRModal";
import { FC, useCallback } from "react";

type tStatisticsModal = {
  onClickStatistics: () => void;
  open: boolean;
};

const StatisticsModal: FC<tStatisticsModal> = ({ open, onClickStatistics }) => {
  const labels = [
    "이종민",
    "홍길동",
    "아이유",
    "이순종",
    "우상욱",
    "조예인",
    "이리더",
    "김리더",
    "박리더",
    "최리더",
    "홍리더"
  ];
  const DATA = {
    labels,
    datasets: [
      {
        label: "2023-06-04",
        data: labels.map(() => Math.random() * (1000 - 10) + 10),
        backgroundColor: "rgb(255, 99, 133)"
      },
      {
        label: "2023-06-11",
        data: labels.map(() => Math.random() * (1000 - 10) + 10),
        backgroundColor: "rgb(53, 162, 235)"
      },
      {
        label: "2023-06-18",
        data: labels.map(() => Math.random() * (1000 - 10) + 10),
        backgroundColor: "rgb(184, 235, 53)"
      },
      {
        label: "2023-06-25",
        data: labels.map(() => Math.random() * (1000 - 10) + 10),
        backgroundColor: "rgba(53, 235, 96, 0.5)"
      }
    ]
  };
  const onOkClick = useCallback(() => {
    onClickStatistics?.();
  }, [onClickStatistics]);

  const onCancelClick = useCallback(() => {
    onClickStatistics?.();
  }, [onClickStatistics]);

  return (
    <GRModal
      onOk={onOkClick}
      onCancel={onCancelClick}
      open={open}
      showFooter={false}
    >
      <GRChart data={DATA} title={"순모임"} legendPos={"center"} />
    </GRModal>
  );
};

export default StatisticsModal;
