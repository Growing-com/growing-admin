import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import TableInfoHeader from "@component/templates/table/TableInfoHeader";
import { TableColumnsType } from "antd";
import { tLeader } from "api/term/type";
import { DUTY, SEX_NAME } from "config/const";

import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tFilterOption = {
  text: string;
  value: string;
};

const LeadersPage: NextPage = () => {
  const [codyFilterOptions, setCodyFilterOptions] = useState<tFilterOption[]>(
    []
  );
  const [dutyFilterOptions, setDutyFilterOptions] = useState<tFilterOption[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<tLeader[]>([]);

  const { currentTermAllLeaderGroup: leaderdata } = useCurrentTerm();
  const { currentTermDutyCount } = useCurrentTerm();

  const totalLeadersCount = currentTermDutyCount
    ? currentTermDutyCount.pastorCount +
      currentTermDutyCount.codyCount +
      currentTermDutyCount.smallGroupLeaderCount +
      currentTermDutyCount.newFamilyGroupLeaderCount
    : 0;

  // 필터 옵션 설정
  useEffect(() => {
    if (!leaderdata) return;
    const uniqueCodyNames = [
      ...new Set(leaderdata.map(leader => leader.codyName))
    ];
    const _codyFilterOptions = uniqueCodyNames?.map(name => ({
      text: name ?? "",
      value: name ?? ""
    }));
    setCodyFilterOptions(_codyFilterOptions);

    const uniqueDuty = [...new Set(leaderdata.map(leader => leader.duty))];
    const _dutyFilterOptions = uniqueDuty?.map(duty => ({
      text: DUTY[duty as string] ?? "",
      value: duty ?? ""
    }));
    setDutyFilterOptions(_dutyFilterOptions);
  }, [leaderdata]);

  useEffect(() => {
    if (!leaderdata) return;
    setFilteredData(leaderdata);
  }, [leaderdata]);

  const columns: TableColumnsType<any> = [
    {
      title: "직분",
      dataIndex: "duty",
      key: "duty",
      align: "center",
      width: "5rem",
      minWidth: 90,
      filters: dutyFilterOptions,
      onFilter: (value, record) => record.duty === value,
      render: (_, item) => {
        if (!item?.duty) return;
        return <GRText>{DUTY[item?.duty]}</GRText>;
      },
      sorter: {
        compare: (a, b) => koreanSorter(DUTY[a.duty], DUTY[b.duty]),
        multiple: 6
      }
    },
    {
      title: "코디",
      dataIndex: "codyName",
      key: "codyName",
      align: "center",
      width: "6rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => koreanSorter(a.codyName, b.codyName),
        multiple: 5
      },
      filters: codyFilterOptions,
      onFilter: (value, record) => record.codyName === value,
      render: (_, item) => {
        return <GRText weight={"bold"}>{item.codyName}</GRText>;
      }
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      minWidth: 75,
      fixed: "left",
      width: "6rem",
      sorter: {
        compare: (a, b) => koreanSorter(a.name, b.name),
        multiple: 4
      }
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "4rem",
      minWidth: 60,
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      },
      sorter: {
        compare: (a, b) => koreanSorter(SEX_NAME[a.sex], SEX_NAME[b.sex]),
        multiple: 3
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "4rem",
      minWidth: 60,
      sorter: { compare: (a, b) => a.grade - b.grade, multiple: 2 }
    },
    {
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      minWidth: 85,
      render: (_, record) => checkDefaultDate(record.birth),
      sorter: {
        compare: (valueA, valueB) => dateSorter(valueA.birth, valueB.birth),
        multiple: 1
      }
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem",
      minWidth: 110
    }
  ];

  const handleChange = (
    _pagination: any,
    filters: any,
    _sorter: any,
    extra: { currentDataSource: any; action: any }
  ) => {
    if (!leaderdata) return;
    if (filters.codyName === null && filters.duty === null) {
      setFilteredData(leaderdata);
      return;
    }
    setFilteredData(extra.currentDataSource);
  };

  return (
    <>
      <HeaderView title="리더 구성원" />
      <GRContainerView>
        <GRFlexView
          flexDirection={"row"}
          alignItems={"end"}
          xGap={1}
          margintop={GRStylesConfig.BASE_LONG_MARGIN}
          marginbottom={GRStylesConfig.BASE_LONG_MARGIN}
          style={{ overflowX: "auto", width: "100%" }}
        >
          <GRView>
            <GRFlexView flexDirection={"row"} alignItems={"end"}>
              <GRText
                fontSize={"b6"}
                marginright={GRStylesConfig.BASE_SMALL_MARGIN}
              >
                전체 인원
              </GRText>
              <GRText fontSize={"b4"} weight={"bold"} marginright={0.1}>
                {totalLeadersCount}
              </GRText>
              <GRText fontSize={"b6"}>명</GRText>
            </GRFlexView>
          </GRView>
          <DutyNumberRender
            dutyName={"PASTOR"}
            count={currentTermDutyCount?.pastorCount}
          />
          <DutyNumberRender
            dutyName={"CODY"}
            count={currentTermDutyCount?.codyCount}
          />
          <DutyNumberRender
            dutyName={"SMALL_GROUP_LEADER"}
            count={currentTermDutyCount?.smallGroupLeaderCount}
          />
          <DutyNumberRender
            dutyName={"NEW_FAMILY_GROUP_LEADER"}
            count={currentTermDutyCount?.newFamilyGroupLeaderCount}
          />
        </GRFlexView>
        <GRView marginbottom={GRStylesConfig.BASE_MARGIN}>
          <TableInfoHeader
            title={"필터된 인원"}
            count={filteredData.length}
            totalCount={leaderdata?.length}
          />
        </GRView>
        <GRTable
          rowKey={"userId"}
          columns={columns}
          data={leaderdata}
          pagination={{
            total: filteredData?.length,
            defaultPageSize: 10,
            position: ["bottomCenter"]
          }}
          onChange={handleChange}
          scroll={{ x: true }}
          tableLayout={"auto"}
        />
      </GRContainerView>
    </>
  );
};

type tDutyNumberRender = {
  dutyName: string;
  count?: number;
};

const DutyNumberRender: React.FC<tDutyNumberRender> = ({ dutyName, count }) => {
  return (
    <GRView>
      <GRFlexView flexDirection={"row"} alignItems={"end"}>
        <GRText fontSize={"b6"} marginright={GRStylesConfig.BASE_SMALL_MARGIN}>
          {DUTY[dutyName]}
        </GRText>
        <GRText fontSize={"b4"} weight={"bold"} marginright={0.1}>
          {count ?? 0}
        </GRText>
        <GRText fontSize={"b6"}>명</GRText>
      </GRFlexView>
    </GRView>
  );
};

export default LeadersPage;
