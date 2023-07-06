import GRTab from "@component/atom/GRTab";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import AttendanceCheckTable from "./AttendanceCheckTable";

const INIT_TAB = "0";
const AttendanceCheck = () => {
  const [currentTab, setCurrentTab] = useState(INIT_TAB);
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());

  const DUMP_DATA = [
    {
      id: "22",
      leader: "우상욱",
      name: "이종민",
      grade: "18",
      gender: "M",
      attendance: [
        {
          date: "2023-05-23",
          attendStatus: "100",
          infor: "몸이 안좋아서 어제 빠르게 퇴근 했습니다."
        }
      ]
    },
    {
      id: "33",
      leader: "우상욱",
      name: "아이유",
      grade: "10",
      gender: "W",
      attendance: [
        {
          date: "2023-05-23",
          attendStatus: "100",
          infor: "몸이 안좋아서 어제 빠르게 퇴근 했습니다."
        }
      ]
    }
  ];

  const items = [
    {
      key: "0",
      label: "이종민"
    },
    {
      key: "1",
      label: "조예인"
    },
    {
      key: "2",
      label: "우상욱"
    }
  ];

  const onChangeTab = useCallback((_tabIndx: string) => {
    setCurrentTab(_tabIndx);
  }, []);

  const onClickAttend = () => {
    console.log("onClickAttend");
  };

  return (
    <>
      <HeaderView
        title={"출석 체크"}
        titleInfo={"2023-05-17 수요일 00:00 까지 출석 체크가 가능합니다."}
      />
      <GRContainerView>
        <GRTab
          items={items}
          defaultActiveKey={currentTab}
          onChange={onChangeTab}
          tabBarExtraContent={
            <GRFlexView alignItems={"flex-start"}>
              <GRDatePicker picker={"week"} defaultValue={filterDate} />
            </GRFlexView>
          }
        />
        <AttendanceCheckTable />
      </GRContainerView>
    </>
  );
};

export default AttendanceCheck;
