import GRAlert from "@component/atom/alert/GRAlert";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useUserMutate } from "api/account/mutate/useUserMutate";
import { useUserDetailQuery } from "api/account/queries/useUserDetailQuery";
import type { tAccount } from "api/account/types";
import { SEX_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { FC, useCallback, useEffect, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tAccountModal = {
  user?: tAccount;
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
};

type tAccountForm = {
  birth: Dayjs;
  visitDate: Dayjs;
} & Omit<tAccount, "visitDate" | "birth">;

const AccountModal: FC<tAccountModal> = ({
  open,
  onClose,
  user,
  onRegister
}) => {
  const isCreate = useMemo(() => !user?.id, [user?.id]);

  const { data: userInfo } = useUserDetailQuery(user?.id);
  const { newFamilyLeaderOptions } = useTermInfoOptionQueries();
  const { createUserMutateAsync, updateUserMutateAsync } = useUserMutate();

  const { control, handleSubmit, reset } = useForm<tAccountForm>();

  const onCloseModal = useCallback(() => {
    onClose?.();
    reset();
  }, [onClose, reset]);

  const onRegisterModal = useCallback(() => {
    onRegister?.();
    reset();
  }, [onRegister, reset]);

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    async _item => {
      const _format = {
        ..._item,
        birth: dayjs(_item.birth).format(DEFAULT_DATE_FOMAT),
        visitDate: dayjs(_item.visitDate).format(DEFAULT_DATE_FOMAT),
        termId: 1,
        visitTermId: 1
      };
      try {
        if (isCreate) {
          await createUserMutateAsync(_format);
        } else {
          await updateUserMutateAsync({
            userId: user?.id,
            data: _format as tAccount
          });
        }
        onRegisterModal();
        GRAlert.success("생성 성공");
      } catch (e) {
        GRAlert.error(`전화번호 및 이름이 중복 될수 있으니 확인 부탁드립니다`);
      }
    },
    [
      createUserMutateAsync,
      isCreate,
      onRegisterModal,
      updateUserMutateAsync,
      user?.id
    ]
  );

  useEffect(() => {
    if (userInfo && !isCreate) {
      reset({
        ...userInfo,
        birth:
          userInfo.birth && userInfo?.birth !== "1970-01-01"
            ? dayjs(userInfo.birth)
            : undefined,
        visitDate:
          userInfo?.visitDate && userInfo?.visitDate !== "1970-01-01"
            ? dayjs(userInfo?.visitDate)
            : undefined
      });
    } else {
      reset({
        isActive: true
      });
    }
  }, [isCreate, reset, userInfo]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={isCreate ? "계정 생성" : "계정 수정"}
      width={"60%"}
      okButtonText={isCreate ? "등록" : "수정"}
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
            required={true}
          />
          <GRFormItem
            type={"radio"}
            title={"성별"}
            fieldName={"sex"}
            control={control}
            options={SEX_OPTIONS}
            required={true}
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
            required={true}
            maxLength={11}
          />
          <GRFormItem
            type={"date"}
            pickerType={"basic"}
            title={"생년월일"}
            fieldName={"birth"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
            required={true}
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
            required={true}
          />
          {/* <GRFormItem
            pickerType={"basic"}
            type={"date"}
            title={"방문일"}
            fieldName={"visitDate"}
            control={control}
            placeholder={"방문일을 선택해 주세요"}
            required={true}
          /> */}
          <GRFormItem
            type={"switch"}
            title={"활성화"}
            fieldName={"isActive"}
            control={control}
            isShow={!isCreate}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          {/* <GRFormItem
            type={"select"}
            title={"리더"}
            fieldName={"teamId"}
            control={control}
            options={newFamilyLeaderOptions}
            disabled={!isCreate}
            placeholder={"리더를 선택해주세요"}
          /> */}
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

export default AccountModal;
