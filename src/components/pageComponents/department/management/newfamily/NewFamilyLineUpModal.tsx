import GRTable from "@component/atom/GRTable";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import { Checkbox, CheckboxProps } from "antd";
import { ColumnType } from "antd/es/table";
import { tTermNewFamily } from "api/term/types";
import { TeamType } from "config/const";
import { Dayjs } from "dayjs";
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
      setLineUpDate(_lineUpdDate);
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

  // useEffect(() => {
  //   setLineUpDate(
  //     newFamily?.lineupDate ? dayjs(newFamily?.lineupDate) : undefined
  //   );
  //   setSelectedCodyId(undefined);
  //   setSelectedLeaderId(undefined);
  // }, [newFamily?.lineupDate, setSelectedCodyId]);

  const onChangeCheckBox: CheckboxProps["onChange"] = e => {
    // console.log(`checked = ${e.target.checked}`);
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
        //Todo: 등반 여부 적용
        <Checkbox onChange={onChangeCheckBox} value={record.promotion} />
        // <GRFlexView alignItems={"center"}>
        //   <GRCheck
        //     options={PROMOTION_STATUS}
        //     // onChange={}
        //     value={recode.promotion}
        //   ></GRCheck>
        // </GRFlexView>
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
          style={{ flex: 1, width: "10em" }}
          value={lineUpDate}
          pickerType={"basic"}
          placeholder={"등반 날짜를 선택해주세요"}
          onChange={onChangeLineUpDate}
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
          style={{ width: "7rem" }}
          value={selectedCodyId}
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
        <GRSelect
          style={{ width: "7rem" }}
          value={selectedLeaderId}
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
      <GRTable rowKey={"id"} columns={columns} data={newFamilyList} />
    </GRModal>
  );
};

export default NewFamilyLineUpModal;
