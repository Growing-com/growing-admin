import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import NewFamilyDetailModal from "@component/pages/department/management/newfamily/NewFamilyDetailModal";
import NewFamilyLineOutListModal from "@component/pages/department/management/newfamily/NewFamilyLineOutListModal";
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
      sorter: (valueA, valueB) =>
        dateSorter(dayjs(valueA.visitDate), dayjs(valueB.visitDate)),
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
    // {
    //   title: "기타 사항",
    //   dataIndex: "etc",
    //   key: "etc",
    //   align: "center",
    //   width: "8rem",
    //   onCell: () => ({ onClick: e => e.stopPropagation() }),
    //   render: (_, record) => (
    //     <ColumPopoverRender content={record?.etc} label={"내용"} />
    //   )
    // },
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

  const onCloseNewFamilyModal = () => {
    setOpenNewFamilyModal(false);
    setSelectedNewFamily(undefined);
  };

  const onClickCreateNewFamilyModal = () => {
    setSelectedNewFamily(undefined);
    setOpenNewFamilyModal(true);
  };

  const onRegister = () => {
    setSelectedNewFamily(undefined);
    setOpenNewFamilyModal(false);
    refetch();
  };

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

  const onClickLineOut = () => {
    setOpenNewFamilyLineOutListModal(true);
  };

  const onClickLineOutClose = () => {
    setOpenNewFamilyLineOutListModal(false);
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
              <TableInfoHeader
                count={filteredNewFailyData.length}
                totalCount={filteredNewFailyData.length}
                title={"새가족 리스트"}
              />
              <GRView onClick={onClickLineOut}>
                <GRText
                  color={Color.grey80}
                  style={{ textDecoration: "underline" }}
                >
                  라인 아웃 리스트
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
      {openNewFamilyModal && (
        <NewFamilyDetailModal
          open={openNewFamilyModal}
          newFamily={selectedNewFamily}
          onClose={onCloseNewFamilyModal}
          onRegister={onRegister}
        />
      )}
      <NewFamilyLineOutListModal
        open={openNewFamilyLineOutListModal}
        onClose={onClickLineOutClose}
      />
    </>
  );
};

export default ManagementNewFamilyPage;
