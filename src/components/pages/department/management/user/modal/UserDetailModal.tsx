import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { Divider } from "antd";
import { tUser } from "api/account/types";
import useUserMutate from "api/management/user/mutate/useUserMutate";
import { useUserDetailQuery } from "api/management/user/queries/useUserDetailQuery";
import { SEX_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useCurrentTermInfoOptionQueries } from "hooks/queries/term/useCurrentTermInfoOptionQueries";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FORMAT } from "utils/DateUtils";
import { REGEXP_GRADE_NUM, REGEXP_PHONE_HYPHEN_PATTERN } from "utils/regexp";

type tUserDetailModal = {
  open: boolean;
  onClickClose: () => void;
};

type tUserForm = {
  birth: Dayjs;
} & Omit<tUser, "birth">;

const defaultValue = {
  name: "",
  phoneNumber: "",
  grade: undefined,
  birth: "",
  sex: undefined,
  etc: ""
};

const UserDetailModal: FC<tUserDetailModal> = ({ open, onClickClose }) => {
  const router = useRouter();
  const { userId } = router.query;

  const { control, handleSubmit, reset } = useForm<tUserForm>();

  const {
    selectedCodyId,
    smallGroupLeaderByCodyOptions,
    currentTermCodyOptions,
    setSelectedCodyId
  } = useCurrentTermInfoOptionQueries();

  const onCloseModal = () => {
    onClickClose();
    reset(defaultValue);
    setSelectedCodyId(undefined);
  };

  const { createUserMutate, updateUserMutate } = useUserMutate(onCloseModal);

  const { data: userDetailData } = useUserDetailQuery(Number(userId));

  const onClickModalOk = handleSubmit(_item => {
    const _format = {
      ..._item,
      ...(_item?.birth && {
        birth: dayjs(_item.birth).format(DEFAULT_DATE_FORMAT)
      })
    };
    if (!userId) {
      createUserMutate(_format);
      return;
    }
    updateUserMutate(_format);
  });

  const onChangeSelectCody = (_selectedCodyId: number) => {
    setSelectedCodyId(_selectedCodyId);
  };

  useEffect(() => {
    if (!userDetailData) {
      reset(defaultValue);
      return;
    }
    reset({
      ...userDetailData,
      birth:
        userDetailData.birth && userDetailData?.birth !== "1970-01-01"
          ? dayjs(userDetailData.birth)
          : undefined
    });
  }, [userDetailData]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={onClickModalOk}
      title={userId ? "상세 정보" : "지체 생성"}
      width={"60%"}
      okButtonText={userId ? "수정" : "등록"}
      maskClosable={false}
    >
      <GRFlexView
        flexDirection={"row"}
        xGap={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
        marginbottom={GRStylesConfig.BASE_LONG_MARGIN}
      >
        <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
          <GRFormTitle title={"이름"} required={true} />
          <GRFormItem
            type={"text"}
            textType={"name"}
            fieldName={"name"}
            control={control}
            placeholder={"이름을 작성해 주세요"}
            rules={{ required: "이름은 필수입니다." }}
          />
        </GRFlexView>
        <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
          <GRFormTitle title={"학년"} required={true} />
          <GRFormItem
            type={"text"}
            textType={"number"}
            fieldName={"grade"}
            control={control}
            placeholder={"학년 숫자만 작성해주세요"}
            maxLength={2}
            rules={{
              required: "학년은 필수 입니다.",
              pattern: {
                value: REGEXP_GRADE_NUM,
                message: "1학년부터 19학년까지 입력하세요."
              }
            }}
          />
        </GRFlexView>
        <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
          <GRFormTitle title={"성별"} required={true} />
          <GRFormItem
            type={"radio"}
            options={SEX_OPTIONS}
            fieldName={"sex"}
            control={control}
            rules={{ required: "성별은 필수 입니다." }}
          />
        </GRFlexView>
      </GRFlexView>
      <GRFlexView
        flexDirection={"row"}
        xGap={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
        marginbottom={GRStylesConfig.BASE_LONG_MARGIN}
      >
        <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
          <GRFormTitle title={"전화번호"} required={true} />
          <GRFormItem
            type={"text"}
            textType={"phoneNumber"}
            fieldName={"phoneNumber"}
            control={control}
            placeholder={"- 없이 작성해 주세요"}
            maxLength={13}
            rules={{
              required: {
                value: true,
                message: "전화번호는 필수입니다."
              },
              pattern: {
                value: REGEXP_PHONE_HYPHEN_PATTERN,
                message: "010-1234-5678 형식으로 입력하세요."
              }
            }}
          />
        </GRFlexView>
        <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
          <GRFormTitle title={"생년월일"} />
          <GRFormItem
            type={"date"}
            pickerType={"basic"}
            fieldName={"birth"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
          />
        </GRFlexView>
      </GRFlexView>
      <GRFlexView marginbottom={GRStylesConfig.BASE_MARGIN}>
        <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
          <GRFormTitle title={"기타 사항"} />
          <GRFormItem
            type={"text"}
            textType={"textarea"}
            fieldName={"etc"}
            control={control}
            placeholder={"추가 내용이 있으면 작성해 주세요"}
            style={{
              height: "5rem"
            }}
          />
        </GRFlexView>
      </GRFlexView>
      {!userId && (
        <>
        <Divider />
          <GRFlexView
            flexDirection={"row"}
            alignItems={"center"}
            marginbottom={GRStylesConfig.BASE_LONG_MARGIN}
          >
            <GRText weight={"bold"} fontSize={"b4"} marginright={0.5}>
              라인업
            </GRText>
            <GRInfoBadge infoMessage={"바로 라인업할 경우 넣어주세요"} />
          </GRFlexView>
          <GRFlexView
            marginbottom={GRStylesConfig.BASE_MARGIN}
            flexDirection={"row"}
            xGap={1}
          >
            <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
              <GRFormTitle title={"코디"} />
              <GRSelect
                options={currentTermCodyOptions}
                onChange={onChangeSelectCody}
                placeholder={"코디를 선택해 주세요"}
                value={selectedCodyId}
              />
            </GRFlexView>
            <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
              <GRFormTitle title={"리더"} />
              <GRFormItem
                type={"select"}
                textType={"input"}
                fieldName={"smallGroupId"}
                control={control}
                disabled={!selectedCodyId}
                options={smallGroupLeaderByCodyOptions}
                placeholder={"리더를 선택해 주세요"}
              />
            </GRFlexView>
          </GRFlexView>
        </>
      )}
    </GRFormModal>
  );
};

export default UserDetailModal;
