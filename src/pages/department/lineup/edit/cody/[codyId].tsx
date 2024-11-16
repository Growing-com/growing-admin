import GRTable from "@component/atom/GRTable";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import GRTransferTable, {
  TableTransferProps
} from "@component/molecule/table/GRTransferTable";
import HeaderView from "@component/molecule/view/HeaderView";
import { TableColumnsType } from "antd";
import useCodyMutate from "api/lineup/mutate/useCodyMutate";
import useLeaderByCodyQuery from "api/term/queries/useLeaderByCodyQuery";
import { tGroup, tSmallGroup } from "api/term/type";
import { GROUP_TYPE, SEX_NAME } from "config/const";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { koreanSorter } from "utils/sorter";

type tTableGroup = Omit<tSmallGroup, "smallGroupId"> & {
  key: number;
};

const CodyUpdatePage: NextPage = () => {
  const router = useRouter();
  const { codyId } = router.query;
  const numericId = codyId ? Number(codyId) : null;

  const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);
  const [currentGroupLeaderData, setCurrentGroupLeaderData] = useState<
    tTableGroup[]
  >([]);
  const [differentGroupLeaderData, setDifferentGroupLeaderData] = useState<
    tTableGroup[]
  >([]);

  const { updateCodyMutate } = useCodyMutate();
  const { currentTermCody, currentTermSmallGroupLeader } = useCurrentTerm();

  const foundCody = currentTermCody?.find(cody => cody.codyId === numericId);
  const codyName = foundCody ? foundCody.codyName : "";

  const { leaderByCody } = useLeaderByCodyQuery(numericId as number);

  const newfamilyGroupData = leaderByCody
    ? leaderByCody.filter(group => group.groupType === "NEW_FAMILY_GROUP")
    : [];

  const onClickUpdate = async () => {
    const _currentLeaderIds = currentGroupLeaderData.map(leader => leader.key);
    await updateCodyMutate({
      codyId: numericId as number,
      smallGroupIds: _currentLeaderIds
    });
  };

  const onChange: TableTransferProps<any>["onChange"] = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
    const totalData = [...currentGroupLeaderData, ...differentGroupLeaderData];
    const leftData = totalData.filter(
      item => !nextTargetKeys.includes(item.key)
    );
    const rightData = totalData.filter(item =>
      nextTargetKeys.includes(item.key)
    );
    setCurrentGroupLeaderData(leftData);
    setDifferentGroupLeaderData(rightData);
  };

  const convertToTableGroup = (groups: tGroup[]): tTableGroup[] => {
    return groups.map(group => ({
      key: group.groupId,
      codyName: "",
      leaderName: group.leaderName,
      sex: group.sex,
      grade: group.grade
    }));
  };

  const convertSmallGroupToTableGroup = (
    groups: tSmallGroup[]
  ): tTableGroup[] => {
    return groups.map(group => ({
      key: group.smallGroupId, // groupId를 smallGroupId로 매핑
      codyName: group.codyName,
      leaderName: group.leaderName,
      sex: group.sex,
      grade: group.grade
    }));
  };

  const commonColumns: TableColumnsType<any> = [
    {
      title: "순장 이름",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "5rem",
      minWidth: 75
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "2rem",
      minWidth: 60,
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "2rem",
      minWidth: 60
    }
  ];

  const newfamilyGroupColumns: TableColumnsType<any> = [
    {
      title: "순모임 종류",
      dataIndex: "groupType",
      key: "groupType",
      align: "center",
      width: "5rem",
      render: (_, item) => {
        return <GRText>{GROUP_TYPE[item.groupType]}</GRText>;
      }
    },
    {
      title: "그룹 번호",
      dataIndex: "groupId",
      key: "groupId",
      align: "center",
      width: "2rem"
    },
    ...commonColumns
  ];

  const leftColumns: TableColumnsType<any> = [
    {
      title: "그룹 번호",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "2rem"
    },
    ...commonColumns
  ];

  const rightColumns: TableColumnsType<any> = [
    {
      title: "그룹 번호",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "2rem"
    },
    {
      title: "코디",
      dataIndex: "codyName",
      key: "codyName",
      align: "center",
      width: "3rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => koreanSorter(a.codyName, b.codyName),
        multiple: 2
      }
    },
    ...commonColumns
  ];

  useEffect(() => {
    if (!leaderByCody || !currentTermSmallGroupLeader) return;
    const _currentGroupLeader = leaderByCody.filter(
      leader => leader.groupType !== "NEW_FAMILY_GROUP"
    );
    const _differentSmallGroupLeader = currentTermSmallGroupLeader.filter(
      leader => leader.codyName !== codyName
    );
    const _targetKeys = _differentSmallGroupLeader.map(
      leader => leader.smallGroupId
    );

    const _currentGroup = convertToTableGroup(_currentGroupLeader);
    const _smallGroupData = convertSmallGroupToTableGroup(
      _differentSmallGroupLeader
    );

    setCurrentGroupLeaderData(_currentGroup);
    setDifferentGroupLeaderData(_smallGroupData);
    setTargetKeys(_targetKeys);
  }, [leaderByCody, currentTermSmallGroupLeader]);

  return (
    <>
      <HeaderView
        title={"코디 수정"}
        disabledBackbutton={true}
        subComponent={
          <GRText fontSize={"b2"} weight={"bold"}>
            {codyName} 코디
          </GRText>
        }
      />
      <GRContainerView>
        <GRFlexView
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <GRFlexView
            flexDirection={"row"}
            alignItems={"center"}
            marginvertical={GRStylesConfig.BASE_LONG_MARGIN}
          >
            <GRText fontSize={"b3"}>일반 순모임</GRText>
            <GRInfoBadge
              infoMessage={"소속 순모임 제거는 \n순모임 삭제를 이용하세요."}
            />
          </GRFlexView>
          <GRTextButton onClick={onClickUpdate} buttonType={"primary"}>
            코디 수정
          </GRTextButton>
        </GRFlexView>
        <GRTransferTable
          rowKey={record => record.key}
          dataSource={[...currentGroupLeaderData, ...differentGroupLeaderData]}
          leftColumns={leftColumns}
          rightColumns={rightColumns}
          targetKeys={targetKeys}
          titles={["현재 소속 순모임", "전체 순모임"]}
          onChange={onChange}
          rightWayDisable={true}
          showSearch
          filterOption={(input, item) =>
            (item as tGroup).leaderName?.includes(input) ||
            (item as tSmallGroup).leaderName?.includes(input)
          }
        />
      </GRContainerView>
      <GRContainerView>
        <GRFlexView flexDirection={"row"} alignItems={"center"}>
          <GRText
            fontSize={"b3"}
            marginvertical={GRStylesConfig.BASE_LONG_MARGIN}
          >
            새가족 순모임
          </GRText>
          <GRInfoBadge
            infoMessage={"새가족 순모임은 \n생성 및 삭제로 수정하세요."}
          />
        </GRFlexView>
        <GRTable
          rowKey={"groupId"}
          columns={newfamilyGroupColumns}
          data={newfamilyGroupData}
        />
      </GRContainerView>
    </>
  );
};

export default CodyUpdatePage;
