import GRChart from "@component/base/GRChart";
import GRTab from "@component/base/GRTab";
import GRDatePicker from "@component/base/dataEntry/GRDatePicker";
import GRModal from "@component/base/modal/GRModal";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import dayjs from "dayjs";
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
        label: "2023-06-04",
        data: labels.map(() => Math.floor(Math.random() * 20)),
        backgroundColor: "rgb(255, 99, 133)"
      },
      {
        label: "2023-06-11",
        data: labels.map(() => Math.floor(Math.random() * 20)),
        backgroundColor: "rgb(53, 162, 235)"
      },
      {
        label: "2023-06-18",
        data: labels.map(() => Math.floor(Math.random() * 20)),
        backgroundColor: "rgb(184, 235, 53)"
      },
      {
        label: "2023-06-25",
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
            <GRDatePicker picker={"week"} defaultValue={dayjs()} />
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
