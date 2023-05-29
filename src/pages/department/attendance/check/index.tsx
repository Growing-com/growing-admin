import GRTab from "@component/base/GRTab";
import GRButtonText from "@component/base/button/GRTextButton";
import GRTextInput from "@component/base/text/GRTextInput";
import GRContainerView from "@component/base/view/GRContainerView";
import HeaderView from "@component/modules/view/HeaderView";
import { useCallback, useState } from "react";
import AttendanceCheckTable from "./AttendanceCheckTable";

const INIT_TAB = "0";
const AttendanceCheck = () => {
  const [currentTab, setCurrentTab] = useState(INIT_TAB);
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

  const colums = [
    {
      title: "순장",
      key: "leader"
    },
    {
      title: "이름",
      key: "name"
    },
    {
      title: "학년",
      key: "grade"
    },
    {
      title: "학년",
      key: "gender"
    },
    {
      title: "출석",
      key: "attendance",
      type: "radio",
      defaultValue: "100",
      options: [
        {
          label: "현장",
          value: "100"
        },
        {
          label: "결석",
          value: "100"
        },
        {
          label: "온라인",
          value: "100"
        }
      ]
    },
    {
      title: "추가 내용",
      key: "info",
      type: "custom",
      render: () => {
        <GRTextInput />;
      }
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

  const onClickAttend = () => {};

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
            <GRButtonText onClick={onClickAttend}>출석 등록</GRButtonText>
          }
        />
        <AttendanceCheckTable colunms={colums} />
      </GRContainerView>
    </>
  );
};

export default AttendanceCheck;
