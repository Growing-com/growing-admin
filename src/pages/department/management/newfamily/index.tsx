import GRTab from "@component/atom/GRTab";
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
import { TableRowSelection } from "antd/es/table/interface";
import { useTermNewFamily } from "api/term/queries/useTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import { DUTY, DUTY_NAME, SEX_NAME } from "config/const";
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
  // const [openPromoteModal, setOpenPromoteModal] = useState(false);
  // const [openLineUpModal, setLineUpModal] = useState(false);
  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tTermNewFamily[]
  >([]);

  // query 이해필요
  const { data: newFamilyData } = useTermNewFamily({ termId: 1 });

  const newFamilyTabOption = [
    {
      value: "0",
      label: "새가족"
    },
    {
      value: "1",
      label: "출석"
    },
    {
      value: "2",
      label: "등반"
    },
    {
      value: "3",
      label: "라인아웃"
    }
  ];
  const columns: ColumnType<tTermNewFamily>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem"
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      width: "5rem",
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        return record?.birth !== "1970-01-01" ? record?.birth : "-";
      }
    },
    {
      title: "직분",
      dataIndex: "duty",
      key: "duty",
      align: "center",
      width: "10rem",
      render: (_, item) => {
        if (!item?.duty) return;
        return DUTY_NAME[item?.duty];
        // 성별하고 생년월일하고 render 방식 차이? undefined 검증, GRText 사용 이유?
        // return <GRText>{DUTY[item?.duty]}</GRText>;
      }
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
    }
    // {
    //   title: "방문일",
    //   dataIndex: "visitDate",
    //   key: "visitDate",
    //   align: "center",
    //   width: "8rem",
    //   sorter: (valueA, valueB) =>
    //     dateSorter(dayjs(valueA.visitDate), dayjs(valueB.visitDate)),
    //   render: (_, record) => {
    //     return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
    //   }
    // },

    // {
    //   title: "새가족 순장",
    //   dataIndex: "newTeamLeaderName",
    //   key: "newTeamLeaderName",
    //   align: "center",
    //   width: "6rem"
    // },
    // {
    //   title: "등반 순장",
    //   align: "center",
    //   dataIndex: "firstPlantLeaderName",
    //   width: "8rem",
    //   sorter: (a, b) =>
    //     koreanSorter(a.firstPlantLeaderName, b.firstPlantLeaderName)
    // },
    // {
    //   title: "등반일",
    //   align: "center",
    //   width: "8rem",
    //   render: (_, record) => {
    //     if (!record.lineoutDate && !record.lineupDate) return "";
    //     const date = record.lineoutDate
    //       ? record.lineoutDate
    //       : record.lineupDate;
    //     return <GRText weight={"bold"}>{date}</GRText>;
    //   }
    // }
  ];

  // 클릭 시 정보 표시
  // const onClickRow = useCallback((_newFamily?: tTermNewFamily) => {
  //   setSelectedNewFamily(_newFamily);
  //   setOpenNewFamilyModal(true);
  // }, []);

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

  // any말고 데이터 타입 구조 넣어야 됨
  const rowSelection: TableRowSelection<any> = {
    // onChange: (selectedRowKeys, selectedRows) => {
    //   console.log('Selected Row Keys: ', selectedRowKeys);
    //   console.log('Selected Rows: ', selectedRows);
    // },
    getCheckboxProps: record => ({
      disabled: record.name === "Disabled User",
      name: record.name
    })
  };

  useEffect(() => {
    if (newFamilyData) {
      setFilteredNewFailyData(newFamilyData);
    }
  }, [newFamilyData]);

  return (
    <>
      {/* title 속성에 {}를 붙임은 JS문법을 쓴다는 뜻인데 string 인데 굳이 써야할까? 차이가 있나? 통일성?
      titleInfo는 ReactNode 타입 */}
      <HeaderView
        title="새가족 관리"
        // title={"새가족 관리"}
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
        {/* /Todo : 탭에 따라 내용 변경 */}
        <GRTab items={newFamilyTabOption}></GRTab>

        <GRFlexView
          alignItems={"flex-start"}
          flexDirection={"row"}
          marginbottom={1}
        >
          {/* /Todo: 텍스트바 크기조절  */}
          <GRTextInput
            style={{ flex: 1 }}
            value={searchText}
            marginright={2}
            placeholder={"이름으로 검색 하세요."}
            onChange={onChangeSearchText}
          />
          <GRFlexView flexDirection={"row"} justifyContent={"flex-end"}>
            {/* GRFlexView는 row 되고 GRView는 왜 안될까? */}
            {/* /Todo: 뱃지 가운데 정렬이 안되넹 */}
            <GRInfoBadge
              infoMessage={`*등반: \n*라인업:`}
              fontSize={"1rem"}
              // alignItems={"center"}
            />
            <GRButtonText
              onClick={onClickPromote}
              buttonType={"secondary"}
              size={"large"}
              marginright={0.5}
              borderRadius={"15px"}
            >
              등반
            </GRButtonText>
            <GRButtonText
              onClick={onClickLineUp}
              // buttonType={"default"}
              size={"large"}
              borderRadius={"15px"}
            >
              라인업
            </GRButtonText>
          </GRFlexView>
        </GRFlexView>
        <GRTable
          rowKey={"name"}
          // onRow={record => ({
          //   onClick: () => onClickRow(record)
          // })}
          rowSelection={rowSelection}
          columns={columns}
          data={filteredNewFailyData}
          pagination={{
            total: filteredNewFailyData?.length,
            defaultPageSize: 10,
            position: ["bottomCenter"]
          }}
          scroll={{ x: 1300 }}
        />
      </GRContainerView>

      {/* <NewFamilyLineOutListModal
        open={openNewFamilyLineOutListModal}
        onClose={onClickLineOutClose}
      /> */}
    </>
  );
};

export default ManagementNewFamilyPage;
