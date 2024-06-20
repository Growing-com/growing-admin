import GRTab from "@component/atom/GRTab";
import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import HeaderView from "@component/molecule/view/HeaderView";
import NewFamilyLineUpModal from "@component/pageComponents/department/management/newfamily/NewFamilyLineUpModal";
import NewFamilyPromoteModal from "@component/pageComponents/department/management/newfamily/NewFamilyPromoteModal";
import ColumDateTitleAttendanceRender from "@component/templates/table/ColumDateTitleAttendanceRender";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { getInActiveUser } from "api/account";
import { useAttendanceQuery } from "api/attendance/queries/useAttendanceQuery";
import { tAttendanceSearch } from "api/attendance/types";
import queryKeys from "api/queryKeys";
import { useTermNewFamily } from "api/term/queries/useTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_DATE_FOMAT, getSundayRangeDate } from "utils/DateUtils";
import {
  INFO_COLUMNS,
  LINEOUT_COLUMNS,
  PROMOTE_COLUMNS
} from "utils/newfamily/constants";

const ManagementNewFamilyPage: NextPage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedNewFamily, setSelectedNewFamily] = useState<tTermNewFamily[]>(
    []
  );
  const [openPromoteModal, setOpenPromoteModal] = useState<boolean>(false);
  const [openLineUpModal, setOpenLineUpModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("info");
  const [filteredNewFamilyData, setFilteredNewFamilyData] = useState<any[]>([]);
  const [filter, setFilter] = useState<tAttendanceSearch>();

  // query 이해필요
  const { data: newFamilyData } = useTermNewFamily({ termId: 1 });

  const { data: attendanceList, isFetching } = useAttendanceQuery(filter);

  useEffect(() => {
    setFilter({
      startDate: dayjs(dayjs().subtract(1, "M")).format(DEFAULT_DATE_FOMAT),
      endDate: dayjs(dayjs()).format(DEFAULT_DATE_FOMAT),
      isNewOnly: true,
      page: 1,
      size: 10
    });
  }, [attendanceList]);

  const searchWeek = useMemo(
    () => getSundayRangeDate(filter?.startDate, filter?.endDate),
    [filter]
  );

  const { data: inActiveUser } = useQuery(
    [queryKeys.IN_ACTIVE_USERS],
    async () => await getInActiveUser(),
    { select: _data => _data.content }
  );

  const newFamilyTabOption = [
    {
      label: "새가족",
      value: "info"
    },
    {
      label: "출석",
      value: "attendance"
    },
    {
      label: "등반",
      value: "promote"
    },
    {
      label: "라인아웃",
      value: "lineout"
    }
  ];
  const columns: Record<string, ColumnType<any>[]> = {
    info: INFO_COLUMNS,
    attendance: [
      {
        title: "이름",
        dataIndex: "name",
        key: "name",
        align: "center",
        width: "8rem",
        render: (_, recode) => <GRText>{recode.userName}</GRText>
      },
      {
        ...(ColumDateTitleAttendanceRender({
          attendanceList: attendanceList?.content,
          weeks: searchWeek
        }) as any)
      }
    ],
    promote: PROMOTE_COLUMNS,
    lineout: LINEOUT_COLUMNS
  };

  const onClickCreateNewFamily = () => {
    router.push("/department/management/newfamily/create");
  };

  const onChangeTab = (value: string) => {
    setSearchText("");
    setCurrentTab(value);
  };

  const onChangeSearchText = useCallback(
    (_searchText: string) => {
      setSearchText(_searchText);
      if (newFamilyData) {
        let _filterNewFamily = newFamilyData;
        if (_searchText) {
          _filterNewFamily = newFamilyData.filter(newFamily => {
            if (newFamily.name?.indexOf(_searchText) !== -1) {
              return newFamily;
            }
            return null;
          });
        }
        setFilteredNewFamilyData(_filterNewFamily);
      }
    },
    [newFamilyData]
  );

  const onClickPromote = () => {
    setOpenPromoteModal(true);
  };

  const onClickPromoteClose = () => {
    setOpenPromoteModal(false);
  };

  const onClickLineUp = () => {
    setOpenLineUpModal(true);
  };

  const onClickLineUpClose = () => {
    setOpenLineUpModal(false);
  };

  const onClickReturn = () => {
    alert("복귀");
  };

  const rowSelection: TableRowSelection<tTermNewFamily> = {
    onChange: (
      _selectedRowKeys: React.Key[],
      _selectedRows: tTermNewFamily[]
    ) => {
      console.log(
        `_selectedRowKeys: ${_selectedRowKeys}`,
        "_selectedRows: ",
        _selectedRows
      );
      setSelectedNewFamily(_selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: currentTab === "promote",
      name: record.name
    })
  };

  useEffect(() => {
    if (newFamilyData) {
      setFilteredNewFamilyData(newFamilyData);
    }
  }, [newFamilyData]);

  useEffect(() => {
    let _filteredData: any[] = newFamilyData || [];

    switch (currentTab) {
      case "info":
        _filteredData = _filteredData.filter(item => !item.lineupDate);
        break;
      case "attendance":
        if (attendanceList?.content) {
          _filteredData = attendanceList.content;
        }
        break;
      case "promote":
        _filteredData = _filteredData.filter(item => item.lineupDate);
        break;
      case "lineout":
        if (inActiveUser) {
          _filteredData = inActiveUser;
        }
        break;
      default:
        break;
    }
    setFilteredNewFamilyData(_filteredData);
  }, [newFamilyData, currentTab]);

  const router = useRouter();
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
        <GRTab items={newFamilyTabOption} onChange={onChangeTab}></GRTab>
        <GRFlexView
          alignItems={"flex-start"}
          flexDirection={"row"}
          marginbottom={1}
        >
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
            {/* GRTable 헤더 컴포넌트로 작성해도 될듯 */}
            {currentTab !== "lineout" ? (
              <>
                <GRInfoBadge
                  infoMessage={`*등반: \n*라인업:`}
                  fontSize={"1rem"}
                />
                <GRButtonText
                  onClick={onClickPromote}
                  buttonType={"secondary"}
                  size={"small"}
                  borderRadius={"15px"}
                  marginright={0.5}
                  // 등반 탭일경우 등반버튼 비활성
                  // disabled={currentTab == "promote" ? true : false}
                >
                  등반
                </GRButtonText>
                <GRButtonText
                  onClick={onClickLineUp}
                  size={"small"}
                  width={"5rem"}
                  borderRadius={"15px"}
                >
                  라인업
                </GRButtonText>
              </>
            ) : (
              <>
                <GRInfoBadge infoMessage={`*복귀:`} fontSize={"1rem"} />
                <GRButtonText
                  onClick={onClickReturn}
                  buttonType={"custom"}
                  backgroundColor={"#6E02F7"}
                  textColor={"white"}
                  size={"small"}
                  borderRadius={"15px"}
                  marginright={0.5}
                >
                  복귀
                </GRButtonText>
              </>
            )}
          </GRFlexView>
        </GRFlexView>
        <GRTable
          rowKey={record => record.teamMemberId}
          // {...(currentTab !== "lineout" && { rowSelection })}
          rowSelection={rowSelection}
          columns={columns[currentTab]}
          data={filteredNewFamilyData}
          pagination={{
            total: filteredNewFamilyData?.length,
            defaultPageSize: 10,
            position: ["bottomCenter"]
          }}
          scroll={{ x: 1300 }}
        />
      </GRContainerView>
      <NewFamilyPromoteModal
        open={openPromoteModal}
        onClose={onClickPromoteClose}
        newFamilyList={selectedNewFamily}
      ></NewFamilyPromoteModal>
      <NewFamilyLineUpModal
        open={openLineUpModal}
        onClose={onClickLineUpClose}
        newFamilyList={selectedNewFamily}
      ></NewFamilyLineUpModal>
    </>
  );
};

export default ManagementNewFamilyPage;
