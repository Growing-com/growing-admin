import GRAlert from "@component/atom/alert/GRAlert";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormInputText from "@component/molecule/form/GRFormInputText";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useUserMutate } from "api/user/mutate/useUserMutate";
import { useUserDetailQuery } from "api/user/queries/useUserDetailQuery";
import { tAccount } from "api/user/types";
import { GENDER_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tAccountModal = {
  user?: tAccount;
  open: boolean;
  onClose: () => void;
};

type tAccountForm = {
  name: string;
  sex: string;
  phoneNumber: string;
  birth: Dayjs;
  grade: string;
  teamId: number;
  visitDate: Dayjs;
  etc: string;
  isActive: boolean;
};

const IS_NEW_TEAM_ID = 2;
const AccountModal: FC<tAccountModal> = ({ open, onClose, user }) => {
  const [userId, setUserId] = useState<number>();
  const isCreate = useMemo(() => !user?.id, [user?.id]);

  const { createUserMutateAsync, updateUserMutateAsync } = useUserMutate();

  const { data: userInfo } = useUserDetailQuery(user?.id);
  console.log("user", userInfo);

  const { control, handleSubmit, reset } = useForm<tAccountForm>({
    defaultValues: {
      isActive: true,
      birth: dayjs("2000-01-01"),
      visitDate: dayjs(),
      teamId: IS_NEW_TEAM_ID
    }
  });

  const onCloseModal = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    async _item => {
      const _format = {
        ..._item,
        birth: dayjs(_item.birth).format(DEFAULT_DATE_FOMAT),
        visitDate: dayjs(_item.visitDate).format(DEFAULT_DATE_FOMAT)
      };
      console.log("isCreate", isCreate);
      try {
        if (isCreate) {
          await createUserMutateAsync(_format);
        } else {
          await updateUserMutateAsync({ userId: user?.id, params: _format });
        }
        onCloseModal();
        GRAlert.success("생성 성공");
      } catch (e) {
        GRAlert.error(`전화 번호 및 이름이 중복 될수 있으니 확인 부탁드립니다`);
      }
    },
    [
      createUserMutateAsync,
      isCreate,
      onCloseModal,
      updateUserMutateAsync,
      user?.id
    ]
  );

  console.log("userInfo", userInfo);
  useEffect(() => {
    if (userInfo) {
      reset({
        ...userInfo,
        birth: dayjs(userInfo.birth)
      });
    }
  }, [reset, userInfo]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={"계정 생성"}
      width={"60%"}
      okButtonText={"등록"}
    >
      <GRView flexDirection={"row"}>
        <GRFlexView flexDirection={"row"}>
          <GRFormInputText
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
            options={GENDER_OPTIONS}
            required={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormInputText
            title={"전화번호"}
            fieldName={"phoneNumber"}
            control={control}
            placeholder={"- 없이 작성해 주세요"}
            required={true}
            maxLength={11}
          />
          <GRFormItem
            type={"date"}
            title={"생년월일"}
            fieldName={"birth"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
            required={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormInputText
            title={"학년"}
            fieldName={"grade"}
            control={control}
            placeholder={"학년 숫자만 작성해주세요"}
            type={"number"}
            required={true}
          />
          <GRFormItem
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
            type={"select"}
            title={"리더"}
            fieldName={"teamId"}
            control={control}
            options={[{ label: "새가족 리더", value: IS_NEW_TEAM_ID }]}
            placeholder={"리더를 선택해주세요"}
          />
          <GRFormItem
            type={"switch"}
            title={"활성화"}
            fieldName={"isActive"}
            control={control}
          />
        </GRFlexView>
        <GRFlexView>
          <GRFormInputText
            type={"textarea"}
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
