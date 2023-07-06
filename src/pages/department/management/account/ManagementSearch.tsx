import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import { ChangeEvent, FC, useCallback, useState } from "react";
type tManagementSearch = {
  onClickSearch: (searchText: string) => void;
};
const ManagementSearch: FC<tManagementSearch> = ({ onClickSearch }) => {
  const [searchText, setSearchText] = useState("");

  const onClickSearchButton = useCallback(() => {
    if (searchText) {
      onClickSearch(searchText);
    }
  }, [onClickSearch, searchText]);

  const onChangeSearchText = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  return (
    <GRFlexView alignItems={"center"} flexDirection={"row"}>
      <GRText marginright={1} weight={"bold"} fontSize={"b5"}>
        검색
      </GRText>
      <GRTextInput
        marginright={2}
        placeholder={"이름, 전화 번호로 검색 하세요."}
        onChange={onChangeSearchText}
      />
      <GRButtonText onClick={onClickSearchButton} size={"large"}>
        조회
      </GRButtonText>
    </GRFlexView>
  );
};

export default ManagementSearch;
