import GRTable from "@component/atom/GRTable";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import { Checkbox, CheckboxProps } from "antd";
import { ColumnType } from "antd/es/table";
import { useUserMutate } from "api/account/mutate/useUserMutate";
import { tTermNewFamily } from "api/term/types";
import { TeamType } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { FC, useCallback, useState } from "react";

type tNewFamilyPromoteModal = {
  open: boolean;
  onClose: () => void;
  newFamilyList?: tTermNewFamily[];
};

// 개체마다 분리 해야 됨
const NewFamilyLineUpModal: FC<tNewFamilyPromoteModal> = ({
  open,
  onClose,
  newFamilyList
}) => {
  const [lineUpDate, setLineUpDate] = useState<Dayjs>();
  const [selectedLeaderId, setSelectedLeaderId] = useState<number>();

  const { createUserMutateAsync, updateUserMutateAsync } = useUserMutate();

  const {
    termCordyOptions,
    termLeaderOptions,
    selectedCodyId,
    setSelectedCodyId
  } = useTermInfoOptionQueries(TeamType.NEW);

  const onCancelClick = () => {
    onClose();
  };
  
  const onChangeLineUpDate = useCallback((_lineUpdDate: Dayjs | null) => {
    if (_lineUpdDate) {
      // setLineUpDate(_lineUpdDate);
    }
  }, []);

  const onChangeCordySelect = useCallback(
    (_cordy: number) => {
      setSelectedCodyId(_cordy);
      setSelectedLeaderId(undefined);
    },
    [setSelectedCodyId]
  );

  const onChangeLeaderSelect = useCallback((_leaderId: number) => {
    setSelectedLeaderId(_leaderId);
  }, []);

  const onChangeCheckBox: CheckboxProps["onChange"] = e => {
    // Todo: check 되면 등반날짜 선택한 날짜로
    console.log(`checked = ${e.target.checked}`);
  };

  const columns: ColumnType<tTermNewFamily>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "등반여부",
      dataIndex: "promotion",
      key: "promotion",
      align: "center",
      width: "5rem",
      render: (_, record) => (
        <Checkbox onChange={onChangeCheckBox} checked={!!record.lineupDate} />
      )
    },
    {
      title: "등반일",
      dataIndex: "lineupDate",
      key: "lineupDate",
      align: "center",
      width: "5rem",
      render: (_, record) => (
        <GRDatePicker
          style={{ flex: 1, width: "8rem" }}
          pickerType={"basic"}
          placeholder={"등반 날짜 선택"}
          onChange={onChangeLineUpDate}
          // vaule값 때문에 렌더 오류 발생 가능.
          value={record.lineupDate ? dayjs(record.lineupDate) : undefined}
        />
      )
    },
    {
      title: "나무",
      dataIndex: "cordi",
      key: "cordi",
      align: "center",
      width: "5rem",
      render: (_, record) => (
        <GRSelect
          style={{ width: "6rem" }}
          options={termCordyOptions}
          onChange={onChangeCordySelect}
          placeholder={"나무 선택"}
        />
      )
    },
    {
      title: "순장",
      dataIndex: "leader",
      key: "leader",
      align: "center",
      width: "5rem",
      render: (_, record) => (
        // 드롭박스 형태
        <GRSelect
          style={{ width: "6rem" }}
          options={termLeaderOptions}
          onChange={onChangeLeaderSelect}
          placeholder={"리더 선택"}
        />
      )
    }
  ];
  return (
    <GRModal
      onCancel={onCancelClick}
      open={open}
      showFooter={true}
      width={"50%"}
    >
      <GRText weight={"bold"} fontSize={"b3"} marginleft={2} marginbottom={2}>
        라인업
      </GRText>
      <GRTable
        style={{ overflow: "auto" }}
        rowKey={"id"}
        columns={columns}
        data={newFamilyList}
      />
    </GRModal>
  );
};

export default NewFamilyLineUpModal;
