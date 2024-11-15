import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { TableColumnsType } from "antd";
import useSmallGroupMutate from "api/lineup/mutate/useSmallGroupMutate";
import { createGroupForm } from "api/lineup/type";
import { tSmallGroup } from "api/term/type";
import { SEX_NAME } from "config/const";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useCurrentTermInfoOptionQueries } from "hooks/queries/term/useCurrentTermInfoOptionQueries";
import { useUserListOptionQueries } from "hooks/queries/user/useUserListOptionQueries";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { koreanSorter } from "utils/sorter";

const EditSmallGroupLeaderTable: React.FC = () => {
  const [filteredSmallGroup, setFilteredSmallGroup] = useState<tSmallGroup[]>(
    []
  );
  const [searchName, setSearchName] = useState("");
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedSmallGroup, setSelectedSmallGroup] = useState<tSmallGroup>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { currentTermSmallGroupLeader, currentTermId } = useCurrentTerm();
  const { currentTermCodyOptions } = useCurrentTermInfoOptionQueries();
  const { notPlacedUserListOption } = useUserListOptionQueries();

  const { control, handleSubmit, reset } = useForm<createGroupForm>({
    defaultValues: {
      codyId: undefined,
      leaderUserId: undefined,
      memberUserIds: undefined
    }
  });

  const onChangeRowSelect = (
    selectedKeys: React.Key[],
    selectedRows: any[]
  ) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedSmallGroup(selectedRows[0]);
  };

  const onClickUpdate = () => {
    console.log("onClickUpdate");
  };

  const onClickCreate = () => {
    setIsOpenCreateModal(true);
  };

  const onClickDelete = () => {
    if (!selectedSmallGroup) return GRAlert.error("선택된 순모임이 없습니다");
    setIsOpenDeleteModal(true);
  };

  const onClickModalClose = () => {
    setIsOpenCreateModal(false);
    setIsOpenDeleteModal(false);
    reset();
  };

  const {
    createSmallGroupMutate,
    updateSmallGroupMutate,
    deleteSmallGroupMutate
  } = useSmallGroupMutate(onClickModalClose);

  const onClickCreateOK = handleSubmit(async (_value: createGroupForm) => {
    await createSmallGroupMutate({
      ..._value,
      termId: currentTermId as number,
      // 순원 없으면 빈배열로 가야 생성
      memberUserIds: _value.memberUserIds ?? []
    });
  });

  const onClickDeleteOk = async () => {
    await deleteSmallGroupMutate(selectedSmallGroup?.smallGroupId as number);
  };

  const columns: TableColumnsType<any> = [
    {
      title: "번호",
      dataIndex: "smallGroupId",
      key: "smallGroupId",
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
    {
      title: "이름",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "5rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => koreanSorter(a.leaderName, b.leaderName),
        multiple: 1
      }
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

  const onChangeSearch = (_text: string) => {
    setSearchName(_text);
  };

  useEffect(() => {
    if (!currentTermSmallGroupLeader?.length) {
      setFilteredSmallGroup([]);
      return;
    }

    const _filterUser = searchName
      ? currentTermSmallGroupLeader?.filter(group =>
          group.leaderName?.includes(searchName)
        )
      : currentTermSmallGroupLeader;

    setFilteredSmallGroup(_filterUser);
  }, [currentTermSmallGroupLeader, searchName]);

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
        <GRFlexView
          flexDirection={"row"}
          justifyContent={"end"}
          xGap={GRStylesConfig.BASE_MARGIN}
        >
          <GRTextButton onClick={onClickUpdate} buttonType={"custom"}>
            순모임 수정
          </GRTextButton>
          <GRTextButton onClick={onClickCreate} buttonType={"primary"}>
            생성
          </GRTextButton>
          <GRTextButton onClick={onClickDelete} buttonType={"warning"}>
            삭제
          </GRTextButton>
        </GRFlexView>
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
          onChange: onChangeRowSelect,
          selectedRowKeys
        }}
        onRow={record => ({
          onClick: () => {
            onChangeRowSelect([record.smallGroupId], [record]);
          }
        })}
      />
      {/* 순모임 생성 모달 */}
      {isOpenCreateModal && (
        <GRFormModal
          open={isOpenCreateModal}
          onCancel={onClickModalClose}
          onSubmit={onClickCreateOK}
          title={"순모임 생성"}
          titleInfoType={"info"}
          titleInfo={"미배정 직분인 지체만 선택할 수 있습니다."}
          width={"40%"}
          maskClosable={false}
        >
          <GRFlexView
            yGap={GRStylesConfig.BASE_LONG_MARGIN}
            style={{ width: "100%", overflowX: "auto" }}
          >
            <GRFlexView flexDirection={"row"} alignItems={"center"} xGap={2}>
              <GRFormTitle title={"코디 선택"} />
              <GRFormItem
                type={"select"}
                fieldName={"codyId"}
                control={control}
                options={currentTermCodyOptions}
                placeholder={"코디를 선택해주세요"}
                rules={{ required: "코디 선택은 필수입니다." }}
              />
            </GRFlexView>
            <GRFlexView flexDirection={"row"} alignItems={"center"} xGap={2}>
              <GRFormTitle title={"순장 선택"} />
              <GRFormItem
                type={"select"}
                fieldName={"leaderUserId"}
                control={control}
                options={notPlacedUserListOption}
                placeholder={"순장을 선택해주세요"}
                optionFilterProp={"label"}
                rules={{ required: "순장 선택은 필수입니다." }}
              />
            </GRFlexView>
            <GRFlexView flexDirection={"row"} alignItems={"center"} xGap={2}>
              <GRFormTitle title={"순원 선택"} />
              <GRFormItem
                mode={"multiple"}
                type={"select"}
                fieldName={"memberUserIds"}
                control={control}
                options={notPlacedUserListOption}
                placeholder={"순원을 선택해주세요"}
                optionFilterProp={"label"}
              />
            </GRFlexView>
          </GRFlexView>
        </GRFormModal>
      )}
      {/* 순모임 삭제 모달 */}
      {isOpenDeleteModal && (
        <GRAlertModal
          open={isOpenDeleteModal}
          description={`${selectedSmallGroup?.leaderName} 순모임을 삭제 하시겠습니까?`}
          onCancelClickButton={onClickModalClose}
          onOkClickButton={onClickDeleteOk}
        />
      )}
    </>
  );
};

export default EditSmallGroupLeaderTable;
