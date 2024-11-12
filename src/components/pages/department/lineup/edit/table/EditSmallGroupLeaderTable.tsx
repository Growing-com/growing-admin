import GRTable from "@component/atom/GRTable";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { TableColumnsType } from "antd";
import { tSmallGroup } from "api/term/type";

import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useEffect, useMemo, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const EditSmallGroupLeaderTable: React.FC = () => {
  const [filteredSmallGroup, setFilteredSmallGroup] = useState<tSmallGroup[]>(
    []
  );
  const [searchName, setSearchName] = useState("");
  const [selectedSmallGroup, setSelectedSmallGroup] = useState();

  const { currentTermCodyAndSmallGroups } = useCurrentTerm();

  const smallGroup = useMemo(() => {
    if (currentTermCodyAndSmallGroups)
      return currentTermCodyAndSmallGroups.flatMap(
        item => item.smallGroupLeaders
      );
  }, [currentTermCodyAndSmallGroups]);

  useEffect(() => {
    if (smallGroup) {
    }
  }, [smallGroup]);

  const columns: TableColumnsType<any> = [
    {
      title: "번호",
      dataIndex: "smallGroupId",
      key: "smallGroupId",
      align: "center",
      width: "2rem"
    },
    {
      title: "이름",
      dataIndex: "smallGroupLeaderName",
      key: "smallGroupLeaderName",
      align: "center",
      width: "10rem",
      minWidth: 75
    }
  ];

  const onChangeSearch = (_text: string) => {
    setSearchName(_text);
  };

  const onSelectUser = (_: React.Key[], selectedRows: any[]) => {
    setSelectedSmallGroup(selectedRows[0]);
  };

  useEffect(() => {
    if (!smallGroup?.length) {
      setFilteredSmallGroup([]);
      return;
    }

    const _filterUser = searchName
      ? smallGroup?.filter(group =>
          group.smallGroupLeaderName?.includes(searchName)
        )
      : smallGroup;

    const sortedFilteredUsers = _filterUser?.sort(
      (a, b) => a.smallGroupId - b.smallGroupId
    );

    setFilteredSmallGroup(sortedFilteredUsers);
  }, [smallGroup, searchName]);

  return (
    <>
      <GRFlexView
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginbottom={GRStylesConfig.BASE_MARGIN}
      >
        <GRView marginright={GRStylesConfig.BASE_MARGIN}>
          <GRTextInput
            type={"input"}
            placeholder={"이름으로 검색하세요"}
            onChange={onChangeSearch}
            value={searchName}
          />
        </GRView>
      </GRFlexView>
      <GRTable
        rowKey={"smallGroupId"}
        columns={columns}
        data={filteredSmallGroup}
        pagination={{
          total: filteredSmallGroup?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
        rowSelection={{
          type: "radio",
          onChange: onSelectUser
        }}
      />
    </>
  );
};

export default EditSmallGroupLeaderTable;
