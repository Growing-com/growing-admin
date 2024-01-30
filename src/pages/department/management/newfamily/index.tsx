import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import ColumPopoverRender from "@component/molecule/table/ColumPopoverRender";
import HeaderView from "@component/molecule/view/HeaderView";
import SearchBar from "@component/templates/SearchBar";
import { ColumnType } from "antd/es/table";
import { useTermNewFamily } from "api/term/queries/useTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import { SEX_NAME } from "config/const";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Color } from "styles/colors";
import { koreanSorter } from "utils/sorter";
import NewFamilyDetailModal from "./NewFamilyDetailModal";
import NewFamilyLineOutListModal from "./NewFamilyLineOutListModal";

const LINE_STAUTS = {
  lineout: { name: "라인아웃", color: "red" },
  lineup: { name: "등반", color: "green" }
};

const ManagementNewFamilyPage: NextPage = () => {
  const [selectedNewFamily, setSelectedNewFamily] = useState<tTermNewFamily>();
  const [openNewFamilyModal, setOpenNewFamilyModal] = useState(false);
  const [openNewFamilyLineOutListModal, setOpenNewFamilyLineOutListModal] =
    useState(false);
  const [filteredNewFailyData, setFilteredNewFailyData] = useState<
    tTermNewFamily[]
  >([]);

  const { data: newFamilyData, refetch } = useTermNewFamily({ termId: 1 });

  const columns: ColumnType<tTermNewFamily>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem",
      sorter: (a, b) => koreanSorter(a.name, b.name)
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
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
    },
    {
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
      }
    },

    {
      title: "새가족 순장",
      dataIndex: "newTeamLeaderName",
      key: "newTeamLeaderName",
      align: "center",
      width: "6rem"
    },
    {
      title: "기타 사항",
      dataIndex: "etc",
      key: "etc",
      align: "center",
      width: "8rem",
      onCell: () => ({ onClick: e => e.stopPropagation() }),
      render: (_, record) => (
        <ColumPopoverRender content={record?.etc} label={"내용"} />
      )
    },
    {
      title: "등반 순장",
      align: "center",
      dataIndex: "firstPlantLeaderName",
      width: "8rem",
      sorter: (a, b) =>
        koreanSorter(a.firstPlantLeaderName, b.firstPlantLeaderName)
    },
    {
      title: "등반일",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        if (!record.lineoutDate && !record.lineupDate) return "";
        const date = record.lineoutDate
          ? record.lineoutDate
          : record.lineupDate;
        return <GRText weight={"bold"}>{date}</GRText>;
      }
    }
  ];

  const onClickRow = useCallback((_newFamily?: tTermNewFamily) => {
    setSelectedNewFamily(_newFamily);
    setOpenNewFamilyModal(true);
  }, []);

  const onCloseNewFamilyModal = useCallback(() => {
    setOpenNewFamilyModal(!openNewFamilyModal);
    setSelectedNewFamily(undefined);
  }, [openNewFamilyModal]);

  const onClickCreateNewFamilyModal = useCallback(() => {
    setOpenNewFamilyModal(!openNewFamilyModal);
  }, [openNewFamilyModal]);

  const onRegister = useCallback(() => {
    setOpenNewFamilyModal(!openNewFamilyModal);
    refetch();
  }, [openNewFamilyModal, refetch]);

  const onClickSearch = useCallback(
    (_searchText?: string) => {
      if (newFamilyData?.length) {
        let _filterNewFamily = newFamilyData;
        if (newFamilyData?.length && _searchText) {
          _filterNewFamily = newFamilyData.filter(newFamily => {
            if (
              newFamily.name?.indexOf(_searchText) !== -1 ||
              newFamily.phoneNumber?.indexOf(_searchText) !== -1
            ) {
              return newFamily;
            }
            return null;
          });
        }
        setFilteredNewFailyData(_filterNewFamily);
      }
    },
    [newFamilyData]
  );

  useEffect(() => {
    if (newFamilyData) {
      setFilteredNewFailyData(newFamilyData);
    }
  }, [newFamilyData]);

  return (
    <>
      <HeaderView
        title={"새가족 관리"}
        titleInfo={"현재 텀 새가족 리스트"}
        showIcon={false}
        headerComponent={
          <GRButtonText
            onClick={onClickCreateNewFamilyModal}
            buttonType={"default"}
            size={"large"}
          >
            새가족 등록
          </GRButtonText>
        }
        subComponent={<SearchBar onClickSearch={onClickSearch} />}
      />
      <GRContainerView>
        <GRTable
          rowKey={"name"}
          headerComponent={
            <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
              <GRView>
                <GRText weight={"bold"}>새가족 리스트 </GRText>
                <GRText color={Color.grey60}>
                  <GRText weight={"bold"} color={Color.green200}>
                    {filteredNewFailyData?.length ?? 0} 명
                  </GRText>
                  <GRText marginhorizontal={"0.3"}>/</GRText>
                  <GRText fontSize={"b8"} color={Color.grey80}>
                    총 {newFamilyData?.length ?? 0} 명
                  </GRText>
                </GRText>
              </GRView>
              <GRView>
                <GRText
                  color={Color.grey80}
                  style={{ textDecoration: "underline" }}
                >
                  라인 아웃 목록
                </GRText>
              </GRView>
            </GRFlexView>
          }
          onRow={record => ({
            onClick: () => onClickRow(record)
          })}
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
      <NewFamilyDetailModal
        open={openNewFamilyModal}
        newFamily={selectedNewFamily}
        onClose={onCloseNewFamilyModal}
        onRegister={onRegister}
      />
      <NewFamilyLineOutListModal open={openNewFamilyLineOutListModal} />
    </>
  );
};

export default ManagementNewFamilyPage;
