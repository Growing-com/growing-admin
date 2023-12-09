import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { useUserMutate } from "api/account/mutate/useUserMutate";
import { tAccount } from "api/account/types";
import { useNewFamilyLineOut } from "api/term/mutate/useNewFamilyLineOut";
import { tTermNewFamily } from "api/term/types";
import { SEX_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { FC, useCallback, useEffect, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";
import NewFamilyDetailLineUp from "./NewFamilyDetailLineUp";

type tNewFamilyDetailModal = {
  newFamily?: tTermNewFamily;
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
};

type tNewFamilyForm = {
  visitDate: Dayjs;
  birth: Dayjs;
} & Omit<tTermNewFamily, "visitDate" | "birth">;

const emptyValues = {
  name: "",
  sex: "MALE",
  phoneNumber: "",
  birth: "",
  visitDate: "",
  etc: ""
} as unknown as tNewFamilyForm;

const NewFamilyDetailModal: FC<tNewFamilyDetailModal> = ({
  open,
  onClose,
  newFamily,
  onRegister
}) => {
  const isCreate = useMemo(() => !newFamily?.userId, [newFamily?.userId]);
  const isLineUp = useMemo(
    () =>
      !!newFamily?.firstPlantLeaderName ||
      !!newFamily?.lineoutDate ||
      !!newFamily?.firstPlantManagerName,
    [
      newFamily?.firstPlantLeaderName,
      newFamily?.firstPlantManagerName,
      newFamily?.lineoutDate
    ]
  );

  const { newFamilyLeaderOptions } = useTermInfoOptionQueries();
  const { createUserMutateAsync, updateUserMutateAsync } = useUserMutate();
  const { control, handleSubmit, reset } = useForm<tNewFamilyForm>({
    defaultValues: {
      ...emptyValues
    }
  });

  const onRegisterModal = useCallback(() => {
    onRegister?.();
    reset({ ...emptyValues });
  }, [onRegister, reset]);

  const onCloseModal = useCallback(() => {
    onClose?.();
    reset({ ...emptyValues });
  }, [onClose, reset]);

  const { mutate: newFamilyLineOutMutate } = useNewFamilyLineOut({
    onClose: onRegisterModal
  });

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
            userId: newFamily?.userId,
            data: _format as tAccount
          });
        }
        GRAlert.success(isCreate ? "생성 성공" : "수정 성공");
        onRegister();
      } catch (e: any) {
        GRAlert.error(
          `수정 실패, 다시 한번 시도해 주세요 ${
            e?.message ? `${e?.message}` : ""
          }`
        );
      }
    },
    [
      createUserMutateAsync,
      isCreate,
      newFamily?.userId,
      onRegister,
      updateUserMutateAsync
    ]
  );

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
    if (!!newFamily?.userId) {
      reset({
        ...newFamily,
        birth:
          newFamily.birth && newFamily?.birth !== "1970-01-01"
            ? dayjs(newFamily.birth)
            : undefined,
        visitDate:
          newFamily?.visitDate && newFamily?.visitDate !== "1970-01-01"
            ? dayjs(newFamily?.visitDate)
            : undefined
      });
    } else {
      reset();
    }
  }, [newFamily, reset]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={
        <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
          <GRText weight={"bold"}>
            {isCreate ? "새가족 등록" : "새가족 상세"}
          </GRText>
          {!isCreate && (
            <GRButtonText danger onClick={onClickLineOut}>
              라인 아웃
            </GRButtonText>
          )}
        </GRFlexView>
      }
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
            disabled={!isCreate}
            required={true}
          />
          <GRFormItem
            type={"radio"}
            title={"성별"}
            fieldName={"sex"}
            control={control}
            options={SEX_OPTIONS}
            disabled={!isCreate}
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
            placeholder={"- 없이 작성해 주세요"}
            maxLength={13}
            disabled={!isCreate}
            required={true}
          />
          <GRFormItem
            type={"date"}
            title={"생년월일"}
            fieldName={"birth"}
            pickerType={"basic"}
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
            disabled={!isCreate}
            required={true}
          />
          <GRFormItem
            type={"date"}
            pickerType={"basic"}
            title={"방문일"}
            fieldName={"visitDate"}
            control={control}
            placeholder={"방문일을 선택해 주세요"}
          />
        </GRFlexView>
        {isCreate ? (
          <GRFormItem
            type={"select"}
            title={"새가족 순장"}
            fieldName={"teamId"}
            control={control}
            options={newFamilyLeaderOptions}
            disabled={!isCreate}
            isShow={isCreate}
            placeholder={"새가족 리더를 선택해주세요"}
            required={true}
          />
        ) : (
          <NewFamilyDetailLineUp
            isLineUp={isLineUp}
            newFamily={newFamily}
            onCloseModal={onRegisterModal}
          />
        )}
        <GRFlexView>
          <GRFormItem
            style={{
              height: "8rem"
            }}
            type={"text"}
            textType={"textarea"}
            title={"기타 사항"}
            fieldName={"etc"}
            control={control}
            placeholder={"추가 내용이 있으면 작성해 주세요"}
          />
        </GRFlexView>
        <GRFlexView
          alignItems={"end"}
          marginbottom={GRStylesConfig.BASE_MARGIN}
        >
          <GRText fontSize={"b8"} color={Color.grey80} weight={"bold"}>
            {newFamily?.updatedBy &&
              `최종 수정자 ${newFamily?.updatedBy} (${dayjs(
                newFamily?.updatedAt
              ).format(DEFAULT_DATE_FOMAT)})`}
          </GRText>
        </GRFlexView>
      </GRView>
    </GRFormModal>
  );
};

export default NewFamilyDetailModal;
