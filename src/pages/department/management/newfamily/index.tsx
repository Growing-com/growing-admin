import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
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
  const [openNewFamilyLineOutListModal, setOpenNewFamilyLineOutListModal] =
    useState(false);
  const onClickLineOutClose = () => {
    setOpenNewFamilyLineOutListModal(false);
  };
  const onClickCreateNewFamily = () => {
    alert("NewFamily");
  };
  const onClickSearch = () => {
    alert("search!");
  };

  return (
    <>
      {/* title 속성에 {}를 붙임은 JS문법을 쓴다는 뜻인데 string 인데 굳이 써야할까? 차이가 있나? 통일성?
      titleInfo는 ReactNode 타입 */}
      <HeaderView
        title="새가족 관리"
        titleInfo={"현재 텀 새가족 리스트"}
        showIcon={false}
        headerComponent={
          <GRButtonText
            onClick={onClickCreateNewFamily}
            buttonType={"default"}
            size={"large"}
          >
            새가족 등록
          </GRButtonText>
        }
        subComponent={<SearchBar onClickSearch={onClickSearch}></SearchBar>}
      ></HeaderView>
      <GRContainerView>
        <GRTable></GRTable>
      </GRContainerView>
      <NewFamilyLineOutListModal
        open={openNewFamilyLineOutListModal}
        onClose={onClickLineOutClose}
      />
    </>
  );
};

export default ManagementNewFamilyPage;
