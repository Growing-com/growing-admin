import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormInputText from "@component/molecule/form/GRFormInputText";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useCreateUserMutate } from "api/user/mutate/useCreateUserMutate";
import { DUTY_NAME, GENDER_OPTIONS, ROLE_NAME } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import Inko from "inko";
import { FC, useCallback, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Color } from "styles/colors";

type tAccountModal = {
  open: boolean;
  onClick: () => void;
};

type tAccountForm = {
  id?: string;
  name?: string;
  pasword?: string;
  phoneNumber?: string;
  gender?: string;
  birth?: Dayjs;
  grade?: string;
  duty?: string;
  teamId?: number;
  role?: string;
  isActive: boolean;
};
const inko = new Inko();
const AccountModal: FC<tAccountModal> = ({ open, onClick }) => {
  const { createUserMutate } = useCreateUserMutate();
  const { control, watch, handleSubmit } = useForm<tAccountForm>({
    defaultValues: {
      isActive: true,
      teamId: 2,
      birth: dayjs("2000-01-01")
    }
  });

  const DUTY_OPTIONS = useMemo(
    () => DUTY_NAME.map(duty => ({ label: duty.name, value: duty.value })),
    []
  );
  // 직분 선택시 리더선택 하는 selectform disable 여부
  const isDisableLeaderSelect = watch("duty") === "cordi";

  const onOkClick = useCallback(() => {
    // onAccountModal?.()
  }, []);

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    _item => {
      console.log("_item", _item);
      const _format = {
        ..._item,
        username: inko.ko2en(_item.name),
        birth: dayjs(_item.birth).format("YYYY-MM-DD")
      };
      createUserMutate(_format);
    },
    [createUserMutate]
  );

  return (
    <GRFormModal
      open={open}
      onCancel={onClick}
      onSubmit={handleSubmit(onClickModalOk)}
      title={"계정 생성"}
      width={"60%"}
      okButtonText={"등록"}
    >
      <GRView flexDirection={"row"}>
        <GRFlexView flexDirection={"row"}>
          <GRFormInputText
            title={"아이디"}
            fieldName={"username"}
            control={control}
            type={"input"}
            disabled={true}
            placeholder={"이름을 작성하면 아이디가 작성됩니다"}
            value={inko.ko2en(watch("name"))}
          />
          <GRFlexView justifyContent={"center"}>
            <GRText color={Color.grey80} marginleft={1} fontSize={"b7"}>
              * 아이디는 이름을 영문 타자로 자동 입력됩니다
            </GRText>
          </GRFlexView>
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormInputText
            title={"이름"}
            fieldName={"name"}
            control={control}
            placeholder={"이름을 작성해 주세요"}
            required={true}
          />
          <GRFormInputText
            title={"비밀번호"}
            fieldName={"password"}
            control={control}
            placeholder={"비밀번호를 작성해 주세요"}
            type={"password"}
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
          <GRFormItem
            type={"date"}
            title={"생년월일"}
            fieldName={"birth"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
            required={true}
          />
          <GRFormInputText
            title={"학년"}
            fieldName={"grade"}
            control={control}
            placeholder={"학년 숫자만 작성해주세요"}
            type={"number"}
            required={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"select"}
            title={"직분"}
            fieldName={"duty"}
            control={control}
            options={DUTY_OPTIONS}
            placeholder={"부서에서의 직분을 선택해주세요"}
            required={true}
          />
          <GRFormItem
            type={"select"}
            title={"리더"}
            fieldName={"teamId"}
            control={control}
            // options={leaderSelectOptions}
            placeholder={"리더를 선택해주세요"}
            disabled={isDisableLeaderSelect}
            // required={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"select"}
            title={"역할"}
            fieldName={"role"}
            control={control}
            options={ROLE_NAME}
            placeholder={"웹에서의 역할을 선택해 주세요"}
            required={true}
          />
          <GRFormItem
            type={"switch"}
            title={"활성화"}
            fieldName={"isActive"}
            control={control}
          />
        </GRFlexView>
      </GRView>
    </GRFormModal>
  );
};

export default AccountModal;
