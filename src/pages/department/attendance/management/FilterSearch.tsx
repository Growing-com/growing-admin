import GRButtonText from "@component/atom/button/GRTextButton";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

type tSearchFilter = "name" | "cordi" | "grade";

const SEARCH_OPTION = [
  {
    label: "이름",
    value: "name"
  },
  {
    label: "코디",
    value: "cordi"
  },
  {
    label: "학년",
    value: "grade"
  }
];

const FilterSearch = () => {
  const [searchFilter, setSearchFilter] = useState<tSearchFilter>("name");
  const [filterDate, setFilterDate] = useState({
    startDate: dayjs().startOf("M"),
    endDate: dayjs().endOf("M")
  });

  const onClickSearch = useCallback(() => {
    console.log("onClickSearch");
  }, []);

  const onChangeSearchSelect = useCallback((_value: tSearchFilter) => {
    setSearchFilter(_value);
  }, []);

  const renderSearch = useCallback(() => {
    switch (searchFilter) {
      case "name":
        return <GRTextInput placeholder={"이름으로 검색하세요"} />;
      case "grade":
        return <GRTextInput placeholder={"학년으로 검색하세요"} />;
      case "cordi":
        return (
          <GRSelect
            placeholder={"검색하고 코디을 선택해 주세요"}
            style={{ flex: 1 }}
            options={[
              {
                label: "이종민",
                value: "10"
              },
              {
                label: "우상욱",
                value: "11"
              }
            ]}
          />
        );
      default:
        break;
    }
  }, [searchFilter]);

  const onChangeDate = useCallback(
    (changeKey: "startDate" | "endDate", value: dayjs.Dayjs | null) => {
      if (!value) return;
      if (changeKey === "endDate" && value.diff(filterDate.startDate) < 0) {
        alert("기간이 역전할수는 없습니다");
        return;
      }
      setFilterDate(prev => ({
        ...prev,
        [changeKey]: value
      }));
    },
    [filterDate]
  );

  return (
    <GRFlexView flexDirection={"row"}>
      <GRFlexView>
        <GRFlexView
          flexDirection={"row"}
          alignItems={"center"}
          marginbottom={1}
        >
          <GRText weight={"bold"} fontSize={"b5"} width={5}>
            기간
          </GRText>
          <GRDatePicker
            width={10}
            picker={"week"}
            onChange={value => onChangeDate("startDate", value)}
            defaultValue={filterDate.startDate}
          />
          <GRText marginhorizontal={1}>~</GRText>
          <GRDatePicker
            width={10}
            picker={"week"}
            onChange={value => onChangeDate("endDate", value)}
            defaultValue={filterDate.endDate}
          />
          <GRText marginleft={1} weight={"bold"} fontSize={"b5"} width={5}>
            검색 조건
          </GRText>
          <GRSelect
            value={searchFilter}
            style={{ flex: 1 }}
            options={SEARCH_OPTION}
            onChange={onChangeSearchSelect}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"} alignItems={"center"}>
          <GRText weight={"bold"} fontSize={"b5"} width={5}>
            조건
          </GRText>
          {renderSearch()}
        </GRFlexView>
      </GRFlexView>
      <GRView>
        <GRButtonText onClick={onClickSearch} marginleft={2} size={"large"}>
          조회
        </GRButtonText>
      </GRView>
    </GRFlexView>
  );
};

export default FilterSearch;
