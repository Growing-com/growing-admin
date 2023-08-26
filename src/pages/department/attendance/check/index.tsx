import GRTab from "@component/atom/GRTab";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useGetTermCodyQuery } from "api/term/queries/useGetTermCodyQuery";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import AttendanceCheckTable from "./AttendanceCheckTable";

const INIT_TAB = "0";
const AttendanceCheck = () => {
  const [currentTab, setCurrentTab] = useState(INIT_TAB);
  const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());
  const [selectTeam, setSelectTeam] = useState();

  const { data: cordiList } = useGetTermCodyQuery(1);

  const onChangeTab = useCallback((_tabIndx: string) => {
    console.log("_tabIndex", _tabIndx);
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
          items={cordiList}
          defaultActiveKey={currentTab}
          onChange={onChangeTab}
          tabBarExtraContent={
            <GRFlexView alignItems={"flex-start"}>
              <GRDatePicker picker={"week"} defaultValue={filterDate} />
            </GRFlexView>
          }
        />
        <AttendanceCheckTable currentTab={currentTab} />
      </GRContainerView>
    </>
  );
};

export default AttendanceCheck;
