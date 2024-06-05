import GRTab from "@component/atom/GRTab";
import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import HeaderView from "@component/molecule/view/HeaderView";
import { ColumnType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { useTermNewFamily } from "api/term/queries/useTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import { DUTY_NAME, SEX_NAME } from "config/const";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

const ManagementNewFamilyPage: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [openPromoteModal, setOpenPromoteModal] = useState(false);
  const [openLineUpModal, setOpenLineUpModal] = useState(false);
  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tTermNewFamily[]
  >([]);

  // query 이해필요
  const { data: newFamilyData } = useTermNewFamily({ termId: 1 });

  /* value에 스트링으로 구분이 필요할만큼 많은 탭이 있지 않기에 number로 인덱스 구성, 
  탭이 많아져 구분이 필요하거나, 빠른 선택을 위해서는 string으로 구성해야 할 듯 */
  // value값을 string으로 구성하고 싶은데 어떤 단어로 할지 보류라 일단 number
  const newFamilyTabOption = [
    {
      value: 0,
      label: "새가족"
    },
    {
      value: 1,
      label: "출석"
    },
    {
      value: 2,
      label: "등반"
    },
    {
      value: 3,
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
        return record?.birth !== null && record?.birth !== "1970-01-01"
          ? record?.birth
          : "-";
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
      }
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
    }
  ];

  // Todo: 지체 생성 페이지로 보내야 함
  const onClickCreateNewFamily = () => {
    alert("NewFamily");
  };
  const onChangeSearchText = useCallback((e: string) => {
    setSearchText(e);
  }, []);

  // Todo: 등반 모달
  const onClickPromote = () => {
    alert("등반");
    setOpenPromoteModal(true);
  };

  // Todo: 라인업 모달
  const onClickLineUp = () => {
    alert("라인업");
    setOpenLineUpModal(true);
  };

  // any말고 데이터 타입 구조 넣어야 됨
  const rowSelection: TableRowSelection<any> = {
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
      <HeaderView
        title={"새가족 관리"}
        showIcon={false}
        headerComponent={
          <GRButtonText onClick={onClickCreateNewFamily} size={"large"}>
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
          {/* Todo: 검색 */}
          <GRTextInput
            style={{ flex: "0 1 25%" }}
            value={searchText}
            placeholder={"이름으로 검색하세요."}
            onChange={onChangeSearchText}
          />
          <GRFlexView
            flexDirection={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <GRInfoBadge infoMessage={`*등반: \n*라인업:`} fontSize={"1rem"} />
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
              size={"large"}
              borderRadius={"15px"}
            >
              라인업
            </GRButtonText>
          </GRFlexView>
        </GRFlexView>
        <GRTable
          rowKey={"name"}
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
      {/* Todo: 등반 모달 생성  */}

      {/* Todo: 라인업 모달 생성 */}

    </>
  );
};

export default ManagementNewFamilyPage;
