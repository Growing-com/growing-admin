import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import { TableColumnsType } from "antd";
import usePastorMutate from "api/lineup/mutate/usePastorMutate";
import { tPastor } from "api/term/type";
import useCurrentTerm from "hooks/api/term/useCurrentTerm";
import { useUserListOptionQueries } from "hooks/queries/user/useUserListOptionQueries";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { convertOptions } from "utils";

const EditPastorTable: React.FC = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);
  const [selectedTablePastor, setSelectedTablePastor] = useState<tPastor>();
  const [selectedPastorId, setSelectedPastorId] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { currentTermPastor, currentTermId } = useCurrentTerm();
  const { notPlacedUserListOption } = useUserListOptionQueries();
  const currentTermPastorOption = currentTermPastor
    ? convertOptions(currentTermPastor, "pastorId", "pastorName")
    : [];

  const onChangeRowSelect = (
    selectedKeys: React.Key[],
    selectedRows: any[]
  ) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedTablePastor(selectedRows[0]);
  };

  const onChangeSelectPastor = (_selectedPastorId: number) => {
    setSelectedPastorId(_selectedPastorId);
  };

  const onClickCreate = () => {
    setIsOpenCreateModal(true);
  };

  const onClickDelete = () => {
    if (!selectedTablePastor) {
      return GRAlert.error("선택된 교역자가 없습니다");
    }
    setIsOpenDeleteModal(true);
  };

  const onClickChange = () => {
    setIsOpenChangeModal(true);
  };

  const onClickModalClose = () => {
    setIsOpenCreateModal(false);
    setIsOpenChangeModal(false);
    setIsOpenDeleteModal(false);
  };

  const { createPastorMutate, changePastorMutate, deletePastorMutate } =
    usePastorMutate(onClickModalClose);

  const onClickCreateOK = async () => {
    if (!selectedPastorId) return GRAlert.error("교역자를 선택해주세요");
    if (!currentTermId) return GRAlert.error("텀 아이디를 찾을 수 없습니다.");

    await createPastorMutate({
      termId: currentTermId,
      pastorUserId: selectedPastorId
    });
  };

  const onClickChangeOk = async () => {
    if (!selectedPastorId) return GRAlert.error("교역자를 선택해주세요");
    if (!currentTermId) return GRAlert.error("텀 아이디를 찾을 수 없습니다.");

    await changePastorMutate({
      termId: currentTermId,
      targetSeniorPastorId: selectedPastorId
    });
  };

  const onClickDeleteOk = async () => {
    await deletePastorMutate(selectedTablePastor?.pastorId as number);
  };

  const columns: TableColumnsType<any> = [
    {
      title: "번호",
      dataIndex: "pastorId",
      key: "pastorId",
      align: "center",
      width: "2rem"
    },
    {
      title: "이름",
      dataIndex: "pastorName",
      key: "pastorName",
      align: "center",
      width: "10rem",
      minWidth: 75
    },
    {
      title: "담당 교역자",
      dataIndex: "isSenior",
      key: "isSenior",
      align: "center",
      width: "5rem",
      render: (_, item) => {
        if (item.isSenior === true) return <GRText>담당 교역자</GRText>;
        return;
      }
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
          <GRTextButton onClick={onClickChange} buttonType={"custom"}>
            교역자 변경
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
        rowKey={"pastorId"}
        columns={columns}
        data={currentTermPastor}
        rowSelection={{
          type: "radio",
          onChange: onChangeRowSelect,
          selectedRowKeys
        }}
        onRow={record => ({
          onClick: () => {
            onChangeRowSelect([record.pastorId], [record]);
          }
        })}
      />
      {isOpenCreateModal && (
        <GRModal
          open={isOpenCreateModal}
          onCancel={onClickModalClose}
          onOk={onClickCreateOK}
          title={"교역자 생성"}
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
            <GRText fontSize={"b6"}>교역자 선택</GRText>
            <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
              <GRSelect
                options={notPlacedUserListOption}
                onChange={onChangeSelectPastor}
                placeholder={"교역자를 선택해 주세요"}
                value={selectedPastorId}
              />
            </GRFlexView>
          </GRFlexView>
        </GRModal>
      )}
      {isOpenDeleteModal && (
        <GRAlertModal
          open={isOpenDeleteModal}
          description={`${selectedTablePastor?.pastorName}을 삭제 하시겠습니까?`}
          onCancelClickButton={onClickModalClose}
          onOkClickButton={onClickDeleteOk}
        />
      )}
      {isOpenChangeModal && (
        <GRModal
          open={isOpenChangeModal}
          onCancel={onClickModalClose}
          onOk={onClickChangeOk}
          title={"담당 교역자 변경"}
          width={"30%"}
          maskClosable={false}
        >
          <GRFlexView
            flexDirection={"row"}
            alignItems={"center"}
            xGap={2}
            style={{ width: "100%", overflowX: "auto" }}
          >
            <GRText fontSize={"b6"}>교역자 선택</GRText>
            <GRFlexView>
              <GRSelect
                options={currentTermPastorOption}
                onChange={onChangeSelectPastor}
                placeholder={"교역자를 선택해 주세요"}
                value={selectedPastorId}
              />
            </GRFlexView>
          </GRFlexView>
        </GRModal>
      )}
    </>
  );
};

export default EditPastorTable;
