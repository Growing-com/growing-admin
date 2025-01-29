import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRTransferTable, {
    TableTransferProps
} from "@component/molecule/table/GRTransferTable";
import HeaderView from "@component/molecule/view/HeaderView";
import { TableColumnsType } from "antd";
import useSmallGroupMutate from "api/lineup/mutate/useSmallGroupMutate";
import { useGroupMembersQueries } from "api/lineup/queries/useGroupMembersQueries";
import { tGroupMembers } from "api/lineup/type";
import { useUserListQuery } from "api/management/user/queries/useUserListQuery";
import { SEX_NAME } from "config/const";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

type tTableGroupMembers = Omit<tGroupMembers, "userId"> & {
  key: number;
};

const SmallGroupUpdatePage: NextPage = () => {
  const router = useRouter();
  const { smallGroupId } = router.query;
  const numericId = smallGroupId ? Number(smallGroupId) : null;

  const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);
  const [currentUserTableData, setCurrentUserTableData] = useState<
    tTableGroupMembers[]
  >([]);
  const [notPlacedUserTableData, setnotPlacedUserTableData] = useState<
    tTableGroupMembers[]
  >([]);

  const { notPlacedUserList } = useUserListQuery();
  const { smallGroupMembers } = useGroupMembersQueries({
    smallGroupId: numericId as number
  });

  const { updateSmallGroupMutate } = useSmallGroupMutate();
  const { currentTermSmallGroupLeader } = useCurrentTerm();

  const foundSmallGroup = currentTermSmallGroupLeader?.find(
    leader => leader.smallGroupId === numericId
  );

  const onClickUpdate = async () => {
    const _currentUserIds = currentUserTableData.map(user => user.key);
    await updateSmallGroupMutate({
      smallGroupId: numericId as number,
      memberUserIds: _currentUserIds
    });
  };

  const onChange: TableTransferProps<any>["onChange"] = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
    const totalData = [...currentUserTableData, ...notPlacedUserTableData];
    const leftData = totalData.filter(
      item => !nextTargetKeys.includes(item.key)
    );
    const rightData = totalData.filter(item =>
      nextTargetKeys.includes(item.key)
    );
    setCurrentUserTableData(leftData);
    setnotPlacedUserTableData(rightData);
  };

  const convertToTableMemberData = (
    members: tGroupMembers[]
  ): tTableGroupMembers[] => {
    return members.map(user => ({
      key: user.userId,
      name: user.name,
      sex: user.sex,
      grade: user.grade
    }));
  };

  const columns: TableColumnsType<any> = [
    {
      title: "아이디",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "2rem",
      minWidth: 60,
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem",
      minWidth: 75
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "3rem",
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
      width: "3rem",
      minWidth: 60
    }
  ];

  useEffect(() => {
    if (!smallGroupMembers || !notPlacedUserList) return;

    const _targetKeys = notPlacedUserList.map(user => user.userId);
    const _smallGroupMembersTableData =
      convertToTableMemberData(smallGroupMembers);
    const _notPlacedUserTableData = convertToTableMemberData(notPlacedUserList);

    setCurrentUserTableData(_smallGroupMembersTableData);
    setnotPlacedUserTableData(_notPlacedUserTableData);
    setTargetKeys(_targetKeys);
  }, [smallGroupMembers, notPlacedUserList]);

  return (
    <>
      <HeaderView
        title={"순모임 수정"}
        titleInfo={"순원을 추가, 제거할 수 있습니다."}
        titleInfoType={"info"}
        disabledBackbutton={true}
        subComponent={
          <GRText fontSize={"b2"} weight={"bold"}>
            {foundSmallGroup?.leaderName} 순장
          </GRText>
        }
      />
      <GRContainerView>
        <GRFlexView
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginvertical={GRStylesConfig.BASE_LONG_MARGIN}
        >
          <GRText fontSize={"b3"}>일반 순모임</GRText>
          <GRTextButton onClick={onClickUpdate} buttonType={"primary"}>
            순모임 수정
          </GRTextButton>
        </GRFlexView>
        <GRTransferTable
          rowKey={record => record.key}
          dataSource={[...currentUserTableData, ...notPlacedUserTableData]}
          leftColumns={columns}
          rightColumns={columns}
          targetKeys={targetKeys}
          titles={["현재 소속 순원", "미배정 순원"]}
          onChange={onChange}
          showSearch
          filterOption={(input, item) =>
            (item as tGroupMembers).name?.includes(input)
          }
        />
      </GRContainerView>
    </>
  );
};

export default SmallGroupUpdatePage;
