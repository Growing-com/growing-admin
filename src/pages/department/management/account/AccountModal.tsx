import GRAlert from "@component/atom/alert/GRAlert";
import GRText from "@component/atom/text/GRText";
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
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
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
  }, [onClose]);

  const onRegisterModal = useCallback(() => {
    onRegister?.();
  }, [onRegister]);

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    async _item => {
      const _format = {
        ..._item,
        ...(_item?.birth && {
          birth: dayjs(_item.birth).format(DEFAULT_DATE_FOMAT)
        }),
        ...(_item?.visitDate && {
          visitDate: dayjs(_item.visitDate).format(DEFAULT_DATE_FOMAT)
        }),
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
        GRAlert.success(isCreate ? "생성 성공" : "수정 성공");
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
    }
  }, [isCreate, reset, userInfo]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={isCreate ? "계정 생성" : "상세 정보"}
      width={"60%"}
      okButtonText={isCreate ? "등록" : "수정"}
      maskClosable={false}
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
            containStyle={{ marginRight: "0.5rem"}}
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
            textType={"phoneNumber"}
            title={"전화번호"}
            fieldName={"phoneNumber"}
            control={control}
            placeholder={"-를 넣어주세요. 예) 010-1234-5678"}
            required={true}
            maxLength={13}
            containStyle={{ marginRight: "0.5rem"}}
          />
          <GRFormItem
            type={"date"}
            pickerType={"basic"}
            title={"생년월일"}
            fieldName={"birth"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
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
            containStyle={{ marginRight: "0.5rem"}}
          />
          <GRFormItem
            pickerType={"basic"}
            type={"date"}
            title={"방문일"}
            fieldName={"visitDate"}
            control={control}
            placeholder={"방문일을 선택해 주세요"}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"select"}
            title={"리더"}
            fieldName={"teamId"}
            control={control}
            options={newFamilyLeaderOptions}
            disabled={!isCreate}
            isShow={isCreate}
            placeholder={"리더를 선택해주세요"}
          />
          {/* <GRFormItem
            type={"switch"}
            title={"활성화"}
            fieldName={"isActive"}
            control={control}
            isShow={!isCreate}
          /> */}
        </GRFlexView>
        <GRFlexView>
          <GRFormItem
            type={"text"}
            textType={"textarea"}
            title={"기타 사항"}
            fieldName={"etc"}
            control={control}
            placeholder={"추가 내용이 있으면 작성해 주세요"}
            style={{
              height: "8rem"
            }}
          />
        </GRFlexView>
        <GRFlexView
          alignItems={"end"}
          marginbottom={GRStylesConfig.BASE_MARGIN}
        >
          <GRText fontSize={"b8"} color={Color.grey80} weight={"bold"}>
            {user?.updatedBy &&
              `최종 수정자 ${user?.updatedBy} (${dayjs(user?.updatedAt).format(
                DEFAULT_DATE_FOMAT
              )})`}
          </GRText>
        </GRFlexView>
      </GRView>
    </GRFormModal>
  );
};

export default AccountModal;
