import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormInputText from "@component/molecule/form/GRFormInputText";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useLeadersQuery } from "api/account/queries/useLeadersQuery";
import { useRolesQuery } from "api/account/queries/useRolesQuery";
import { GENDER_OPTIONS, STATUS_OPTIONS } from "config/const";
import { Dayjs } from "dayjs";
import { FC, useCallback } from "react";
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
  birthday?: Dayjs;
  grade?: string;
  duty?: string;
  leader?: string;
  role?: string;
  isActive: boolean;
};

const AccountModal: FC<tAccountModal> = ({ open, onClick }) => {
  const { control, watch, handleSubmit } = useForm<tAccountForm>({
    defaultValues: {
      isActive: true
    }
  });

  // 직분 선택시 리더선택 하는 selectform disable 여부
  const isDisableLeaderSelect = watch("duty") === "cordi";

  const { data: leaderSelectOptions } = useLeadersQuery();
  const { data: roleSelectOptions } = useRolesQuery();

  const onOkClick = useCallback(() => {
    // onAccountModal?.()
  }, []);

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(_item => {
    console.log("_item", _item);
  }, []);

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
            fieldName={"id"}
            control={control}
            type={"input"}
            disabled={true}
            placeholder={"이름을 작성하면 아이디가 작성됩니다"}
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
          />
          <GRFormInputText
            title={"비밀번호"}
            fieldName={"pasword"}
            control={control}
            placeholder={"비밀번호를 작성해 주세요"}
            type={"password"}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormInputText
            title={"전화번호"}
            fieldName={"phoneNumber"}
            control={control}
            placeholder={"- 없이 작성해 주세요"}
            type={"phonenumber"}
          />
          <GRFormItem
            type={"radio"}
            title={"성별"}
            fieldName={"gender"}
            control={control}
            options={GENDER_OPTIONS}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"date"}
            title={"생년월일"}
            fieldName={"birthday"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
          />
          <GRFormInputText
            title={"학년"}
            fieldName={"grade"}
            control={control}
            placeholder={"학년 숫자만 작성해주세요"}
            type={"number"}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"select"}
            title={"직분"}
            fieldName={"duty"}
            control={control}
            options={STATUS_OPTIONS}
            placeholder={"부서에서의 직분을 선택해주세요"}
          />
          <GRFormItem
            type={"select"}
            title={"리더"}
            fieldName={"leader"}
            control={control}
            options={leaderSelectOptions}
            placeholder={"리더를 선택해주세요"}
            disabled={isDisableLeaderSelect}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"select"}
            title={"역할"}
            fieldName={"role"}
            control={control}
            options={roleSelectOptions}
            placeholder={"웹에서의 역할을 선택해 주세요"}
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
