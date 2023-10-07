import GRAlert from "@component/atom/alert/GRAlert";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useUserMutate } from "api/account/mutate/useUserMutate";
import { tAccount } from "api/account/types";
import { tTermNewFamily } from "api/term/types";
import { GENDER_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { FC, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tNewFamilyDetailModal = {
  newFamily?: tTermNewFamily;
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
  const { control, handleSubmit, reset } = useForm<tNewFamilyForm>();

  const { updateUserMutateAsync } = useUserMutate();

  const onCloseModal = useCallback(() => {
    reset();
    onClose?.();
  }, [onClose, reset]);

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
      } catch (e) {
        console.log("Error", e);
        GRAlert.error("수정 실패, 다시 한번 시도해 주세요");
      }
    },
    [newFamily?.userId, updateUserMutateAsync]
  );

  useEffect(() => {
    if (newFamily) {
      reset({
        ...newFamily,
        birth: dayjs(newFamily.birth),
        visitDate: dayjs(newFamily.visitDate)
      });
    }
  }, [newFamily, reset]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={"새가족 상세"}
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
            options={GENDER_OPTIONS}
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
