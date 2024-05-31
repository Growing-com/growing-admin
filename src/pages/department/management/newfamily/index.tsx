import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import HeaderView from "@component/molecule/view/HeaderView";
import NewFamilyDetailModal from "@component/pageComponents/department/management/newfamily/NewFamilyDetailModal";
import NewFamilyLineOutListModal from "@component/pageComponents/department/management/newfamily/NewFamilyLineOutListModal";
import SearchBar from "@component/templates/SearchBar";
import TableInfoHeader from "@component/templates/table/TableInfoHeader";
import { ColumnType } from "antd/es/table";
import { useTermNewFamily } from "api/term/queries/useTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Color } from "styles/colors";
import { dateSorter, koreanSorter } from "utils/sorter";

const ManagementNewFamilyPage: NextPage = () => {
  // const [openNewFamilyLineOutListModal, setOpenNewFamilyLineOutListModal] =
  //   useState(false);
  // const onClickLineOutClose = () => {
  //   setOpenNewFamilyLineOutListModal(false);
  // };
  const [searchText, setSearchText] = useState("");
  const [openPromoteModal, setOpenPromoteModal] = useState(false);
  const [openLineUpModal, setLineUpModal] = useState(false);
  const onClickCreateNewFamily = () => {
    alert("NewFamily");
  };
  const onChangeSearchText = useCallback((e: string) => {
    setSearchText(e);
  }, []);

  // const onClickSearch = () => {
  //   alert("search!");
  // };
  const onClickPromote = () => {
    alert("등반");
    // setOpenPromoteModal(true);
  };
  const onClickLineUp = () => {
    alert("라인업");
    // setLineUpModal(true);
  };

  return (
    <>
      {/* title 속성에 {}를 붙임은 JS문법을 쓴다는 뜻인데 string 인데 굳이 써야할까? 차이가 있나? 통일성?
      titleInfo는 ReactNode 타입 */}
      <HeaderView
        title="새가족 관리"
        // titleInfo={"현재 텀 새가족 리스트"}
        showIcon={false}
        headerComponent={
          <GRButtonText
            onClick={onClickCreateNewFamily}
            // buttonType={"default"}
            size={"large"}
          >
            지체 등록
          </GRButtonText>
        }
      ></HeaderView>
      <GRContainerView>
        <GRFlexView alignItems={"flex-start"}>
          {/* /Todo : 탭에 따라 내용 변경 */}
          새가족, 출석, 등반, 라인아웃
          {/* 새가족 탭에 구성될 것들 */}
          {/* <SearchBar onClickSearch={onClickSearch}></SearchBar> */}
          <GRFlexView alignItems={"flex-start"}>
            <GRFlexView alignItems={"flex-start"} flexDirection={"row"}>
              {/* /Todo: 텍스트바 크기조절  */}

              <GRTextInput
                style={{ flex: 1 }}
                value={searchText}
                marginright={2}
                placeholder={"이름으로 검색 하세요."}
                onChange={onChangeSearchText}
              />

              <GRView flexDirection={"row"}>
                {/* 왜 row 안먹어 ㅡㅡ flex설정 어디서하지*/}
                {/* /Todo: 마진하고 패딩값 설정 */}
                <GRInfoBadge infoMessage={`등반: \n라인업:`} />

                <GRButtonText
                  onClick={onClickPromote}
                  buttonType={"secondary"}
                  size={"large"}
                >
                  등반
                </GRButtonText>
                <GRButtonText
                  onClick={onClickLineUp}
                  // buttonType={"default"}
                  size={"large"}
                >
                  라인업
                </GRButtonText>
              </GRView>
            </GRFlexView>
            <GRTable></GRTable>
          </GRFlexView>
        </GRFlexView>
      </GRContainerView>

      {/* <NewFamilyLineOutListModal
        open={openNewFamilyLineOutListModal}
        onClose={onClickLineOutClose}
      /> */}
    </>
  );
};

export default ManagementNewFamilyPage;
