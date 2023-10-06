import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import useAccountTermInfos from "hooks/domain/term/useAccountTermInfos";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import { FC, useCallback, useMemo } from "react";
import type { Control } from "react-hook-form";

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
  },
  {
    label: "새가족",
    value: "newFamily"
  }
];

type tSearchFilter = "name" | "cordi" | "grade" | "newFamily";

type tAttendanceFilterSearch = {
  onSubmit: () => void;
  control: Control<any, any>;
  searchType: tSearchFilter;
};
const AttendanceFilterSearch: FC<tAttendanceFilterSearch> = ({
  onSubmit,
  control,
  searchType
}) => {
  if (!control) return;
  const { cordiSelectItem } = useAccountTermInfos();

  const renderPlaceHolder = useMemo(() => {
    switch (searchType) {
      case "name":
        return "이름으로 검색하세요";
      case "grade":
        return "학년으로 검색하세요";
      case "cordi":
        return "검색하고 코디을 선택해 주세요";
      default:
        return "검색어를 작성해 주세요";
    }
  }, [searchType]);

  const onClickSearch = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  useKeyPressEventListener("Enter", () => {
    onSubmit();
  });

  return (
    <GRFlexView flexDirection={"row"}>
      <GRFlexView>
        <GRFlexView flexDirection={"row"} alignItems={"center"}>
          <GRText weight={"bold"} fontSize={"b5"} width={5} marginbottom={1}>
            기간
          </GRText>
          <GRFormItem
            type={"date"}
            fieldName={"rangeDate"}
            control={control}
            pickerType={"range"}
          />
          <GRText
            marginleft={1}
            weight={"bold"}
            fontSize={"b5"}
            width={5}
            marginbottom={1}
          >
            검색 조건
          </GRText>
          <GRFormItem
            type={"select"}
            fieldName={"searchType"}
            control={control}
            options={SEARCH_OPTION}
            placeholder={"조건을 선택해주세요"}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"} alignItems={"center"}>
          <GRText weight={"bold"} fontSize={"b5"} width={5} marginbottom={1}>
            조건
          </GRText>
          <GRFormItem
            mode={"multiple"}
            type={"select"}
            fieldName={"codyId"}
            control={control}
            options={cordiSelectItem}
            placeholder={"코디를 선택해주세요"}
            isShow={searchType === "cordi"}
          />
          <GRFormItem
            type={"text"}
            fieldName={"keyword"}
            control={control}
            placeholder={renderPlaceHolder}
            isShow={searchType !== "cordi"}
            disabled={searchType === "newFamily"}
          />
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

export default AttendanceFilterSearch;
