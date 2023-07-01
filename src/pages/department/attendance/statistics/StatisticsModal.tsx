import GRChart from "@component/atom/GRChart";
import GRTab from "@component/atom/GRTab";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRModal from "@component/atom/modal/GRModal";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { FC, useCallback, useState } from "react";

type tStatisticsModal = {
  onClickStatistics: () => void;
  open: boolean;
};

const items = [
  {
    key: "0",
    label: "학년"
  },
  {
    key: "1",
    label: "나무"
  }
];

const StatisticsModal: FC<tStatisticsModal> = ({ open, onClickStatistics }) => {
  const [currentTab, setCurrentTab] = useState("0");
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
        label: "06/04",
        data: labels.map(() => Math.floor(Math.random() * 20)),
        backgroundColor: "rgb(255, 99, 133)"
      },
      {
        label: "06/11",
        data: labels.map(() => Math.floor(Math.random() * 20)),
        backgroundColor: "rgb(53, 162, 235)"
      },
      {
        label: "06/18",
        data: labels.map(() => Math.floor(Math.random() * 20)),
        backgroundColor: "rgb(184, 235, 53)"
      },
      {
        label: "06/25",
        data: labels.map(() => Math.floor(Math.random() * 20)),
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
      width={"70%"}
    >
      <GRTab
        items={items}
        defaultActiveKey={currentTab}
        tabBarExtraContent={
          <GRFlexView alignItems={"flex-start"}>
            <GRDatePicker picker={"month"} />
          </GRFlexView>
        }
      />
      <GRView alignItems={"center"}>
        <GRChart data={DATA} legendPos={"bottom"} showLegend />
      </GRView>
    </GRModal>
  );
};

export default StatisticsModal;
