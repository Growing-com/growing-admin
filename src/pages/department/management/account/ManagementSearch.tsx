import GRButtonText from "@component/base/button/GRTextButton";
import GRText from "@component/base/text/GRText";
import GRTextInput from "@component/base/text/GRTextInput";
import GRFlexView from "@component/base/view/GRFlexView";
import { useCallback } from "react";

const ManagementSearch = () => {
  const onClickSearch = useCallback(() => {
    console.log("onClickSearch");
  }, []);

  return (
    <GRFlexView alignItems={"center"} flexDirection={"row"}>
      <GRText marginRight={1} weight={"bold"} fontSize={"b5"}>
        검색
      </GRText>
      <GRTextInput
        marginRight={2}
        placeholder={"이름, 전화 번호로 검색 하세요."}
      />
      <GRButtonText onClick={onClickSearch}>조회</GRButtonText>
    </GRFlexView>
  );
};

export default ManagementSearch;
