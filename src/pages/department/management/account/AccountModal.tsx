import GRAlert from "@component/atom/alert/GRAlert";
import { tOptions } from "@component/atom/dataEntry/dataEntryType";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormInputText from "@component/molecule/form/GRFormInputText";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useGetTermCodyQuery } from "api/term/queries/useGetTermCodyQuery";
import { useGetTermMembersByCodyQuery } from "api/term/queries/useGetTermMembersByCodyQuery";
import { useCreateUserMutate } from "api/user/mutate/useCreateUserMutate";
import { useUserDetailQuery } from "api/user/queries/useUserDetailQuery";
import { tAccount } from "api/user/types";
import { GENDER_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import Inko from "inko";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type tAccountModal = {
  user: tAccount;
  open: boolean;
  onClose: () => void;
};

type tAccountForm = {
  name: string;
  sex: string;
  phoneNumber: string;
  birth: Dayjs;
  grade: string;
  teamId: string;
  visitDate: Dayjs;
  etc: string;
};

const inko = new Inko();
const IS_NEW_TEAM_ID = 2;
const AccountModal: FC<tAccountModal> = ({ open, onClose, user }) => {
  const [cordiSelectItems, setCordiSelectItems] = useState<tOptions>([]);
  const [leaderSelectItems, setLeaderSelectItems] = useState<tOptions>([]);
  const [userId, setUserId] = useState<number>();
  const isCreate = useMemo(() => !!user, [user]);

  const { createUserMutateAsync } = useCreateUserMutate();
  const { data: userInfo } = useUserDetailQuery(userId);

  const { control, watch, handleSubmit } = useForm<tAccountForm>({
    defaultValues: {
      isActive: true,
      birth: dayjs("2000-01-01"),
      teamId: IS_NEW_TEAM_ID
    }
  });

  const { data: cordiData } = useGetTermCodyQuery({
    termId: 1
  });

  const { data: cordiMemberData } = useGetTermMembersByCodyQuery({
    termId: 1,
    codyId: watch("codies")
  });

  // 스팩 아웃
  // const NEED_CORDI = watch("duty") === "MEMBER" || watch("duty") === "LEADER";

  // const NEED_LEADER = watch("duty") === "MEMBER";

  // const DUTY_OPTIONS = useMemo(
  //   () => DUTY_NAME.map(duty => ({ label: duty.name, value: duty.value })),
  //   []
  // );

  const onCloseModal = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    async _item => {
      const _format = {
        ..._item,
        username: inko.ko2en(_item.name),
        birth: dayjs(_item.birth).format("YYYY-MM-DD")
      };
      try {
        await createUserMutateAsync(_format);
        onCloseModal();
      } catch (e) {
        GRAlert.error("생성 실패");
      }
    },
    [createUserMutateAsync, onCloseModal]
  );

  useEffect(() => {
    if (cordiData?.length) {
      const _cordiselect = cordiData.map(item => ({
        value: item.memberId,
        label: item.name
      }));
      setCordiSelectItems(_cordiselect);
    }
  }, [cordiData]);

  useEffect(() => {
    if (cordiMemberData?.length) {
      const _leaderselect = cordiMemberData.map(item => ({
        value: item.memberId,
        label: item.name
      }));
      setLeaderSelectItems(_leaderselect);
    }
  }, [cordiMemberData]);

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user?.id]);

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
        {/* 스팩 아웃 */}
        {/* <GRFlexView flexDirection={"row"}>
          <GRFormInputText
            title={"아이디"}
            fieldName={"username"}
            control={control}
            type={"input"}
            disabled={true}
            placeholder={"이름을 작성하면 아이디가 작성됩니다"}
            value={inko.ko2en(watch("name") ?? "")}
          />
          <GRFlexView justifyContent={"center"}>
            <GRText color={Color.grey80} marginleft={1} fontSize={"b7"}>
              * 아이디는 이름을 영문 타자로 자동 입력됩니다
            </GRText>
          </GRFlexView>
        </GRFlexView> */}
        {/* <GRFlexView flexDirection={"row"}>
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
            placeholder={
              isCreate ? "비밀번호를 작성해 주세요" : "관리자에게 문의주세요"
            }
            type={"password"}
            required={true}
            disabled={!isCreate}
          />
        </GRFlexView> */}
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
          {/* <GRFormItem
            type={"select"}
            title={"역할"}
            fieldName={"role"}
            control={control}
            options={ROLE_NAME}
            placeholder={"웹에서의 역할을 선택해 주세요"}
            required={true}
          /> */}
          <GRFormItem
            type={"date"}
            title={"방문일"}
            fieldName={"birth"}
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
            // required={true}
          />
          <GRFormItem
            type={"switch"}
            title={"활성화"}
            fieldName={"isActive"}
            control={control}
          />
          {/* 스팩 아웃 */}
          {/* <GRFormItem
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
            title={"코디"}
            fieldName={"codies"}
            control={control}
            options={cordiSelectItems}
            placeholder={"코디를 선택해주세요"}
            isShow={NEED_CORDI}
          /> */}
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
