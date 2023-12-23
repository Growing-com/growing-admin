import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import { FC, ReactNode, useCallback, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

type tSearchBar = {
  onClickSearch: (searchText?: string) => void;
  filterComponent?: ReactNode;
};

const SearchBar: FC<tSearchBar> = ({ onClickSearch, filterComponent }) => {
  const [searchText, setSearchText] = useState("");
  const [isShowFilter, setIsShowFilter] = useState(true);

  const onClickSearchButton = useCallback(() => {
    onClickSearch(searchText);
  }, [onClickSearch, searchText]);

  const onChangeSearchText = useCallback((e: string) => {
    setSearchText(e);
  }, []);

  const onClickOpenFilter = () => {
    setIsShowFilter(!isShowFilter);
  };

  useKeyPressEventListener("Enter", () => {
    onClickSearchButton();
  });

  return (
    <GRFlexView>
      <GRFlexView alignItems={"center"} flexDirection={"row"}>
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
        <GRButtonText
          size={"small"}
          buttonType={"default"}
          marginleft={GRStylesConfig.BASE_MARGIN}
          onClick={onClickOpenFilter}
        >
          {isShowFilter ? (
            <CaretUpOutlined rev={undefined} style={{ fontSize: "1rem" }} />
          ) : (
            <CaretDownOutlined rev={undefined} style={{ fontSize: "1rem" }} />
          )}
        </GRButtonText>
      </GRFlexView>
      {isShowFilter && (
        <GRFlexView
          paddingright={GRStylesConfig.BASE_LONG_MARGIN}
          paddingtop={GRStylesConfig.BASE_LONG_MARGIN}
          margintop={GRStylesConfig.BASE_LONG_MARGIN}
          backgroundColor={Color.green100}
          borderRadius={GRStylesConfig.BASE_RADIUS}
          style={{
            overflow: "scroll"
          }}
        >
          {filterComponent}
        </GRFlexView>
      )}
    </GRFlexView>
  );
};

export default SearchBar;
