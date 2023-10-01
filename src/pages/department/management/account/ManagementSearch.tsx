import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import { ChangeEvent, FC, useCallback, useState } from "react";

type tManagementSearch = {
  onClickSearch: (searchText?: string) => void;
};
const ManagementSearch: FC<tManagementSearch> = ({ onClickSearch }) => {
  const [searchText, setSearchText] = useState("");

  const onClickSearchButton = useCallback(() => {
    onClickSearch(searchText);
  }, [onClickSearch, searchText]);

  const onChangeSearchText = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  useKeyPressEventListener("Enter", () => {
    onClickSearchButton();
  });

  return (
    <GRFlexView alignItems={"center"} flexDirection={"row"}>
      <GRText marginright={1} weight={"bold"} fontSize={"b5"}>
        검색
      </GRText>
      <GRTextInput
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

export default ManagementSearch;
