import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import { TableColumnsType } from "antd";
import useCodyMutate from "api/lineup/mutate/useCodyMutate";
import { tCody } from "api/term/type";
import { SEX_NAME } from "config/const";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useUserListOptionQueries } from "hooks/queries/user/useUserListOptionQueries";
import { useRouter } from "next/router";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const EditCodyTable: React.FC = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedTableCody, setSelectedTableCody] = useState<tCody>();
  const [selectedCodyId, setSelectedCodyId] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const router = useRouter();

  const { currentTermCody, currentTermId } = useCurrentTerm();
  const { notPlacedUserListOption } = useUserListOptionQueries();

  const onChangeRowSelect = (
    selectedKeys: React.Key[],
    selectedRows: any[]
  ) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedTableCody(selectedRows[0]);
  };

  const onChangeSelectCody = (_selectedCodyId: number) => {
    setSelectedCodyId(_selectedCodyId);
  };

  const onClickUpdate = () => {
    if (!selectedTableCody) return GRAlert.error("선택된 코디가 없습니다");
    // router.push(`/department/lineup/edit/cody/${selectedTableCody.codyId}`);
  };

  const onClickCreate = () => {
    setIsOpenCreateModal(true);
  };

  const onClickDelete = () => {
    if (!selectedTableCody) return GRAlert.error("선택된 코디가 없습니다");
    setIsOpenDeleteModal(true);
  };

  const onClickModalClose = () => {
    setIsOpenCreateModal(false);
    setIsOpenUpdateModal(false);
    setIsOpenDeleteModal(false);
  };

  const { createCodyMutate, deleteCodyMutate, updateCodyMutate } =
    useCodyMutate(onClickModalClose);

  const onClickCreateOK = async () => {
    if (!selectedCodyId) return GRAlert.error("코디를 선택해주세요");
    if (!currentTermId) return GRAlert.error("텀 아이디를 찾을 수 없습니다.");

    await createCodyMutate({
      termId: currentTermId,
      codyUserId: selectedCodyId
    });
  };

  const onClickDeleteOk = async () => {
    await deleteCodyMutate(selectedTableCody?.codyId as number);
  };

  const onClickUpdateOk = () => {
    console.log("Updateok");
  };

  const columns: TableColumnsType<any> = [
    {
      title: "번호",
      dataIndex: "codyId",
      key: "codyId",
      align: "center",
      width: "2rem"
    },
    {
      title: "이름",
      dataIndex: "codyName",
      key: "codyName",
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

  return (
    <>
      <GRFlexView
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginbottom={GRStylesConfig.BASE_MARGIN}
      >
        <GRFlexView
          flexDirection={"row"}
          justifyContent={"end"}
          xGap={GRStylesConfig.BASE_MARGIN}
        >
          <GRTextButton onClick={onClickUpdate} buttonType={"custom"}>
            코디 수정
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
        rowKey={"codyId"}
        columns={columns}
        data={currentTermCody}
        rowSelection={{
          type: "radio",
          onChange: onChangeRowSelect,
          selectedRowKeys
        }}
        onRow={record => ({
          onClick: () => {
            onChangeRowSelect([record.codyId], [record]);
          }
        })}
      />
      {isOpenCreateModal && (
        <GRModal
          open={isOpenCreateModal}
          onCancel={onClickModalClose}
          onOk={onClickCreateOK}
          title={"코디 생성"}
          titleInfoType={"info"}
          titleInfo={"미배정 직분인 지체만 선택할 수 있습니다."}
          width={"40%"}
          maskClosable={false}
        >
          <GRFlexView
            flexDirection={"row"}
            alignItems={"center"}
            xGap={2}
            style={{ width: "100%", overflowX: "auto" }}
          >
            <GRText fontSize={"b6"}>코디 선택</GRText>
            <GRFlexView>
              <GRSelect
                options={notPlacedUserListOption}
                onChange={onChangeSelectCody}
                placeholder={"코디를 선택해 주세요"}
                value={selectedCodyId}
              />
            </GRFlexView>
          </GRFlexView>
        </GRModal>
      )}
      {isOpenDeleteModal && (
        <GRAlertModal
          open={isOpenDeleteModal}
          description={`${selectedTableCody?.codyName}을 삭제 하시겠습니까?`}
          onCancelClickButton={onClickModalClose}
          onOkClickButton={onClickDeleteOk}
        />
      )}
    </>
  );
};

export default EditCodyTable;
