import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useUserMutate } from "api/account/mutate/useUserMutate";
import { tAccount } from "api/account/types";
import { useNewFamilyLineOut } from "api/term/mutate/useNewFamilyLineOut";
import { useNewFamilyLineUp } from "api/term/mutate/useNewFamilyLineUp";
import { tTermNewFamily } from "api/term/types";
import { SEX_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tNewFamilyDetailModal = {
  newFamily: tTermNewFamily;
  open: boolean;
  onClose: () => void;
};

type tNewFamilyForm = {
  visitDate: Dayjs;
  birth: Dayjs;
} & Omit<tTermNewFamily, "visitDate" | "birth">;

const NewFamilyDetailModal: FC<tNewFamilyDetailModal> = ({
  open,
  onClose,
  newFamily
}) => {
  const [lineUpDate, setLineUpDate] = useState<Dayjs>();
  const [selectedLeaderId, setSelectedLeaderId] = useState<number>();

  const isLineUp = useMemo(
    () => !!newFamily?.firstPlantLeaderName || !!newFamily?.lineoutDate,
    [newFamily?.firstPlantLeaderName, newFamily?.lineoutDate]
  );

  const { updateUserMutateAsync } = useUserMutate();
  const {
    termCordyOptions,
    termLeaderOptions,
    selectedCodyId,
    setSelectedCodyId
  } = useTermInfoOptionQueries();
  const { control, handleSubmit, reset } = useForm<tNewFamilyForm>();

  const onCloseModal = useCallback(() => {
    onClose?.();
    reset();
  }, [onClose, reset]);

  const { mutate: newFamilyLineUpMutate } = useNewFamilyLineUp({
    onClose: onCloseModal
  });
  const { mutate: newFamilyLineOutMutate } = useNewFamilyLineOut({
    onClose: onCloseModal
  });

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    async _item => {
      const _format = {
        ..._item,
        birth: dayjs(_item.birth).format(DEFAULT_DATE_FOMAT),
        visitDate: dayjs(_item.visitDate).format(DEFAULT_DATE_FOMAT)
      };
      try {
        await updateUserMutateAsync({
          userId: newFamily?.userId,
          data: _format as tAccount
        });
        GRAlert.success("수정 성공");
        onCloseModal();
      } catch (e) {
        GRAlert.error("수정 실패, 다시 한번 시도해 주세요");
      }
    },
    [newFamily?.userId, onCloseModal, updateUserMutateAsync]
  );

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

  const onClickLineUpButton = useCallback(() => {
    if (!selectedLeaderId) {
      return GRAlert.error("리더와 나무를 선택해주세요");
    }

    if (!lineUpDate) {
      return GRAlert.error("라인업 날짜를 선택해주세요");
    }
    if (!newFamily) return;

    if (confirm("라인업 후에 변경 불가능합니다, 진행하시겠습니까?")) {
      newFamilyLineUpMutate({
        teamId: newFamily?.teamId,
        teamMemberId: newFamily?.teamMemberId,
        data: {
          plantTeamId: selectedLeaderId,
          lineupDate: dayjs(lineUpDate).format(DEFAULT_DATE_FOMAT),
          gradeAtFirstVisit: newFamily?.grade
        }
      });
    }
  }, [lineUpDate, newFamily, newFamilyLineUpMutate, selectedLeaderId]);

  const onClickLineOut = useCallback(() => {
    if (!newFamily) return;
    if (
      confirm(
        "라인 아웃 후 다시 라인업은 불가능합니다. 그래도 진행하시겠습니까?"
      )
    ) {
      newFamilyLineOutMutate({
        teamId: newFamily.teamId,

        teamMemberId: newFamily.teamMemberId,
        data: {
          lineoutDate: dayjs().format(DEFAULT_DATE_FOMAT),
          gradeAtFirstVisit: newFamily?.grade
        }
      });
    }
  }, [newFamily, newFamilyLineOutMutate]);

  useEffect(() => {
    if (newFamily) {
      reset({
        ...newFamily,
        birth: dayjs(newFamily.birth),
        visitDate: dayjs(newFamily.visitDate)
      });
      setLineUpDate(undefined);
      setSelectedCodyId(undefined);
      setSelectedLeaderId(undefined);
    }
  }, [newFamily, reset, setSelectedCodyId]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={
        <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
          <GRText weight={"bold"}>새가족 상세</GRText>
          <GRButtonText danger onClick={onClickLineOut}>
            라인 아웃
          </GRButtonText>
        </GRFlexView>
      }
      width={"60%"}
      okButtonText={"수정"}
    >
      <GRView flexDirection={"row"}>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"이름"}
            fieldName={"name"}
            control={control}
            placeholder={"이름을 작성해 주세요"}
            disabled={true}
          />
          <GRFormItem
            type={"radio"}
            title={"성별"}
            fieldName={"sex"}
            control={control}
            options={SEX_OPTIONS}
            disabled={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"전화번호"}
            fieldName={"phoneNumber"}
            control={control}
            placeholder={"- 없이 작성해 주세요"}
            maxLength={11}
            disabled={true}
          />
          <GRFormItem
            type={"date"}
            title={"생년월일"}
            fieldName={"birth"}
            pickerType={"basic"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
            disabled={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"number"}
            title={"학년"}
            fieldName={"grade"}
            control={control}
            placeholder={"학년 숫자만 작성해주세요"}
            disabled={true}
          />
          <GRFormItem
            type={"date"}
            pickerType={"basic"}
            title={"방문일"}
            fieldName={"visitDate"}
            control={control}
            placeholder={"방문일을 선택해 주세요"}
            disabled={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormTitle title={"라인업"} />
          <GRFlexView>
            <GRFlexView
              flexDirection={"row"}
              marginbottom={GRStylesConfig.BASE_MARGIN}
            >
              <GRSelect
                style={{ flex: 1 }}
                marginright={GRStylesConfig.BASE_MARGIN}
                value={selectedCodyId}
                options={termCordyOptions}
                onChange={onChangeCordySelect}
                placeholder={"나무 선택해주세요"}
                disabled={isLineUp}
              />
              <GRSelect
                style={{ flex: 1 }}
                value={selectedLeaderId}
                options={termLeaderOptions}
                onChange={onChangeLeaderSelect}
                placeholder={"리더를 선택해주세요"}
                disabled={isLineUp}
              />
            </GRFlexView>
            <GRDatePicker
              value={lineUpDate}
              pickerType={"basic"}
              placeholder={"라인업 날짜를 선택해주세요"}
              onChange={onChangeLineUpDate}
              disabled={isLineUp}
            />
          </GRFlexView>
          <GRButtonText
            marginleft={GRStylesConfig.BASE_MARGIN}
            onClick={onClickLineUpButton}
          >
            라인업
          </GRButtonText>
        </GRFlexView>
        <GRFlexView>
          <GRFormItem
            type={"text"}
            textType={"textarea"}
            title={"추가 내용"}
            fieldName={"etc"}
            control={control}
            placeholder={"추가 내용이 있으면 작성해 주세요"}
          />
        </GRFlexView>
      </GRView>
    </GRFormModal>
  );
};

export default NewFamilyDetailModal;
