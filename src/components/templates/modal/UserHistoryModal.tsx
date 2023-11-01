import GRModal from "@component/atom/modal/GRModal";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import { useUserDetailQuery } from "api/account/queries/useUserDetailQuery";
import type { tAccount } from "api/account/types";
import { SEX_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type tUserHistoryModal = {
  userId?: number;
  open: boolean;
  onClose: () => void;
};

type tAccountForm = {
  birth: Dayjs;
  visitDate: Dayjs;
} & Omit<tAccount, "visitDate" | "birth">;

const UserHistoryModal: FC<tUserHistoryModal> = ({ open, onClose, userId }) => {
  const { data: userInfo } = useUserDetailQuery(userId);
  const { newFamilyLeaderOptions } = useTermInfoOptionQueries();

  const { control, reset } = useForm<tAccountForm>();

  const onCloseModal = useCallback(() => {
    onClose?.();
    reset();
  }, [onClose, reset]);

  useEffect(() => {
    if (userInfo) {
      reset({
        ...userInfo,
        birth: dayjs(userInfo.birth),
        visitDate: userInfo?.visitDate ? dayjs(userInfo?.visitDate) : undefined
      });
    }
  }, [reset, userInfo]);

  return (
    <GRModal
      open={open}
      onCancel={onCloseModal}
      title={"계정 정보"}
      width={"60%"}
    >
      <GRView flexDirection={"row"}>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            disabled={true}
            type={"text"}
            textType={"input"}
            title={"이름"}
            fieldName={"name"}
            control={control}
            placeholder={"이름을 작성해 주세요"}
            required={true}
          />
          <GRFormItem
            disabled={true}
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
            disabled={true}
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
            disabled={true}
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
            disabled={true}
            type={"text"}
            textType={"number"}
            title={"학년"}
            fieldName={"grade"}
            control={control}
            placeholder={"학년 숫자만 작성해주세요"}
            required={true}
          />
          <GRFormItem
            disabled={true}
            pickerType={"basic"}
            type={"date"}
            title={"방문일"}
            fieldName={"visitDate"}
            control={control}
            placeholder={"방문일을 선택해 주세요"}
            required={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            disabled={true}
            type={"select"}
            title={"리더"}
            fieldName={"teamId"}
            control={control}
            options={newFamilyLeaderOptions}
            placeholder={"리더를 선택해주세요"}
          />
        </GRFlexView>
        <GRFlexView>
          <GRFormItem
            disabled={true}
            type={"text"}
            textType={"textarea"}
            title={"추가 내용"}
            fieldName={"etc"}
            control={control}
            placeholder={"추가 내용이 있으면 작성해 주세요"}
          />
        </GRFlexView>
      </GRView>
    </GRModal>
  );
};

export default UserHistoryModal;
