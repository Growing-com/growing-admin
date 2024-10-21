import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import HeaderView from "@component/molecule/view/HeaderView";
import { TableColumnsType } from "antd";
import { tLeader } from "api/term";
import { DUTY, SEX_NAME } from "config/const";

import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { checkDefaultDate } from "utils/DateUtils";
import { koreanSorter } from "utils/sorter";

type tFilterOption = {
  text: string;
  value: string;
};
type tDuty = { [key: string]: number };

const LeadersPage: NextPage = () => {
  const [codyFilterOptions, setCodyFilterOptions] = useState<tFilterOption[]>(
    []
  );
  const [dutyFilterOptions, setDutyFilterOptions] = useState<tFilterOption[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<tLeader[]>([]);
  const [numberByDuty, setNumberByDuty] = useState<tDuty>({});

  const { currentTermAllLeaderGroup: leaderdata } = useCurrentTerm();

  // 필터 옵션 설정
  useEffect(() => {
    if (!leaderdata) return;
    const uniqueCodyNames = [
      ...new Set(leaderdata.map(leader => leader.codyName))
    ];
    const _codyFilterOptions = uniqueCodyNames?.map(name => ({
      text: name || "",
      value: name || ""
    }));
    setCodyFilterOptions(_codyFilterOptions);

    const uniqueDuty = [...new Set(leaderdata.map(leader => leader.duty))];
    const _dutyFilterOptions = uniqueDuty?.map(duty => ({
      text: DUTY[duty as string] || "",
      value: duty || ""
    }));
    setDutyFilterOptions(_dutyFilterOptions);
  }, [leaderdata]);

  useEffect(() => {
    if (!leaderdata) return;
    setFilteredData(leaderdata);
    const _numberByDuty = {
      PASTOR: leaderdata.filter(leader => leader.duty === "PASTOR").length,
      GANSA: leaderdata.filter(leader => leader.duty === "GANSA").length,
      CODY: leaderdata.filter(leader => leader.duty === "CODY").length,
      SMALL_GROUP_LEADER: leaderdata.filter(
        leader => leader.duty === "SMALL_GROUP_LEADER"
      ).length,
      NEW_FAMILY_GROUP_LEADER: leaderdata.filter(
        leader => leader.duty === "NEW_FAMILY_GROUP_LEADER"
      ).length
    };
    setNumberByDuty(_numberByDuty);
  }, [leaderdata]);

  const columns: TableColumnsType<any> = [
    {
      title: "직분",
      dataIndex: "duty",
      key: "duty",
      align: "center",
      width: "5rem",
      filters: dutyFilterOptions,
      onFilter: (value, record) => record.duty === value,
      render: (_, item) => {
        if (!item?.duty) return;
        return <GRText>{DUTY[item?.duty]}</GRText>;
      },
      sorter: (a, b) => {
        return koreanSorter(DUTY[a.duty], DUTY[b.duty]);
      }
    },
    {
      title: "코디",
      dataIndex: "codyName",
      key: "codyName",
      align: "center",
      width: "6rem",
      sorter: (a, b) => {
        return koreanSorter(a.codyName, b.codyName);
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
      fixed: "left",
      width: "6rem",
      sorter: (a, b) => {
        return koreanSorter(a.name, b.name);
      }
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "4rem",
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      },
      sorter: (a, b) => {
        return koreanSorter(SEX_NAME[a.sex], SEX_NAME[b.sex]);
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "4rem",
      sorter: (a, b) => a.grade - b.grade
    },
    {
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.birth)
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
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
      <HeaderView title="부서 리더 구성원" />
      <GRContainerView>
        <GRFlexView
          flexDirection={"row"}
          alignItems={"end"}
          xGap={1}
          marginbottom={0.5}
        >
          <GRView>
            <GRFlexView flexDirection={"row"} alignItems={"end"}>
              <GRText fontSize={"b6"} marginright={0.3}>
                전체 인원
              </GRText>
              <GRText fontSize={"b4"} weight={"bold"} marginright={0.1}>
                {leaderdata?.length}
              </GRText>
              <GRText fontSize={"b6"}>명</GRText>
            </GRFlexView>
          </GRView>
          <DutyNumberRender
            duty={"PASTOR"}
            dutyName={DUTY["PASTOR"]}
            data={numberByDuty}
          />
          <DutyNumberRender
            duty={"GANSA"}
            dutyName={DUTY["GANSA"]}
            data={numberByDuty}
          />
          <DutyNumberRender
            duty={"CODY"}
            dutyName={DUTY["CODY"]}
            data={numberByDuty}
          />
          <DutyNumberRender
            duty={"SMALL_GROUP_LEADER"}
            dutyName={DUTY["SMALL_GROUP_LEADER"]}
            data={numberByDuty}
          />
          <DutyNumberRender
            duty={"NEW_FAMILY_GROUP_LEADER"}
            dutyName={DUTY["NEW_FAMILY_GROUP_LEADER"]}
            data={numberByDuty}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"} alignItems={"end"} marginbottom={0.5}>
          <GRText fontSize={"b6"} marginright={0.3}>
            필터된 사람
          </GRText>
          <GRText fontSize={"b4"} weight={"bold"} marginright={0.1}>
            {filteredData?.length}
          </GRText>
          <GRText fontSize={"b6"}>명</GRText>
        </GRFlexView>
        <GRTable
          rowKey={"userId"}
          columns={columns}
          data={leaderdata}
          pagination={{
            total: filteredData?.length,
            defaultPageSize: 15,
            position: ["bottomCenter"]
          }}
          onChange={handleChange}
        />
      </GRContainerView>
    </>
  );
};

type tDutyNumberRender = {
  dutyName: string;
  duty: string;
  data: tDuty;
};

const DutyNumberRender: React.FC<tDutyNumberRender> = ({
  dutyName,
  duty,
  data
}) => {
  return (
    <GRView>
      <GRFlexView flexDirection={"row"} alignItems={"end"}>
        <GRText fontSize={"b6"} marginright={0.3}>
          {dutyName}
        </GRText>
        <GRText fontSize={"b4"} weight={"bold"} marginright={0.1}>
          {data[duty]}
        </GRText>
        <GRText fontSize={"b6"}>명</GRText>
      </GRFlexView>
    </GRView>
  );
};

export default LeadersPage;
