import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import { FC, useCallback, useState } from "react";

type tSearchBar = {
  onClickSearch: (searchText?: string) => void;
};
const SearchBar: FC<tSearchBar> = ({ onClickSearch }) => {
  const [searchText, setSearchText] = useState("");

  const onClickSearchButton = useCallback(() => {
    onClickSearch(searchText);
  }, [onClickSearch, searchText]);

  const onChangeSearchText = useCallback((e: string) => {
    setSearchText(e);
  }, []);

  useKeyPressEventListener("Enter", () => {
    onClickSearchButton();
  });

  return (
    <GRFlexView
      alignItems={"center"}
      flexDirection={"row"}
      marginhorizontal={1}
    >
      <GRText marginright={1} weight={"bold"}>
        검색
      </GRText>
      <GRTextInput
        style={{ flex: 1 }}
        value={searchText}
        marginright={2}
        placeholder={"이름, 전화번호로 검색 하세요."}
        onChange={onChangeSearchText}
      />
      <GRButtonText onClick={onClickSearchButton} size={"large"}>
        조회
      </GRButtonText>
    </GRFlexView>
  );
};

export default SearchBar;
