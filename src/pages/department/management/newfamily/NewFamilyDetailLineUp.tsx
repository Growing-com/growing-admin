import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import { Tooltip } from "antd";
import { useNewFamilyLineUp } from "api/term/mutate/useNewFamilyLineUp";
import { tTermNewFamily } from "api/term/types";
import { TeamType } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { FC, useCallback, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tNewFamilyDetailLineUp = {
  newFamily?: tTermNewFamily;
  isLineUp: boolean;
  onCloseModal: () => void;
};

const NewFamilyDetailLineUp: FC<tNewFamilyDetailLineUp> = ({
  newFamily,
  isLineUp,
  onCloseModal
}) => {
  const [lineUpDate, setLineUpDate] = useState<Dayjs>();
  const [selectedLeaderId, setSelectedLeaderId] = useState<number>();
  const [open, setOpen] = useState(false);

  const { mutateAsync: newFamilyLineUpMutateAsync } = useNewFamilyLineUp({
    onClose: onCloseModal
  });

  const {
    termCordyOptions,
    termLeaderOptions,
    selectedCodyId,
    setSelectedCodyId
  } = useTermInfoOptionQueries(TeamType.NEW);

  const onChangeLeaderSelect = useCallback((_leaderId: number) => {
    setSelectedLeaderId(_leaderId);
  }, []);

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

  const onOkClickButton = useCallback(async () => {
    if (!selectedLeaderId) {
      return GRAlert.error("리더와 나무를 선택해주세요");
    }

    if (!lineUpDate) {
      return GRAlert.error("등반 날짜를 선택해주세요");
    }

    if (newFamily && selectedLeaderId && lineUpDate) {
      await newFamilyLineUpMutateAsync({
        teamId: newFamily?.teamId,
        teamMemberId: newFamily?.teamMemberId,
        data: {
          plantTeamId: selectedLeaderId,
          lineupDate: dayjs(lineUpDate).format(DEFAULT_DATE_FOMAT),
          gradeAtFirstVisit: newFamily?.grade
        }
      });
      setOpen(false);
    } else {
      GRAlert.error("등반할 대상에 대한 데이터가 없습니다");
    }
  }, [lineUpDate, newFamily, newFamilyLineUpMutateAsync, selectedLeaderId]);

  const onClickLineUpButton = useCallback(() => {
    setOpen(true);
  }, []);

  const onCancelClickButton = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setLineUpDate(
      newFamily?.lineupDate ? dayjs(newFamily?.lineupDate) : undefined
    );
    setSelectedCodyId(undefined);
    setSelectedLeaderId(undefined);
  }, [newFamily?.lineupDate, setSelectedCodyId]);

  return (
    <GRFlexView
      flexDirection={"row"}
      alignItems={"center"}
      marginbottom={GRStylesConfig.BASE_LONG_MARGIN}
    >
      <GRFormTitle
        title={"등반"}
        alertMessage={`등반이 되면 새가족 리더에서 등반된 리더로 이동하게 됩니다`}
      />
      <GRFlexView flexDirection={"row"} alignItems={"center"}>
        {isLineUp ? (
          <GRTextInput
            style={{ width: "10rem" }}
            marginright={GRStylesConfig.BASE_MARGIN}
            disabled
            value={newFamily?.firstPlantManagerName ?? ""}
          />
        ) : (
          <GRSelect
            style={{ width: "10rem" }}
            marginright={GRStylesConfig.BASE_MARGIN}
            value={selectedCodyId}
            options={termCordyOptions}
            onChange={onChangeCordySelect}
            placeholder={"나무 선택"}
            disabled={isLineUp}
          />
        )}
        {isLineUp ? (
          <GRTextInput
            style={{ width: "10rem" }}
            disabled
            marginright={GRStylesConfig.BASE_MARGIN}
            value={newFamily?.firstPlantLeaderName ?? ""}
          />
        ) : (
          <GRSelect
            marginright={GRStylesConfig.BASE_MARGIN}
            style={{ width: "10rem" }}
            value={selectedLeaderId}
            options={termLeaderOptions}
            onChange={onChangeLeaderSelect}
            placeholder={"리더 선택"}
            disabled={isLineUp}
          />
        )}
        <GRDatePicker
          style={{ flex: 1 }}
          value={lineUpDate}
          pickerType={"basic"}
          placeholder={"등반 날짜를 선택해주세요"}
          onChange={onChangeLineUpDate}
          disabled={isLineUp}
        />
      </GRFlexView>
      <Tooltip
        overlayStyle={{ whiteSpace: "pre-line" }}
        title={"새가족 리더에서 텀리더로 등반하는 기능"}
      >
        <GRButtonText
          disabled={isLineUp}
          marginleft={GRStylesConfig.BASE_MARGIN}
          onClick={onClickLineUpButton}
        >
          등반
        </GRButtonText>
      </Tooltip>
      <GRAlertModal
        open={open}
        description={`등반 후에 변경 불가능합니다\n진행하시겠습니까?`}
        onCancelClickButton={onCancelClickButton}
        onOkClickButton={onOkClickButton}
      />
    </GRFlexView>
  );
};

export default NewFamilyDetailLineUp;
