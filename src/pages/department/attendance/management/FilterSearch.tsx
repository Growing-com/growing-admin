import GRButtonText from "@component/base/button/GRTextButton";
import GRDatePicker from "@component/base/dataEntry/GRDatePicker";
import GRSelect from "@component/base/dataEntry/GRSelect";
import GRText from "@component/base/text/GRText";
import GRTextInput from "@component/base/text/GRTextInput";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

type tSearchFilter = "name" | "cordi";

const SEARCH_OPTION = [
  {
    label: "이름",
    value: "name"
  },
  {
    label: "코디",
    value: "cordi"
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
      setFilterDate(prev => ({
        ...prev,
        [changeKey]: value
      }));
    },
    []
  );

  return (
    <GRFlexView flexDirection={"row"}>
      <GRFlexView>
        <GRFlexView
          flexDirection={"row"}
          alignItems={"center"}
          marginBottom={1}
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
          <GRText marginHorizontal={1}>~</GRText>
          <GRDatePicker
            width={10}
            picker={"week"}
            onChange={value => onChangeDate("endDate", value)}
            defaultValue={filterDate.endDate}
          />
          <GRText marginLeft={1} weight={"bold"} fontSize={"b5"} width={5}>
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
        <GRButtonText onClick={onClickSearch} marginLeft={2}>
          조회
        </GRButtonText>
      </GRView>
    </GRFlexView>
  );
};

export default FilterSearch;
